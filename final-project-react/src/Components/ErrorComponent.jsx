import React, { useState } from "react";

function FaultyComponent() {
  const [throwError, setThrowError] = useState(false);

  if (throwError) {
    throw new Error("Este es un error de prueba");
  }

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc" }}>
        <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#f44336",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
        onClick={() => setThrowError(true)}
      >
        Generar Error
      </button>
    </div>
  );
}

export default FaultyComponent;
