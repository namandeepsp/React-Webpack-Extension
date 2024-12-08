import React from "react";

const Button = ({ id, tooltip, bgColor, handleClick }) => {
  return (
    <button
      id={id}
      title={tooltip}
      style={{
        backgroundColor: bgColor,
      }}
      onClick={handleClick}
    >
      Click Me!
    </button>
  );
};

export default Button;
