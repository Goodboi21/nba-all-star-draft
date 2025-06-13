import React, { useRef, useState, useEffect } from "react";

// --- Player Data and 2K25 stats ---
const PLAYER_STATS = {
  "Joker": { overall: 96, inside: 91, outside: 91, athletic: 73, playmaking: 85, rebounding: 68, defending: 74 },
  "Greek Freak": { overall: 98, inside: 98, outside: 80, athletic: 91, playmaking: 85, rebounding: 78, defending: 85 },
  "JB": { overall: 91, inside: 79, outside: 84, athletic: 85, playmaking: 79, rebounding: 54, defending: 73 },
  "JT": { overall: 95, inside: 85, outside: 90, athletic: 85, playmaking: 80, rebounding: 60, defending: 74 },
  "SGA": { overall: 90, inside: 77, outside: 94, athletic: 85, playmaking: 93, rebounding: 47, defending: 64 },
  "Wemby": { overall: 94, inside: 87, outside: 88, athletic: 77, playmaking: 70, rebounding: 82, defending: 88 },
  "Chef": { overall: 95, inside: 58, outside: 92, athletic: 82, playmaking: 89, rebounding: 48, defending: 62 },
  "J Dub": { overall: 89, inside: 69, outside: 87, athletic: 81, playmaking: 79, rebounding: 50, defending: 79 },
  "MotorCade": { overall: 92, inside: 72, outside: 89, athletic: 82, playmaking: 88, rebounding: 52, defending: 66 },
  "Dame $$$": { overall: 91, inside: 62, outside: 89, athletic: 80, playmaking: 89, rebounding: 44, defending: 56 },
  "KD": { overall: 93, inside: 85, outside: 89, athletic: 81, playmaking: 81, rebounding: 49, defending: 63 },
  "Ant Man": { overall: 94, inside: 78, outside: 87, athletic: 97, playmaking: 80, rebounding: 50, defending: 71 },
  "Brow": { overall: 95, inside: 88, outside: 84, athletic: 87, playmaking: 68, rebounding: 79, defending: 85 },
  "LeGM": { overall: 96, inside: 89, outside: 88, athletic: 92, playmaking: 90, rebounding: 60, defending: 68 },
  "Baby Jokic": { overall: 87, inside: 83, outside: 81, athletic: 76, playmaking: 89, rebounding: 81, defending: 69 },
  "DG the PG": { overall: 88, inside: 61, outside: 86, athletic: 81, playmaking: 88, rebounding: 40, defending: 64 },
  "Spida": { overall: 94, inside: 70, outside: 89, athletic: 88, playmaking: 85, rebounding: 49, defending: 63 },
  "KAT": { overall: 89, inside: 88, outside: 86, athletic: 88, playmaking: 64, rebounding: 81, defending: 60 },
  "JJJ": { overall: 90, inside: 53, outside: 69, athletic: 46, playmaking: 81, rebounding: 56, defending: 81 },
  "The Beard": { overall: 90, inside: 74, outside: 86, athletic: 88, playmaking: 88, rebounding: 51, defending: 66 },
  "Mobley Evan": { overall: 92, inside: 85, outside: 83, athletic: 82, playmaking: 68, rebounding: 75, defending: 83 },
  "Spicy P": { overall: 87, inside: 88, outside: 86, athletic: 80, playmaking: 72, rebounding: 61, defending: 78 },
  "Cool White Dude": { overall: 88, inside: 63, outside: 91, athletic: 75, playmaking: 79, rebounding: 47, defending: 53 },
};

