import React from "react";

export default function Home() {
  return (
    <div className="select_boxset">
      <div
        className="select_box"
        onClick={() => (window.location.href = "/ratedetails")}
      >
        <h1>Rates</h1>
      </div>

      <div
        className="select_box"
        onClick={() => (window.location.href = "/add-complaint")}
      >
        <h1>Complaints</h1>
      </div>
      <div
        className="select_box"
        onClick={() => (window.location.href = "/admindash")}
      >
        <h1>Admin</h1>
      </div>
    </div>
  );
}
