import React from "react";

function Table({ players = [], formatAmount, getAmountColorClass, onRemove }) {
  return (
    <div className="flex justify-center items-start w-full mx-auto">
      <table className="w-[90%] max-w-5xl border-collapse text-black">
        <thead>
          <tr className="border-b-2 border-black">
            <th className="px-2 py-2 text-center text-sm sm:text-base md:text-lg w-1/12">POS.</th>
            <th className="px-2 py-2 text-center text-sm sm:text-base md:text-lg w-3/12">NAME</th>
            <th className="px-2 py-2 text-center text-sm sm:text-base md:text-lg w-3/12">EARNINGS</th>
            <th className="px-2 py-2 text-center text-sm sm:text-base md:text-lg hidden sm:table-cell w-3/12">SESSIONS</th>
            <th className="px-2 py-2 text-center text-sm sm:text-base md:text-lg w-2/12">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {players.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-400">No players found.</td>
            </tr>
          ) : (
            players.map((player, idx) => (
              <tr key={player._id} className="h-12 sm:h-14 md:h-16 border-b">
                <td className="px-2 py-2 text-center text-sm sm:text-base md:text-lg">{idx + 1}</td>
                <td className="px-2 py-2 text-center text-sm sm:text-base md:text-lg">{player.name}</td>
                <td className={`px-2 py-2 text-center font-semibold text-lg sm:text-xl md:text-2xl ${getAmountColorClass ? getAmountColorClass(player.totalNet) : ""}`}>{formatAmount ? formatAmount(player.totalNet) : player.totalNet}</td>
                <td className="px-2 py-2 text-center text-sm sm:text-base md:text-lg hidden sm:table-cell">{player.numberOfSessions} Sessions</td>
                <td className="px-2 py-2 text-center align-middle">
                  <button
                    className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 mx-auto"
                    onClick={() => onRemove && onRemove(player._id)}
                  >
                    <img src="/trash.svg" alt="Delete" className="w-1/2 h-1/2 block" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
