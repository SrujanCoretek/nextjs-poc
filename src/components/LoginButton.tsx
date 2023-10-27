"use client";

import React from "react";
import { PRIMARY_BUTTON_WRAPPER } from "./themes/button";

const loginButton = () => {
  return (
    <button type="submit" className={PRIMARY_BUTTON_WRAPPER}>
      LOG IN
    </button>
  );
};

export default loginButton;
