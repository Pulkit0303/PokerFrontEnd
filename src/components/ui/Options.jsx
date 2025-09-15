import { useState, useCallback } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

function Options() {
  const location = useLocation();
  const initialTab = location.pathname.includes("/sessions") ? "sessions" : "players";
  const [active, setActive] = useState(initialTab);
  const navigate = useNavigate();
  const { groupId } = useParams(); 

  const handleClick = useCallback(
    (option) => {
      setActive(option);

      if (option === "sessions") {
        navigate(`/groups/${groupId}/sessions`);
      } else if (option === "players") {
        navigate(`/groups/${groupId}`);
      }
    },
    [groupId, navigate]
  );

  return (
    <div className="flex justify-center text-black">
      <table className="w-[80%] text-center">
        <thead>
          <tr>
            <td className="p-4">
              <button
                onClick={() => handleClick("players")}
                className={`w-full text-center pb-2 border-b-2 transition-colors duration-300 ${
                  active === "players" ? "border-black" : "border-transparent"
                }`}
              >
                Players
              </button>
            </td>
            <td className="p-4">
              <button
                onClick={() => handleClick("sessions")}
                className={`w-full text-center pb-2 border-b-2 transition-colors duration-300 ${
                  active === "sessions" ? "border-black" : "border-transparent"
                }`}
              >
                Sessions
              </button>
            </td>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default Options;
