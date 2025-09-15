import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAxios from '../api/axiosInstance';
import { SessionTable, Stats, NavBar, Settlement, Button } from "../components/ui";

function SessionDetail() {
  const { groupId, sessionId } = useParams();
  const navigate = useNavigate();
  const axios = useAxios();

  const [sessionPlayers, setSessionPlayers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sessionSaved, setSessionSaved] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const playersRes = await axios.get(`/players/${groupId}`);
        const groupPlayers = playersRes.data;

        const isNew = sessionId === 'new';
        const existingSessionPlayers = isNew
          ? []
          : (await axios.get(`/session-players/${sessionId}`)).data;

        const existingPlayersMap = {};
        existingSessionPlayers.forEach(sp => {
          existingPlayersMap[sp.playerId] = sp;
        });

        const allSessionPlayers = groupPlayers.map(player => {
          const existingPlayer = existingPlayersMap[player._id];
          return existingPlayer || {
            playerId: player._id,
            name: player.name,
            buyIn: '',
            buyOut: '',
            net: 0
          };
        });

        const hasNonZeroValues = existingSessionPlayers.some(sp =>
          (parseFloat(sp.buyIn) || 0) > 0 || (parseFloat(sp.buyOut) || 0) > 0
        );
        setSessionSaved(hasNonZeroValues);

        if (!isNew && hasNonZeroValues) {
          try {
            const statsRes = await axios.get(`/stats/${sessionId}`);
            setStats(statsRes.data);
          } catch (err) {
            setStats(null);
          }
        } else {
          setStats(null);
        }

  // ...removed unused setPlayers...
        setSessionPlayers(allSessionPlayers);

      } catch (err) {
        console.error('Error fetching session data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [groupId, sessionId]);

  const handleInputChange = (playerId, field, value) => {
    setSessionPlayers(prev =>
      prev.map(sp =>
        sp.playerId === playerId
          ? { ...sp, [field]: value }
          : sp
      )
    );
  };

  const saveSession = async () => {
    if (saving || sessionSaved) {
      return;
    }

    try {
      setSaving(true);

      const hasValidPlayer = sessionPlayers.some(sp => (parseFloat(sp.buyIn) || 0) > 0 || (parseFloat(sp.buyOut) || 0) > 0);
      if (!hasValidPlayer) {
        setSaving(false);
        return;
      }

      const isNew = sessionId === 'new';
      let realSessionId = sessionId;
      if (isNew) {
        const createRes = await axios.post(`/sessions/${groupId}`);
        realSessionId = createRes.data._id;
      }

      const currentSessionPlayersRes = await axios.get(`/session-players/${realSessionId}`);
      const existingPlayerIds = new Set(currentSessionPlayersRes.data.map(sp => sp.playerId));

      const playersToSave = sessionPlayers.filter(sp => (parseFloat(sp.buyIn) || 0) > 0 || (parseFloat(sp.buyOut) || 0) > 0);

      const savePromises = playersToSave.map(sessionPlayer => {
        const buyIn = parseFloat(sessionPlayer.buyIn) || 0;
        const buyOut = parseFloat(sessionPlayer.buyOut) || 0;

        if (existingPlayerIds.has(sessionPlayer.playerId)) {
          return axios.put(`/session-players/${realSessionId}/${sessionPlayer.playerId}`, {
            buyIn,
            buyOut
          });
        }

        return axios.post(`/session-players/${realSessionId}/${sessionPlayer.playerId}`, {
          buyIn,
          buyOut
        });
      });

      await Promise.all(savePromises);

      await axios.put(`/sessions/${groupId}/${realSessionId}/save`);

      const statsRes = await axios.get(`/stats/${realSessionId}`);
      setStats(statsRes.data);
      setSessionSaved(true);

      if (isNew) {
        navigate(`/groups/${groupId}/sessions/${realSessionId}`, { replace: true });
      }

      alert('Session saved successfully! Statistics are now available.');

    } catch (err) {
      console.error('Error saving session:', err);
      alert('Failed to save session');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white p-4 flex items-center justify-center">
        <div className="text-black text-lg">Loading session...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div>
        <NavBar heading="Session Details" onClick={() => navigate(`/groups/${groupId}/sessions`)} />
      </div>
      {/* Session Input , Stats and Settlement */}
      <div className="flex flex-col items-center gap-6 mt-4">
        <SessionTable 
          sessionPlayers={sessionPlayers}
          sessionSaved={sessionSaved}
          handleInputChange={handleInputChange}
        />
        {!sessionSaved && (
          <Button 
            type={"Save"} 
            onClick={saveSession}
            disabled={saving}
          />
        )}
        <Stats stats={stats} sessionSaved={sessionSaved} />
        <Settlement settlements={stats?.settlements || []} sessionSaved={sessionSaved} />
      </div>
    </div>
  );
}

export default SessionDetail;