const CAPTAINS = [
  { name: "SGA", display: "Free Throw Merchant", src: "/Players/Free Throw Merchant.png" },
  { name: "JT", display: "Duke of Boston", src: "/Players/Duke-of-Boston.jpeg" },
];
const STARTERS = [
  { name: "Fat Head", src: "/Players/Fat Head.png" },
  { name: "KD", src: "/Players/KD.png" },
  { name: "Joker", src: "/Players/Joker.png" },
  { name: "Spida", src: "/Players/Spida.png" },
  { name: "Chef", src: "/Players/Chef.jpg" },
  { name: "LeGM", src: "/Players/LeGM.png" },
  { name: "Greek Freak", src: "/Players/Greek Freak.jpg" },
  { name: "KAT", src: "/Players/KAT.png" },
];
const RESERVES = [
  { name: "J Dub", src: "/Players/J Will.png" },
  { name: "JB", src: "/Players/JB.png" },
  { name: "Cool White Dude", src: "/Players/Cool White Dude.jpeg" },
  { name: "Mobley Evan", src: "/Players/Mobley Evan.jpeg" },
  { name: "Wemby", src: "/Players/Wemby.jpg" },
  { name: "The Beard", src: "/Players/The Beard.png" },
  { name: "Ant Man", src: "/Players/Ant Man.avif" },
  { name: "Baby Jokic", src: "/Players/Baby Jokic.jpeg" },
  { name: "Dame $$$", src: "/Players/Dame $$$.jpg" },
  { name: "JJJ", src: "/Players/JJJ.png" },
  { name: "MotorCade", src: "/Players/MotorCade.png" },
  { name: "Spicy P", src: "/Players/Spicy P.png" },
  { name: "Brow", src: "/Players/Brow.png" },
];
const STRATEGIES = [
  { key: "offensive", label: "Offensive (Unleash your scorers)" },
  { key: "defensive", label: "Defensive (Defense gonna win you chips)" },
  { key: "balanced", label: "Balanced (Best of both worlds)" }
];

// --- MVP LOGIC ---
function playerImpact(p, isStarter, strategy) {
  const stat = PLAYER_STATS[p.name] || { overall: 85, inside: 80, outside: 80, athletic: 75, playmaking: 75, defending: 60, rebounding: 60 };
  let offense = (stat.inside * 0.4 + stat.outside * 0.4 + stat.playmaking * 0.1 + stat.athletic * 0.1);
  let defense = stat.defending * 0.2 + stat.rebounding * 0.1;
  let minBoost = isStarter ? 1.1 : 0.8 + Math.random() * 0.3;
  if (strategy === "offensive") offense *= 1.15;
  if (strategy === "defensive") defense *= 1.10;
  if (strategy === "balanced") { offense *= 1.05; defense *= 1.05; }
  let clutch = Math.random() * 20;
  return (offense * 0.7 + defense * 0.3) * minBoost + clutch;
}
function computeMVP(team, strategy) {
  const starters = team.slice(0, 5);
  const reserves = team.slice(5);
  let impacts = [];
  starters.forEach(p => {
    impacts.push({ name: p.name, impact: playerImpact(p, true, strategy) });
  });
  reserves.forEach(p => {
    impacts.push({ name: p.name, impact: playerImpact(p, false, strategy) });
  });
  impacts.sort((a, b) => b.impact - a.impact);
  return impacts[0];
}
function getTeamStats(teamArr) {
  const starters = teamArr.filter(p => p.name && PLAYER_STATS[p.name]).slice(0, 5);
  if (starters.length === 0) return { overall: 85, offense: 85, defense: 70 };
  const avg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
  return {
    overall: Math.round(avg(starters.map(p => PLAYER_STATS[p.name].overall))),
    offense: Math.round(avg(starters.map(p => (PLAYER_STATS[p.name].inside + PLAYER_STATS[p.name].outside) / 2))),
    defense: Math.round(avg(starters.map(p => PLAYER_STATS[p.name].defending))),
    athletic: Math.round(avg(starters.map(p => PLAYER_STATS[p.name].athletic))),
  };
}

