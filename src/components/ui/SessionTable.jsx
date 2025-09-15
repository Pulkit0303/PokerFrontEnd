import React from "react";

function SessionTable({ sessionPlayers = [], sessionSaved, handleInputChange }) {
  return (
    <div className="flex items-start justify-center w-screen">
      <table className="w-[90%] border-collapse text-black">
        <thead>
          <tr className="border-b-2 border-black">
            <th className="px-2 py-2 text-center text-sm sm:text-base md:text-lg w-[30%] sm:w-1/4">NAME</th>
            <th className="px-2 py-2 text-center text-sm sm:text-base md:text-lg w-[35%] sm:w-1/4">BUY-IN</th>
            <th className="px-2 py-2 text-center text-sm sm:text-base md:text-lg w-[35%] sm:w-1/4">BUY-OUT</th>
            <th className="hidden sm:table-cell px-2 py-2 text-center text-sm sm:text-base md:text-lg sm:w-1/4">NET VALUE</th>
          </tr>
        </thead>
        <tbody>
          {sessionPlayers.length > 0 ? (
            sessionPlayers.map((player) => (
              <tr key={player.playerId} className="border-b border-black">
                <td className="px-2 py-6 text-center">{player.name}</td>
                <td className="px-2 py-6 text-center">
                  <input
                    type="number"
                    value={player.buyIn}
                    placeholder="BuyIn"
                    className="bg-transparent border-b border-black text-center w-[80%] focus:outline-none focus:border-black"
                    onChange={e => handleInputChange(player.playerId, 'buyIn', e.target.value)}
                    disabled={sessionSaved}
                    readOnly={sessionSaved}
                  />
                </td>
                <td className="px-2 py-6 text-center">
                  <input
                    type="number"
                    value={player.buyOut}
                    placeholder="BuyOut"
                    className="bg-transparent border-b border-black text-center w-[80%] focus:outline-none focus:border-black"
                    onChange={e => handleInputChange(player.playerId, 'buyOut', e.target.value)}
                    disabled={sessionSaved}
                    readOnly={sessionSaved}
                  />
                </td>
                <td className="hidden sm:table-cell px-2 py-3 text-center">
                  {player.buyIn && player.buyOut ? Number(player.buyOut) - Number(player.buyIn) : "-"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center text-[#646464] py-6">No players found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SessionTable;
