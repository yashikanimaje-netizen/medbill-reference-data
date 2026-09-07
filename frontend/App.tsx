import React from "react";
import { TestComparison } from "./components/TestComparison";

export default function App() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Medbill Reference Data Auditor</h1>
      <TestComparison />
    </div>
  );
}
