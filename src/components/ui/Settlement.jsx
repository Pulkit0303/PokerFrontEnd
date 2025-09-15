import React from "react";

function Settlement({ settlements = [], sessionSaved }) {
  return (
    <div className="flex justify-center items-start w-screen">
      <table className="lg:w-[70%] w-[90%] border-collapse text-black">
        <thead>
          {/* Title Row Only */}
          <tr>
            <th
              colSpan={4}
              className="px-2 py-3 text-center text-lg sm:text-xl md:text-2xl font-semibold text-black border-b-2 border-black"
            >
              Settlement
            </th>
          </tr>
        </thead>
        <tbody>
          {sessionSaved && settlements.length > 0 ? (
            settlements.map((settlement, idx) => (
              <tr key={idx} className="h-12 sm:h-14 md:h-16 border-b">
                <td className="px-2 py-2 text-center text-sm sm:text-base md:text-lg lg:w-[20%] w-[30%] text-red-600">
                  {settlement.from}
                </td>
                <td className="text-center w-[10%]">
                  <img src="/back.svg" className=" w-6 lg:w-8 mx-auto rotate-180" />
                </td>
                <td className="px-2 py-2 text-center text-sm sm:text-base md:text-lg lg:w-[20%] w-[30%] text-green-600">
                  {settlement.to}
                </td>
                <td className="px-2 py-2 text-center sm:text-base md:text-lg lg:w-[20%] w-[30%] font-semibold text-sm">
                  Rs.{settlement.amount || 0}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center text-[#646464]">---</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Settlement;
