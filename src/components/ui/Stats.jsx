import React from "react";

function Stats({ stats, sessionSaved }) {
  // If sessionSaved and stats available, show earners and losers, else show placeholders
  const earners = sessionSaved && stats?.earners ? stats.earners : [];
  const losers = sessionSaved && stats?.losers ? stats.losers : [];

  return (
    <div className="flex justify-center items-center gap-4 w-full sm:gap-6 md:gap-8">
      {/* Earners Table */}
      <table
        className="w-[45%] lg:w-[35%] md:w-[40%] border-3 border-black text-black border-dashed rounded-3xl overflow-hidden border-separate"
        style={{ borderSpacing: 0 }}
      >
        <thead>
          <tr>
            <th
              colSpan={2}
              className="text-center text-lg sm:text-2xl md:text-3xl py-1"
            >
              POT TAKERS
            </th>
          </tr>
        </thead>
        <tbody>
          {earners.length > 0 ? (
            earners.map((row, rowIndex) => (
              <tr key={rowIndex} className="h-14 sm:h-16 md:h-20">
                <td className="p-1 text-center text-lg sm:text-xl md:text-2xl truncate">
                  {row.name}
                </td>
                <td className="p-1 text-center text-lg sm:text-xl md:text-2xl truncate text-green-600">
                  +{row.net}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="text-center text-[#646464]">---</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Losers Table */}
      <table
        className="w-[45%] lg:w-[35%] md:w-[40%] border-3 border-black text-black border-dashed rounded-3xl overflow-hidden border-separate"
        style={{ borderSpacing: 0 }}
      >
        <thead>
          <tr>
            <th
              colSpan={2}
              className="text-center text-lg sm:text-2xl md:text-3xl py-1"
            >
              BAD BEATERS
            </th>
          </tr>
        </thead>
        <tbody>
          {losers.length > 0 ? (
            losers.map((row, rowIndex) => (
              <tr key={rowIndex} className="h-14 sm:h-16 md:h-20">
                <td className="p-1 text-center text-lg sm:text-xl md:text-2xl truncate">
                  {row.name}
                </td>
                <td className="p-1 text-center text-lg sm:text-xl md:text-2xl truncate text-red-600">
                  {row.net}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="text-center text-[#646464]">---</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Stats;
