import React from "react";

function Button({ type, onClick }) {
  if (type === "Delete") {
    return (
      <button
        className="px-4 py-1 border-2 text-red-600 border-red-600 rounded-3xl hover:bg-red-600 hover:text-white transition"
        onClick={onClick}
      >
        Delete
      </button>
    );
  }
  if (type === "View") {
    return (
      <button
        className="px-4 py-1 border-2 text-black border-black rounded-3xl hover:bg-black hover:text-white transition"
        onClick={onClick}
      >
        View
      </button>
    );
  }
  if (type === "Result") {
    return (
      <button
        className="px-4 py-1 border-2 text-green-600 border-green-600 rounded-3xl hover:bg-green-600 hover:text-white transition"
        onClick={onClick}
      >
        Result
      </button>
    );
  }
  if (type === "Create") {
    return (
      <button
        className="py-2 w-[40%] lg:w-[20%] md:w-[30%] border-2 rounded-3xl text-black border-black hover:bg-black hover:text-white transition"
        onClick={onClick}
      >
        Create Session
      </button>
    );
  }
  if (type === "Save") {
    return (
      <button
        className="px-4 py-1 border-2 text-black border-black rounded-3xl hover:bg-black hover:text-white transition"
        onClick={onClick}
      >
        Save
      </button>
    );
  }
  if (type === "Add") {
    return (
      <button
        className="px-6 py-1 border-3 text-black border-black rounded-3xl hover:bg-black hover:text-white transition font-semibold"
        onClick={onClick}
      >
        Add
      </button>
    );
  }
  if (type === "Logout") {
    return (
      <button className="absolute right-4 top-4 border-2 rounded-xl z-10 w-[120px] text-center px-4 py-2 text-black hover:text-white hover:bg-black transition-colors duration-300 ">
        Logout
      </button>
    );
  }
}

export default Button;
