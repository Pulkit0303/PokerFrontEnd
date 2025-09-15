import React from 'react'

function Notification({ type, message }) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex flex-col gap-6`}
      style={{ minWidth: "220px" }}
    >
      <div className={`font-medium bg-white flex flex-row p-3 border-3 border-black w-fit rounded-3xl items-center text-black gap-2 justify-center shadow-lg`}>
        <img src={type === "success" ? "/tick.svg" : "/cross.svg"} className="w-6" />
        <span>{message}</span>
      </div>
    </div>
  );
}

export default Notification