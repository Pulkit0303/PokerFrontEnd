
import React from "react";

function Input({ Type, Placeholder, name, value, onChange }) {
  return (
    <div className="relative w-[50%] lg:w-[30%]">
      <input
        type={Type}
        placeholder={Placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className="
           bg-white border-3 text-black border-black rounded-4xl pl-3 pr-10 h-11 sm:h-12 md:h-14 w-full text-sm sm:text-base md:text-lg placeholder:text-sm sm:placeholder:text-base md:placeholder:text-lg placeholder:text-[#646464] placeholder:font-medium outline-none
        "
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange({ target: { value: "" } })}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          <img
            src="/cancel.svg"
            alt="clear"
            className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
          />
        </button>
      )}
    </div>
  );
}

export default Input;
