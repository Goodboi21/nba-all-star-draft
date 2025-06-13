import React from "react";

function BackgroundTest() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: "url('/stephvsleBron.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <h1 style={{ color: "#fff", textShadow: "0 2px 8px #000", paddingTop: 40 }}>
        Background Image Test
      </h1>
    </div>
  );
}

export default BackgroundTest;
