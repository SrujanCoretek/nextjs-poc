"use client";
import React, { useState } from "react";

const Input = ({ name, props }: any) => {
  const [userName, setUserName] = useState("");
  console.log(userName);
  return (
    <div className="relative mb-4">
      <div
        className={` rounded-xl overflow-hidden flex gap-4 p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]`}
      >
        <input placeholder={name} {...props} />
      </div>
    </div>
  );
};

export default Input;