function App() {
  // --- DRAFT PHASE STATE ---
  const [gameStarted, setGameStarted] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [captainPhase, setCaptainPhase] = useState(false);
  const [userCaptain, setUserCaptain] = useState(null);
  const [cpuCaptain, setCpuCaptain] = useState(null);
  const [startersPhase, setStartersPhase] = useState(false);
  const [showGetReadyStarters, setShowGetReadyStarters] = useState(false);
  const [userTeam, setUserTeam] = useState([]);
  const [cpuTeam, setCpuTeam] = useState([]);
  const [draftLog, setDraftLog] = useState([]);
  const [startersPool, setStartersPool] = useState([]);
  const [currentTurn, setCurrentTurn] = useState("user");
  const [reservesPhase, setReservesPhase] = useState(false);
  const [showGetReadyReserves, setShowGetReadyReserves] = useState(false);
  const [reservesPool, setReservesPool] = useState([]);

  // SIMULATION STATE
  const [simulationPhase, setSimulationPhase] = useState(false);
  const [half, setHalf] = useState(1);
  const [userStrategy, setUserStrategy] = useState(null);
  const [cpuStrategy, setCpuStrategy] = useState(null);
  const [userScores, setUserScores] = useState([0, 0, 0, 0]);
  const [cpuScores, setCpuScores] = useState([0, 0, 0, 0]);
  const [showFinal, setShowFinal] = useState(false);
  const [mvp, setMVP] = useState(null);

  const audioRef = useRef();

  // --- Music Controls ---
  const handlePause = () => {
    setMusicPlaying(false);
    audioRef.current && audioRef.current.pause();
  };
  const handleResume = () => {
    setMusicPlaying(true);
    audioRef.current && audioRef.current.play().catch(() => {});
  };
  useEffect(() => {
    if (musicPlaying && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, [musicPlaying]);

  // --- Start Game ---
  const handleStartGame = () => {
    setGameStarted(true);
    setCaptainPhase(true);
    setMusicPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  };

  // --- Captain Selection ---
  const handlePickCaptain = (captain) => {
    setUserCaptain(captain);
    const cpuChoice = CAPTAINS.find(c => c.name !== captain.name);
    setCpuCaptain(cpuChoice);
    setUserTeam([{ ...captain, isCaptain: true }]);
    setCpuTeam([{ ...cpuChoice, isCaptain: true }]);
    setDraftLog([
      { team: "You", player: captain, phase: "captain" },
      { team: "CPU", player: cpuChoice, phase: "captain" },
    ]);
    setCaptainPhase(false);
    setShowGetReadyStarters(true);
  };
  // --- Starters Draft Pool ---
  const beginStartersDraft = () => {
    setShowGetReadyStarters(false);
    setStartersPhase(true);
    setStartersPool(STARTERS.filter(
      p => p.name !== userCaptain.name && p.name !== cpuCaptain.name
    ));
    setCurrentTurn("user");
  };
  // --- CPU Starter Pick ---
  useEffect(() => {
    if (startersPhase && currentTurn === "cpu" && startersPool.length > 0) {
      const available = startersPool.filter(
        p => !userTeam.some(t => t.name === p.name) && !cpuTeam.some(t => t.name === p.name)
      );
      if (available.length === 0) return;
      setTimeout(() => {
        const cpuPick = available[Math.floor(Math.random() * available.length)];
        setCpuTeam(prev => [...prev, cpuPick]);
        setDraftLog(prev => [...prev, { team: "CPU", player: cpuPick, phase: "starters" }]);
        setStartersPool(prev => prev.filter(p => p.name !== cpuPick.name));
        setCurrentTurn("user");
      }, 700);
    }
  }, [currentTurn, startersPhase, startersPool, userTeam, cpuTeam]);
  // --- End Starters Phase ---
  useEffect(() => {
    if (startersPhase && startersPool.length === 0 && userCaptain && cpuCaptain) {
      setStartersPhase(false);
      setShowGetReadyReserves(true);
    }
  }, [startersPool, startersPhase, userCaptain, cpuCaptain]);
  // --- User Draft Starter ---
  const handleDraftStarter = (player) => {
    const picked =
      userTeam.some(t => t.name === player.name) ||
      cpuTeam.some(t => t.name === player.name);
    if (currentTurn !== "user" || picked) return;
    setUserTeam(prev => [...prev, player]);
    setDraftLog(prev => [...prev, { team: "You", player, phase: "starters" }]);
    setStartersPool(prev => prev.filter(p => p.name !== player.name));
    setCurrentTurn("cpu");
  };
  // --- Begin Reserves Draft ---
  const beginReservesDraft = () => {
    setShowGetReadyReserves(false);
    const pickedNames = [...userTeam, ...cpuTeam].map(p => p.name);
    setReservesPool(
      RESERVES.filter(p => !pickedNames.includes(p.name))
    );
    setReservesPhase(true);
    setCurrentTurn("user");
  };
  // --- CPU Reserves Pick ---
  useEffect(() => {
    if (reservesPhase && currentTurn === "cpu" && reservesPool.length > 0) {
      const available = reservesPool.filter(
        p => !userTeam.some(t => t.name === p.name) && !cpuTeam.some(t => t.name === p.name)
      );
      if (available.length === 0) return;
      setTimeout(() => {
        const cpuPick = available[Math.floor(Math.random() * available.length)];
        setCpuTeam(prev => [...prev, cpuPick]);
        setDraftLog(prev => [...prev, { team: "CPU", player: cpuPick, phase: "reserves" }]);
        setReservesPool(prev => prev.filter(p => p.name !== cpuPick.name));
        setCurrentTurn("user");
      }, 700);
    }
  }, [currentTurn, reservesPhase, reservesPool, userTeam, cpuTeam]);
  // --- End Reserves Phase ---
  useEffect(() => {
    if (reservesPhase && reservesPool.length === 0 && userCaptain && cpuCaptain) {
      setReservesPhase(false);
    }
  }, [reservesPool, reservesPhase, userCaptain, cpuCaptain]);
  // --- User Draft Reserve ---
  const handleDraftReserve = (player) => {
    const picked =
      userTeam.some(t => t.name === player.name) ||
      cpuTeam.some(t => t.name === player.name);
    if (currentTurn !== "user" || picked) return;
    setUserTeam(prev => [...prev, player]);
    setDraftLog(prev => [...prev, { team: "You", player, phase: "reserves" }]);
    setReservesPool(prev => prev.filter(p => p.name !== player.name));
    setCurrentTurn("cpu");
  };
  // --- Helper: Show Draft Log ---
  function DraftLog() {
    return (
      <div style={{ display: "flex", justifyContent: "center", gap: 40 }}>
        <div>
          <h4>Your Picks</h4>
          <ol style={{ textAlign: "left" }}>
            {draftLog
              .filter((pick) => pick.team === "You")
              .map((pick, i) => (
                <li key={i}>
                  <img
                    src={pick.player.src}
                    alt={pick.player.name}
                    width={36}
                    style={{
                      verticalAlign: "middle",
                      borderRadius: 7,
                      marginRight: 6,
                    }}
                  />
                  {pick.player.display || pick.player.name}
                  {pick.phase === "captain" && (
                    <span style={{ color: "#888", fontSize: 12 }}> (captain)</span>
                  )}
                  {pick.phase === "starters" && (
                    <span style={{ color: "#888", fontSize: 12 }}> (starter)</span>
                  )}
                  {pick.phase === "reserves" && (
                    <span style={{ color: "#888", fontSize: 12 }}> (reserve)</span>
                  )}
                </li>
              ))}
          </ol>
        </div>
        <div>
          <h4>CPU Picks</h4>
          <ol style={{ textAlign: "left" }}>
            {draftLog
              .filter((pick) => pick.team === "CPU")
              .map((pick, i) => (
                <li key={i}>
                  <img
                    src={pick.player.src}
                    alt={pick.player.name}
                    width={36}
                    style={{
                      verticalAlign: "middle",
                      borderRadius: 7,
                      marginRight: 6,
                    }}
                  />
                  {pick.player.display || pick.player.name}
                  {pick.phase === "captain" && (
                    <span style={{ color: "#888", fontSize: 12 }}> (captain)</span>
                  )}
                  {pick.phase === "starters" && (
                    <span style={{ color: "#888", fontSize: 12 }}> (starter)</span>
                  )}
                  {pick.phase === "reserves" && (
                    <span style={{ color: "#888", fontSize: 12 }}> (reserve)</span>
                  )}
                </li>
              ))}
          </ol>
        </div>
      </div>
    );
  }
  // --- SIMULATION PHASE LOGIC ---
  useEffect(() => {
    if (
      reservesPhase === false &&
      !showGetReadyReserves &&
      !startersPhase &&
      !showGetReadyStarters &&
      !captainPhase &&
      gameStarted &&
      userTeam.length > 0 &&
      cpuTeam.length > 0 &&
      userScores.every(s => s === 0) &&
      cpuScores.every(s => s === 0) &&
      !simulationPhase
    ) {
      setSimulationPhase(true);
      setHalf(1);
      setUserStrategy(null);
      setCpuStrategy(null);
      setUserScores([0, 0, 0, 0]);
      setCpuScores([0, 0, 0, 0]);
      setShowFinal(false);
    }
  }, [reservesPhase, showGetReadyReserves, startersPhase, showGetReadyStarters, captainPhase, gameStarted, userTeam, cpuTeam, userScores, cpuScores, simulationPhase]);
  function simulateHalf(halfNumber, userStrat, cpuStrat) {
    let userStats = getTeamStats(userTeam);
    let cpuStats = getTeamStats(cpuTeam);
    let userQuarterScores = [...userScores];
    let cpuQuarterScores = [...cpuScores];
    for (let i = (halfNumber - 1) * 2; i < halfNumber * 2; i++) {
      let userBase = 38 + Math.floor((userStats.offense - 80) * 0.8) + Math.floor(Math.random() * 14);
      let cpuBase = 38 + Math.floor((cpuStats.offense - 80) * 0.8) + Math.floor(Math.random() * 14);
      if (userStrat === "offensive") userBase += 8 + Math.floor(Math.random() * 4);
      if (userStrat === "defensive") {
        cpuBase -= 8 + Math.floor(Math.random() * 6);
        userBase -= 2;
      }
      if (userStrat === "balanced") userBase += 3 + Math.floor(Math.random() * 3);
      if (cpuStrat === "offensive") cpuBase += 8 + Math.floor(Math.random() * 4);
      if (cpuStrat === "defensive") {
        userBase -= 8 + Math.floor(Math.random() * 6);
        cpuBase -= 2;
      }
      if (cpuStrat === "balanced") cpuBase += 3 + Math.floor(Math.random() * 3);
      userQuarterScores[i] = Math.max(25, Math.min(userBase, 70));
      cpuQuarterScores[i] = Math.max(25, Math.min(cpuBase, 70));
    }
    setUserScores(userQuarterScores);
    setCpuScores(cpuQuarterScores);
  }
  function cpuPickStrategy() {
    const keys = ["offensive", "offensive", "balanced", "defensive"];
    return keys[Math.floor(Math.random() * keys.length)];
  }
  function handleStrategyPick(key) {
    setUserStrategy(key);
    const cpuKey = cpuPickStrategy();
    setCpuStrategy(cpuKey);
    setTimeout(() => {
      simulateHalf(half, key, cpuKey);
      if (half === 1) {
        setTimeout(() => {
          setUserStrategy(null);
          setCpuStrategy(null);
          setHalf(2);
        }, 1300);
      } else {
        setTimeout(() => {
          setShowFinal(true);
          setSimulationPhase(false);
        }, 1300);
      }
    }, 800);
  }
  // --- MVP computation after game ends
  useEffect(() => {
    if (showFinal) {
      const totalUser = userScores.reduce((a, b) => a + b, 0);
      const totalCPU = cpuScores.reduce((a, b) => a + b, 0);
      const userStrat = userStrategy || "balanced";
      const cpuStrat = cpuStrategy || "offensive";
      let winningMVP = null;
      let mvpTeam = "";
      if (totalUser > totalCPU) {
        winningMVP = computeMVP(userTeam, userStrat);
        mvpTeam = "You";
      } else if (totalCPU > totalUser) {
        winningMVP = computeMVP(cpuTeam, cpuStrat);
        mvpTeam = "CPU";
      } else {
        const userM = computeMVP(userTeam, userStrat);
        const cpuM = computeMVP(cpuTeam, cpuStrat);
        winningMVP = userM.impact >= cpuM.impact ? userM : cpuM;
        mvpTeam = userM.impact >= cpuM.impact ? "You" : "CPU";
      }
      setMVP({ ...winningMVP, mvpTeam });
    }
    // eslint-disable-next-line
  }, [showFinal]);

  // --- MAIN RENDER ---
  return (
    <div
      style={{
        position: "relative",
        textAlign: "center",
        padding: 20,
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: "url('/StephLeBron.jpeg')", // <-- Use your exact file name here!
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Music controls and audio */}
      <div style={{ position: "absolute", top: 10, left: 10, zIndex: 10 }}>
        <button onClick={handlePause} disabled={!musicPlaying} style={{ marginRight: 8 }}>
          Pause Music
        </button>
        <button onClick={handleResume} disabled={musicPlaying}>
          Resume Music
        </button>
      </div>
      <audio ref={audioRef} src="/background.mp3" loop />
      <div style={{ position: "relative", zIndex: 1 }}>
        {simulationPhase ? (
          <div style={{ textAlign: "center", padding: 20 }}>
            <h1 style={{ marginBottom: 10 }}>All-Star Game Simulation</h1>
            <div>
              <h2>{half === 1 ? "First Half" : "Second Half"}</h2>
              <div style={{ margin: "18px 0", fontSize: 18 }}>
                {userStrategy === null ? (
                  <>
                    <div style={{ marginBottom: 10, color: "#286e43", fontWeight: "bold" }}>
                      Choose your strategy for {half === 1 ? "the first half" : "the second half"}
                    </div>
                    {STRATEGIES.map(s => (
                      <button
                        key={s.key}
                        style={{ fontSize: 18, margin: 8, padding: "10px 28px" }}
                        onClick={() => handleStrategyPick(s.key)}
                      >
                        {s.label}
                      </button>
                    ))}
                  </>
                ) : (
                  <>
                    <div>
                      <b>Your Strategy:</b> {STRATEGIES.find(s => s.key === userStrategy).label}
                      <br />
                      <b>CPU Strategy:</b> {cpuStrategy ? STRATEGIES.find(s => s.key === cpuStrategy).label : "Picking..."}
                    </div>
                  </>
                )}
              </div>
              <div>
                <h3>Scoreboard</h3>
                <table style={{ margin: "0 auto", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th style={{ padding: 6 }}> </th>
                      <th style={{ padding: 6 }}>Q1</th>
                      <th style={{ padding: 6 }}>Q2</th>
                      <th style={{ padding: 6 }}>Q3</th>
                      <th style={{ padding: 6 }}>Q4</th>
                      <th style={{ padding: 6 }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ fontWeight: "bold", padding: 6 }}>You</td>
                      <td style={{ padding: 6 }}>{userScores[0]}</td>
                      <td style={{ padding: 6 }}>{userScores[1]}</td>
                      <td style={{ padding: 6 }}>{userScores[2]}</td>
                      <td style={{ padding: 6 }}>{userScores[3]}</td>
                      <td style={{ fontWeight: "bold", padding: 6 }}>{userScores.reduce((a, b) => a + b, 0)}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: "bold", padding: 6 }}>CPU</td>
                      <td style={{ padding: 6 }}>{cpuScores[0]}</td>
                      <td style={{ padding: 6 }}>{cpuScores[1]}</td>
                      <td style={{ padding: 6 }}>{cpuScores[2]}</td>
                      <td style={{ padding: 6 }}>{cpuScores[3]}</td>
                      <td style={{ fontWeight: "bold", padding: 6 }}>{cpuScores.reduce((a, b) => a + b, 0)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {(half === 1 && userStrategy === null && userScores[0] + userScores[1] > 0) && (
                <div style={{ marginTop: 14, color: "#4069c9", fontWeight: "bold" }}>
                  Halftime! It's time to adjust your tactics for the second half.
                </div>
              )}
            </div>
          </div>
        ) : showFinal ? (
          <div style={{ textAlign: "center", padding: 20 }}>
            <h1>All-Star Game Final Score</h1>
            <div>
              <h2>Final Score</h2>
              <div style={{ fontSize: 22, margin: "32px 0" }}>
                <span style={{ fontWeight: "bold", color: "#0b2047" }}>You</span>: {userScores.reduce((a, b) => a + b, 0)} <br />
                <span style={{ fontWeight: "bold", color: "#a43e1e" }}>CPU</span>: {cpuScores.reduce((a, b) => a + b, 0)}
              </div>
              <div style={{ fontSize: 20, color: userScores.reduce((a, b) => a + b, 0) > cpuScores.reduce((a, b) => a + b, 0) ? "#1d9c4b" : "#a43e1e", margin: "24px 0" }}>
                {userScores.reduce((a, b) => a + b, 0) > cpuScores.reduce((a, b) => a + b, 0)
                  ? "Easy Money. Let's go"
                  : "Tough Luck Mate. It's the All Star tho"}
              </div>
              {mvp && (
                <div style={{ margin: "30px 0", fontSize: 20 }}>
                  <b>All-Star Game MVP:</b>
                  <div style={{ marginTop: 12 }}>
                    <span style={{ color: mvp.mvpTeam === "You" ? "#0b2047" : "#a43e1e", fontWeight: "bold" }}>
                      {mvp.name}
                    </span>
                    <span style={{ color: "#666" }}>
                      {" "}({Math.round(mvp.impact)} impact score)
                    </span>
                    <br />
                    <span style={{
                      fontSize: 15,
                      color: mvp.mvpTeam === "You" ? "#4069c9" : "#a43e1e"
                    }}>
                      MVP from {mvp.mvpTeam === "You" ? "your team!" : "CPU team!"}
                    </span>
                  </div>
                </div>
              )}
              <button
                onClick={() => window.location.reload()}
                style={{ marginTop: 24, fontSize: 18, padding: "8px 32px" }}
              >
                Restart Game
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1 style={{ color: "#fff", textShadow: "0 2px 8px #000" }}>NBA All-Star Draft Game</h1>
            {!gameStarted ? (
              <button
                style={{ fontSize: 24, padding: "12px 36px" }}
                onClick={handleStartGame}
              >
                Start Game
              </button>
            ) : captainPhase ? (
              <div>
                <h2 style={{ color: "#fff" }}>Select Your Captain</h2>
                <div style={{ display: "flex", justifyContent: "center", gap: 40 }}>
                  {CAPTAINS.map((cap) => (
                    <div
                      key={cap.name}
                      style={{
                        cursor: "pointer",
                        border: "2px solid #444",
                        borderRadius: 10,
                        padding: 10,
                        width: 200,
                        background: "#eee",
                        transition: "border 0.2s",
                      }}
                      onClick={() => handlePickCaptain(cap)}
                    >
                      <img
                        src={cap.src}
                        alt={cap.display}
                        width={180}
                        style={{ borderRadius: 8 }}
                      />
                      <br />
                      <b>{cap.display}</b>
                    </div>
                  ))}
                </div>
              </div>
            ) : showGetReadyStarters ? (
              <div>
                <h2 style={{ color: "#fff" }}>Captains Locked In!</h2>
                <div style={{ display: "flex", justifyContent: "center", gap: 40 }}>
                  <div>
                    <h3 style={{ color: "#fff" }}>Your Captain</h3>
                    {userCaptain && (
                      <div>
                        <img src={userCaptain.src} alt={userCaptain.display} width={120} style={{ borderRadius: 8 }} /><br />
                        <b style={{ color: "#fff" }}>{userCaptain.display}</b>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 style={{ color: "#fff" }}>CPU Captain</h3>
                    {cpuCaptain && (
                      <div>
                        <img src={cpuCaptain.src} alt={cpuCaptain.display} width={120} style={{ borderRadius: 8 }} /><br />
                        <b style={{ color: "#fff" }}>{cpuCaptain.display}</b>
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ marginTop: 32 }}>
                  <div style={{ fontWeight: "bold", fontSize: 18, background: "#4069c9", color: "#fff", display: "inline-block", padding: "4px 8px", borderRadius: 3 }}>
                    Get ready to draft the Starters!
                  </div>
                  <br />
                  <button style={{ marginTop: 24, fontSize: 18, padding: "10px 32px" }} onClick={beginStartersDraft}>
                    Start Starters Draft
                  </button>
                </div>
              </div>
            ) : startersPhase ? (
              <div>
                <h2 style={{ color: "#fff" }}>Draft Starters</h2>
                <div style={{ marginBottom: 12 }}>
                  <b>
                    {currentTurn === "user"
                      ? "Your Turn: Pick a Starter"
                      : "CPU is drafting..."}
                  </b>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "18px",
                    justifyContent: "center",
                    marginBottom: 18,
                  }}
                >
                  {startersPool.map(player => {
                    const picked =
                      userTeam.some(t => t.name === player.name) ||
                      cpuTeam.some(t => t.name === player.name);
                    return (
                      <div
                        key={player.name}
                        style={{
                          width: 160,
                          textAlign: "center",
                          border: picked ? "2px solid #bbb" : "2px solid #aaa",
                          borderRadius: 10,
                          padding: 10,
                          background: picked ? "#f3f3f3" : "#fafafa",
                          cursor:
                            !picked && currentTurn === "user"
                              ? "pointer"
                              : "not-allowed",
                          opacity: picked
                            ? 0.5
                            : currentTurn === "user"
                            ? 1
                            : 0.7,
                        }}
                        onClick={() =>
                          !picked && currentTurn === "user"
                            ? handleDraftStarter(player)
                            : undefined
                        }
                      >
                        <img
                          src={player.src}
                          alt={player.name}
                          width="120"
                          style={{ borderRadius: 8 }}
                        />
                        <div style={{ marginTop: 8, fontWeight: "bold" }}>
                          {player.name}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <DraftLog />
              </div>
            ) : showGetReadyReserves ? (
              <div>
                <h2 style={{ color: "#fff" }}>Starters Draft Complete!</h2>
                <div style={{ marginTop: 32 }}>
                  <div style={{ fontWeight: "bold", fontSize: 18, background: "#1d9c4b", color: "#fff", display: "inline-block", padding: "4px 12px", borderRadius: 3 }}>
                    Time to build your bench! Draft the Reserves and complete your All-Star squad!
                  </div>
                  <br />
                  <button style={{ marginTop: 24, fontSize: 18, padding: "10px 32px" }} onClick={beginReservesDraft}>
                    Start Reserves Draft
                  </button>
                </div>
                <DraftLog />
              </div>
            ) : reservesPhase ? (
              <div>
                <h2 style={{ color: "#fff" }}>Draft Reserves</h2>
                <div style={{ marginBottom: 12 }}>
                  <b>
                    {currentTurn === "user"
                      ? "Your Turn: Pick a Reserve"
                      : "CPU is drafting..."}
                  </b>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "18px",
                    justifyContent: "center",
                    marginBottom: 18,
                  }}
                >
                  {reservesPool.map(player => {
                    const picked =
                      userTeam.some(t => t.name === player.name) ||
                      cpuTeam.some(t => t.name === player.name);
                    return (
                      <div
                        key={player.name}
                        style={{
                          width: 160,
                          textAlign: "center",
                          border: picked ? "2px solid #bbb" : "2px solid #aaa",
                          borderRadius: 10,
                          padding: 10,
                          background: picked ? "#f3f3f3" : "#fafafa",
                          cursor:
                            !picked && currentTurn === "user"
                              ? "pointer"
                              : "not-allowed",
                          opacity: picked
                            ? 0.5
                            : currentTurn === "user"
                            ? 1
                            : 0.7,
                        }}
                        onClick={() =>
                          !picked && currentTurn === "user"
                            ? handleDraftReserve(player)
                            : undefined
                        }
                      >
                        <img
                          src={player.src}
                          alt={player.name}
                          width="120"
                          style={{ borderRadius: 8 }}
                        />
                        <div style={{ marginTop: 8, fontWeight: "bold" }}>
                          {player.name}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <DraftLog />
              </div>
            ) : (
              reservesPhase === false &&
              !showGetReadyReserves &&
              !startersPhase &&
              !showGetReadyStarters &&
              !captainPhase &&
              gameStarted && (
                <div>
                  <h2 style={{ color: "#fff" }}>Draft Complete!</h2>
                  <DraftLog />
                  <button
                    onClick={() => window.location.reload()}
                    style={{ marginTop: 24, fontSize: 18, padding: "8px 32px" }}
                  >
                    Restart Game
                  </button>
                </div>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;