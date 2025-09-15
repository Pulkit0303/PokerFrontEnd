import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxios from "../api/axiosInstance";
import { NavBar, Card, Options, Button } from "../components/ui";

function SessionList() {
  const { groupId } = useParams();
  const axios = useAxios();
  const navigate = useNavigate();

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/sessions/${groupId}`);
      setSessions(res.data);
    } catch (err) {
      console.error("Failed to fetch sessions:", err);
      if (err.response?.status === 403 && err.response?.data?.error === "jwt expired") {
        console.warn("Session expired. User may need to refresh the page or log in again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const createSession = () => {
    navigate(`/groups/${groupId}/sessions/new`);
  };

  const deleteSession = async (sessionId) => {
    if (!window.confirm("Are you sure you want to delete this session?")) return;
    try {
      await axios.delete(`/sessions/${groupId}/${sessionId}`);
      fetchSessions();
    } catch (err) {
      console.error("Failed to delete session:", err);
      alert("Failed to delete session");
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading sessions...</div>;
  }

  return (
    <div>
      <NavBar heading={"Session List"} onClick={() => navigate("/groups")} />
      <Options />

      <div className="flex justify-center mt-4">
        <Button type="Create" onClick={createSession} />
      </div>

      <div className="grid gap-6 w-full px-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
        {sessions.length > 0 ? (
          sessions.map((session) => (
            <Card
              key={session._id}
              usedFor="Session"
              title={new Date(session.createdAt).toDateString().substring(4)}
              date={new Date(session.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              onDelete={() => deleteSession(session._id)}
              onView={() => navigate(`/groups/${groupId}/sessions/${session._id}`)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 italic">
            No sessions found. Create your first session to get started!
          </p>
        )}
      </div>
    </div>
  );
}

export default SessionList;
