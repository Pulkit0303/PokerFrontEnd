import React from "react";
import Button from "./Button";

function Card({ title, date, usedFor, onDelete, onView }) {
  return (
    <div
      className="flex gap-2 lg:gap-4 bg-black/10 text-black p-2 rounded-3xl hover:bg-black/20"
      role="button"
      tabIndex={0}
    >
      {/* Left Image */}
      <div className="w-[50%] rounded-2xl bg-black/60 p-1" />

      {/* Right Text */}
      <div className="flex flex-col gap-8 flex-1">
        <div>
          <h2 className="text-xl font-semibold truncate" title={title}>
            {title}
          </h2>
          <p className="text-sm text-gray-500">{date}</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          {usedFor === "Group" ? (
            <>
              <Button
                type="Delete"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
              />
              <Button
                type="View"
                onClick={(e) => {
                  e.stopPropagation();
                  onView();
                }}
              />
            </>
          ) : (
            <>
              <Button
                type="Delete"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
              />
              <Button
                type="Result"
                onClick={(e) => {
                  e.stopPropagation();
                  onView();
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
