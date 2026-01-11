import React, { useState } from "react";

// ✅ DUMMY MATKA LIST
const matkaList:any[] = [
  {
    matchId: "37939",
    name: "FARIDABAD",
  },
  {
    matchId: "37940",
    name: "GHAZIABAD",
  },
  {
    matchId: "37941",
    name: "GALI",
  },
  {
    matchId: "37942",
    name: "DISAWAR",
  },
];

// ✅ DUMMY API
const betserver = {
  matkaResult: (item:any) => {
    console.log("API HIT → betserver.matkaResult", item);
    return Promise.resolve({ success: true });
  },
};

export default function MatkaResult() {
  const [date, setDate] = React.useState("");
  const [selectedMatchId, setSelectedMatchId] = React.useState("");
  const [result, setResult] = React.useState("");
  const [rows, setRows] = React.useState<any>([]);

  // ✅ SUBMIT HANDLER
  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const selectedGame = matkaList.find(
      (m) => m.matchId === selectedMatchId
    );

    if (!selectedGame) return;

    const payload = {
      matchId: selectedGame.matchId,
      name: selectedGame.name,
      result,
      date,
    };

    // API CALL
    await betserver.matkaResult(payload);

    // Table update (dummy)
    setRows((prev:any) => [...prev, payload]);

    // reset
    setResult("");
  };

  return (
    <div className="container p-3">

<h2 className="ledger-title rounded mb-2 " style={{background:"black" , color:"white"}}>Matka Result</h2>

      {/* ===== FORM ===== */}
      <form onSubmit={handleSubmit} className="row g-3 mb-4">

        {/* DATE */}
        <div className="col-md-3">
          <label className="form-label fw-bold">Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        {/* MARKET */}
        <div className="col-md-3">
          <label className="form-label fw-bold">Market</label>
          <select
            className="form-select"
            value={selectedMatchId}
            onChange={(e) => setSelectedMatchId(e.target.value)}
            required
          >
            <option value="">Select Market</option>
            {matkaList.map((item) => (
              <option key={item.matchId} value={item.matchId}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* RESULT */}
        <div className="col-md-3">
          <label className="form-label fw-bold">Result</label>
          <input
            type="number"
            className="form-control mb-2"
            value={result}
            onChange={(e) => {
              if (e.target.value.length <= 2) {
                setResult(e.target.value);
              }
            }}
            placeholder="Enter Result"
            required
          />
        </div>

        {/* BUTTON */}
        <div className="col-md-3 d-flex mt-2 align-items-end">
          <button type="submit" className="btn btn-success w-100">
            Update
          </button>
        </div>
      </form>

      {/* ===== TABLE ===== */}
      <div className="table-responsive">
        <table className="table table-bordered text-center">
          <thead className="bg-primary text-white">
            <tr>
              <th>SR</th>
              <th>Game</th>
              <th>Result</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {matkaList.length > 0 ? (
              matkaList.map((row:any, idx:any) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{row.name}</td>
                  <td>{row.result}</td>
                  <td>{new Date().toLocaleDateString("en-GB")}</td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>No Result Added</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
