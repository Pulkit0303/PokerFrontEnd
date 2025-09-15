import { useState, useEffect, useCallback } from "react";
import useAxios from "../api/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import { Table, Options, Input, NavBar, Button } from "../components/ui";

function GroupDetail() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const axios = useAxios();

  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  // ✅ Inline helper functions
  const formatAmount = (amount) => {
    if (typeof amount !== "number") return "₹0";
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const getAmountColorClass = (amount) => {
    if (amount > 0) return "text-green-400";
    if (amount < 0) return "text-red-400";
    return "text-gray-400";
  };

  // ✅ Fetch players
  const fetchPlayers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`/players/${groupId}/with-stats`);
      setPlayers(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch player data");
    } finally {
      setLoading(false);
    }
  }, [groupId]);

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  // ✅ Add player
  const handleAddPlayer = async () => {
    if (!playerName.trim()) {
      alert("Player name cannot be empty");
      return;
    }

    try {
      const tempId = `temp_${Date.now()}`;
      const trimmedName = playerName.trim();
      const newPlayer = {
        _id: tempId,
        name: trimmedName,
        totalNet: 0,
        numberOfSessions: 0,
      };

      setPlayers((prev) => [...prev, newPlayer]);
      setPlayerName("");

      const response = await axios.post(`/players/${groupId}`, {
        name: trimmedName,
      });

      setPlayers((prev) =>
        prev.map((player) =>
          player._id === tempId
            ? { ...newPlayer, _id: response.data._id }
            : player
        )
      );
    } catch (err) {
      console.error("Error adding player:", err);
      setPlayers((prev) =>
        prev.filter((p) => !p._id.toString().startsWith("temp_"))
      );
      alert("Failed to add player");
    }
  };

  // ✅ Remove player
  const handleRemovePlayer = async (playerId) => {
    try {
      const originalPlayers = players;
      setPlayers((prev) => prev.filter((p) => p._id !== playerId));
      await axios.delete(`/players/${groupId}/${playerId}`);
    } catch (err) {
      console.error("Error removing player:", err);
      setPlayers(originalPlayers);
      alert("Failed to remove player");
    }
  };

  // ✅ Loading / Error UI (kept minimal to not break layout)
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-gray-400 text-lg">Loading players...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-red-400 text-lg">{error}</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar heading={"Group Details"} onClick={() => navigate("/groups")} />
      <Options />
      <div className="flex flex-col gap-6 mt-4">
        {/* Input + Button */}
        <div className="flex justify-center gap-2">
          <Input
            Placeholder={"Enter player name"}
            name={"playerName"}
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <Button type={"Add"} onClick={handleAddPlayer} />
        </div>

        {/* Players Table */}
        <Table
          players={players}
          formatAmount={formatAmount}
          getAmountColorClass={getAmountColorClass}
          onRemove={handleRemovePlayer}
        />
      </div>
    </div>
  );
}

export default GroupDetail;
