import React from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'

const MatkaPlay = () => {
  const { matchId } = useParams()   // 👈 URL se matchId

  const [gameType, setGameType] = React.useState('')


  const matkaList: any[] = [
    {
      matchId: "37939",
      name: "FARIDABAD",
      matchDateTime: "2024-06-01T12:00:00Z",
      winner: "-1",
      game_type: "Matka"
    },
    {
      matchId: "37940",
      name: "GHAZIABAD",
      matchDateTime: "2024-06-01T12:00:00Z",
      winner: "-1",
      game_type: "Matka"
    },
    {
      matchId: "37941",
      name: "GALI",
      matchDateTime: "2024-06-01T12:00:00Z",
      winner: "-1",
      game_type: "Matka"
    },
    {
      matchId: "37942",
      name: "DISAWAR",
      matchDateTime: "2024-06-01T12:00:00Z",
      winner: "-1",
      game_type: "Matka"
    }
  ]

  // ✅ matching item nikaalo
  const match = matkaList.find(item => item.matchId === matchId)

  if (!match) {
    return <div className="text-center mt-3">Match not found</div>
  }

  const singlePattiNumbers = [
    ...Array.from({ length: 99 }, (_, i) => String(i + 1).padStart(2, '0')),
    '00'
  ]

  const harafNumbers = Array.from({ length: 10 }, (_, i) => i)

  

  return (
    <div className="container w-100 p-0">
        <div className="col-md-12 d-flex justify-content-center mb-2 mt-2">
  <select
    value={gameType}
    onChange={(e) => setGameType(e.target.value)}
    className="select-satta-gametype"
  >
    <option value="">Select Game Type</option>
    <option value="single">Single Patti</option>
    <option value="haraf">Haraf Andar Bahar</option>
  </select>
</div>
      <div className="card single-match text-center my-2">
        <a>
          <h5
            className="ng-binding"
            style={{ backgroundColor: "#FFB200", color: "white" }}
          >
            {match.name}-{moment().format("DD-MM-YYYY")}
          </h5>

          <p
            className="ng-binding mt-1 mb-1"
            style={{ fontSize: "15px", fontWeight: "bold" }}
          >
            {moment().hour(9).minute(0).second(0).format("DD-MM-YYYY hh:mm A")}
          </p>
        </a>

        <div>

        {gameType === 'single' && (
  <>
    <h5 className="col-12 mb-2 harup-satta-text">Single Patti</h5>
    <div className="row">
      {singlePattiNumbers.map((num) => (
        <div key={num} className="col-4 col-md-3 mb-2">
          <button className="btn btn-info w-100">{num}</button>
          <span className="btn w-100">0</span>
        </div>
      ))}
    </div>
  </>
)}


{gameType === 'haraf' && (
  <>
    {/* ANDAR */}
    <h5 className="col-12 mb-2 harup-satta-text">Haraf Andar</h5>
    <div className="row">
      {harafNumbers.map((num) => (
        <div key={`andar-${num}`} className="col-4 col-md-1 mb-2">
          <button className="btn btn-info w-100">{num}</button>
          <span className="btn w-100">0</span>
        </div>
      ))}
    </div>

    {/* BAHAR */}
    <h5 className="col-12 mb-2 harup-satta-text mt-3">Haraf Bahar</h5>
    <div className="row">
      {harafNumbers.map((num) => (
        <div key={`bahar-${num}`} className="col-4 col-md-1 mb-2">
          <button className="btn btn-info w-100">{num}</button>
          <span className="btn w-100">0</span>
        </div>
      ))}
    </div>
  </>
)}





       
</div>

</div>



    </div>
  )
}

export default MatkaPlay
