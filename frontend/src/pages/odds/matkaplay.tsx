import React from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import authService from "../../services/auth.service";
import { betPopup } from "../../redux/actions/bet/betSlice";
import { RoleType } from "../../models/User";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectUserData } from "../../redux/actions/login/loginSlice";
import { IBetOn, IBetType } from "../../models/IBet";
import { OddsType } from "../../models/IMarket";

const MatkaPlay = () => {
  const { matchId } = useParams(); // 👈 URL se matchId

  const userState = useAppSelector(selectUserData)
  const dispatch = useAppDispatch()

  const [gameType, setGameType] = React.useState("");

  const matkaList: any[] = [
    {
      matchId: "37939",
      name: "FARIDABAD",
      matchDateTime: "2024-06-01T12:00:00Z",
      winner: "-1",
      game_type: "Matka",
    },
    {
      matchId: "37940",
      name: "GHAZIABAD",
      matchDateTime: "2024-06-01T12:00:00Z",
      winner: "-1",
      game_type: "Matka",
    },
    {
      matchId: "37941",
      name: "GALI",
      matchDateTime: "2024-06-01T12:00:00Z",
      winner: "-1",
      game_type: "Matka",
    },
    {
      matchId: "37942",
      name: "DISAWAR",
      matchDateTime: "2024-06-01T12:00:00Z",
      winner: "-1",
      game_type: "Matka",
    },
  ];

  // ✅ matching item nikaalo
  const match = matkaList.find((item) => item.matchId === matchId);

  if (!match) {
    return <div className="text-center mt-3">Match not found</div>;
  }

  const singlePattiNumbers = [
    ...Array.from({ length: 99 }, (_, i) => String(i + 1).padStart(2, "0")),
    "00",
  ];

  const harafNumbers = Array.from({ length: 10 }, (_, i) => i);



   const onBetkkkold = (isBack = false, market: any) => {
    console.log(market,"market in matka")
        if (userState.user.role !== RoleType.user) return false
  
        // if (market.BackPrice1 === 0 && isBack) return false
        // if (market.LayPrice1 === 0 && !isBack) return false
  
        const ipAddress = authService.getIpAddress()
       
        dispatch(
          betPopup({
            isOpen: true,
            betData: {
              isBack,
              odds: isBack ? market.BackPrice1 : market.LayPrice1,
              volume: isBack ? market.BackSize1 : market.LaySize1,
              marketId: market.marketId,
              marketName: 'MATKA',
              matchId: market.matchId,
              selectionName: market.RunnerName,
              selectionId: market.SelectionId,
              pnl: 0,
              stack: 0,
              currentMarketOdds: isBack ? market.BackPrice1 : market.LayPrice1,
              eventId: market.sportId,
              exposure: -0,
              ipAddress: ipAddress,
              type: IBetType.Match,
              matchName: "matka disawa",
              betOn: IBetOn.MATKA,
              gtype: market.gtype,
              oppsiteVol: isBack ? market.LaySize1 : market.BackSize1,
              oddsType: OddsType.M,
            },
          }),
        )

        console.log(market,"market in matka555")
      }

      const onBet = (isBack = false, market: any) => {
        console.log("🔥 onBet CLICKED");
        console.log("👉 userState:", userState);
        console.log("👉 market received:", market);
      
        if (userState.user.role !== RoleType.user) {
          console.log("❌ User role not allowed:", userState.user.role);
          return false;
        }
      
        const ipAddress = authService.getIpAddress();
        console.log("👉 IP Address:", ipAddress);
      
        const payload:any = {
          isOpen: true,
          betData: {
            isBack,
            odds: 0,
            volume: 0,
            marketId: market.matchId,
            marketName: "MATKA",
            matchId: market.matchId,
            selectionName: market.num,
            selectionId: market.num,
            pnl: 0,
            stack: 0,
            currentMarketOdds: 0,
            eventId: "MATKA",
            exposure: 0,
            ipAddress,
            type: IBetType.Match,
            matchName: match.name,
            betOn: IBetOn.MATKA,
            gtype: gameType,
            oppsiteVol: 0,
            oddsType: OddsType.M,
          },
        };
      
        console.log("🚀 DISPATCHING betPopup payload:", payload);
      
        dispatch(betPopup(payload));
      
        console.log("✅ betPopup DISPATCHED");
      };
      


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
          {gameType === "single" && (
            <>
              <h5 className="col-12 mb-2 harup-satta-text">Single Patti</h5>
              <div className="row">
                {singlePattiNumbers.map((num) => (
                  <div key={num} className="col-4 col-md-3 mb-2">
                    <button   onClick={() => onBet(true, {num, matchId })} className="btn btn-info w-100">{num}</button>
                    <span className="btn w-100">0s</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {gameType === "haraf" && (
            <>
              {/* ANDAR */}
              <h5 className="col-12 mb-2 harup-satta-text">Haraf Andar</h5>
              <div className="row">
                {harafNumbers.map((num) => (
                  <div key={`andar-${num}`} className="col-4 col-md-1 mb-2">
                    <button onClick={() => onBet(true, {num, matchId })} className="btn btn-info w-100">{num}</button>
                    <span className="btn w-100">0</span>
                  </div>
                ))}
              </div>

              {/* BAHAR */}
              <h5 className="col-12 mb-2 harup-satta-text mt-3">Haraf Bahar</h5>
              <div className="row">
                {harafNumbers.map((num) => (
                  <div key={`bahar-${num}`} className="col-4 col-md-1 mb-2">
                    <button onClick={() => onBet(true, {num, matchId })} className="btn btn-info w-100">{num}</button>
                    <span className="btn w-100">0</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatkaPlay;
