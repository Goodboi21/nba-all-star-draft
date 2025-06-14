import React, { useRef, useState } from "react";

// ---- CONSTANTS AND HELPERS ----
const CAPTAINS = [
  { name: "Duke of Boston", base: "Duke-Of-Boston" },
  { name: "Free throw Merchant", base: "Free Throw Merchant" }
];
const STARTERS = [
  { name: "Fat Head", base: "Fat Head" },
  { name: "KD", base: "KD" },
  { name: "Greek Freak", base: "Greek Freak" },
  { name: "KAT", base: "KAT" },
  { name: "Spida", base: "Spida" },
  { name: "Chef", base: "Chef" },
  { name: "LeGM", base: "LeGM" },
  { name: "The Joker", base: "Joker" }
];
const RESERVES = [
  { name: "Spicy P", base: "Spicy P" },
  { name: "Cool White Dude", base: "Cool White Dude" },
  { name: "Mobley Evan", base: "Mobley Evan" },
  { name: "DG the PG", base: "DG the PG" },
  { name: "Brow", base: "Brow" },
  { name: "The Beard", base: "The Beard" },
  { name: "Dame $$$", base: "Dame $$$" },
  { name: "J Dub", base: "J Will" },
  { name: "MotorCade", base: "MotorCade" },
  { name: "JB", base: "JB" },
  { name: "Baby Jokic", base: "Baby Jokic" },
  { name: "JJJ", base: "JJJ" },
  { name: "Ant Man", base: "Ant Man" },
  { name: "Wemby", base: "Wemby" }
];
const IMAGE_EXTENSIONS = ['jpg', 'png', 'jpeg', 'avif'];
function PlayerImage({ base, size = 40, style = {} }) {
  const [srcIdx, setSrcIdx] = useState(0);
  if (!base) return null;
  const src = `/players/${base}.${IMAGE_EXTENSIONS[srcIdx]}`;
  return (
    <img
      src={src}
      alt={base}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        objectFit: "cover",
        background: "#eee",
        ...style
      }}
      onError={e => {
        if (srcIdx < IMAGE_EXTENSIONS.length - 1) {
          setSrcIdx(srcIdx + 1);
        } else {
          e.target.onerror = null;
          e.target.src = "/players/default.jpg";
        }
      }}
    />
  );
}
function getRandomIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}

const STRATEGIES = [
  { key: "offense", label: "All Gas, No Brakes", emoji: "🚀", color: "#ff5e57" },
  { key: "balanced", label: "Balanced", emoji: "⚖️", color: "#36cfc9" },
  { key: "defense", label: "Lockdown Defence", emoji: "🛡️", color: "#222" }
];
const QUARTER_NAMES = [
  "1st Quarter",
  "2nd Quarter",
  "3rd Quarter",
  "4th Quarter"
];
const COMMENTARY = [
  "🔥 What a run! Your team is ON FIRE!",
  "🏀 Chef goes nuclear! What a quarter!",
  "🚀 The bench squad is cooking tonight!",
  "😱 Can't stop the Greek Freak!",
  "🛡️ Lockdown Defence slows things down.",
  "🤯 Unbelievable shot from half court!",
  "💥 Massive dunk gets the crowd on its feet!",
  "😴 That was a slow quarter, both teams catching breath.",
  "🧊 Cold shooting streak, but still plenty of time!",
  "🌪️ Fast pace, non-stop action all around!"
];

const PLAYER_STATS = {
  "Joker": { name: "Nikola Jokić", Overall: 96, "Inside Scoring": 91, "Outside Scoring": 91, ATH: 73, Playmaking: 85, Rebounding: 68, Defending: 74, PTS: 29.6, AST: 10.2, TRB: 12.7, STL: 1.8, BLK: 0.6, BPM: 13.3 },
  "Greek Freak": { name: "Giannis Antetokounmpo", Overall: 98, "Inside Scoring": 98, "Outside Scoring": 80, ATH: 91, Playmaking: 85, Rebounding: 78, Defending: 85, PTS: 30.4, AST: 6.5, TRB: 11.9, STL: 0.9, BLK: 1.2, BPM: 9.5 },
  "JB": { name: "Jaylen Brown", Overall: 91, "Inside Scoring": 79, "Outside Scoring": 84, ATH: 85, Playmaking: 79, Rebounding: 54, Defending: 73, PTS: 22.2, AST: 4.5, TRB: 5.8, STL: 1.2, BLK: 0.3, BPM: 0 },
  "Duke-Of-Boston": { name: "Jayson Tatum", Overall: 95, "Inside Scoring": 85, "Outside Scoring": 90, ATH: 85, Playmaking: 80, Rebounding: 60, Defending: 74, PTS: 26.8, AST: 6, TRB: 8.7, STL: 1.1, BLK: 0.5, BPM: 5.2 },
  "Spida": { name: "Donovan Mitchell", Overall: 94, "Inside Scoring": 70, "Outside Scoring": 89, ATH: 88, Playmaking: 85, Rebounding: 49, Defending: 63, PTS: 24, AST: 5, TRB: 4.5, STL: 1.3, BLK: 0.2, BPM: 3.7 },
  "Chef": { name: "Stephen Curry", Overall: 95, "Inside Scoring": 58, "Outside Scoring": 92, ATH: 82, Playmaking: 89, Rebounding: 48, Defending: 62, PTS: 24.5, AST: 6, TRB: 4.4, STL: 1.1, BLK: 0.4, BPM: 6.3 },
  "KAT": { name: "Karl-Anthony Towns", Overall: 89, "Inside Scoring": 88, "Outside Scoring": 86, ATH: 88, Playmaking: 64, Rebounding: 81, Defending: 60, PTS: 24.4, AST: 3.1, TRB: 12.8, STL: 1, BLK: 0.7, BPM: 3.6 },
  "LeGM": { name: "LeBron James", Overall: 96, "Inside Scoring": 89, "Outside Scoring": 88, ATH: 92, Playmaking: 90, Rebounding: 60, Defending: 68, PTS: 24.4, AST: 8.2, TRB: 7.8, STL: 1, BLK: 0.6, BPM: 5.6 },
  "KD": { name: "Kevin Durant", Overall: 93, "Inside Scoring": 85, "Outside Scoring": 89, ATH: 81, Playmaking: 81, Rebounding: 49, Defending: 63, PTS: 26.6, AST: 4.2, TRB: 6, STL: 0.8, BLK: 1.2, BPM: 3.2 },
  "Wemby": { name: "Victor Wembanyama", Overall: 94, "Inside Scoring": 87, "Outside Scoring": 88, ATH: 77, Playmaking: 70, Rebounding: 82, Defending: 88, PTS: 24.3, AST: 3.7, TRB: 11, STL: 1.1, BLK: 3.8, BPM: 6.5 },
  "Ant Man": { name: "Anthony Edwards", Overall: 94, "Inside Scoring": 78, "Outside Scoring": 87, ATH: 97, Playmaking: 80, Rebounding: 50, Defending: 71, PTS: 27.6, AST: 4.5, TRB: 5.7, STL: 1.2, BLK: 0.6, BPM: 4.3 },
  "Brow": { name: "Anthony Davis", Overall: 95, "Inside Scoring": 88, "Outside Scoring": 84, ATH: 87, Playmaking: 68, Rebounding: 79, Defending: 85, PTS: 24.7, AST: 3.5, TRB: 11.6, STL: 1.2, BLK: 2.2, BPM: 5.4 },
  "Dame $$$": { name: "Damian Lillard", Overall: 91, "Inside Scoring": 62, "Outside Scoring": 89, ATH: 80, Playmaking: 89, Rebounding: 44, Defending: 56, PTS: 24.9, AST: 7.1, TRB: 4.7, STL: 1.2, BLK: 0.2, BPM: 4 },
  "J Will": { name: "Jalen Williams", Overall: 89, "Inside Scoring": 69, "Outside Scoring": 87, ATH: 81, Playmaking: 79, Rebounding: 50, Defending: 79, PTS: 21.6, AST: 5.1, TRB: 5.3, STL: 1.6, BLK: 0.7, BPM: 4 },
  "DG the PG": { name: "Darius Garland", Overall: 88, "Inside Scoring": 61, "Outside Scoring": 86, ATH: 81, Playmaking: 88, Rebounding: 40, Defending: 64, PTS: 20.6, AST: 6.7, TRB: 2.9, STL: 1.2, BLK: 0.1, BPM: 3.1 },
  "Fat Head": { name: "Jalen Brunson", Overall: 93, "Inside Scoring": 66, "Outside Scoring": 90, ATH: 82, Playmaking: 90, Rebounding: 39, Defending: 60, PTS: 26, AST: 7.3, TRB: 2.9, STL: 0.9, BLK: 0.1, BPM: 3.3 },
  "Mobley Evan": { name: "Evan Mobley", Overall: 92, "Inside Scoring": 85, "Outside Scoring": 83, ATH: 82, Playmaking: 68, Rebounding: 75, Defending: 83, PTS: 18.5, AST: 3.2, TRB: 9.3, STL: 0.9, BLK: 1.6, BPM: 4.6 },
  "JJJ": { name: "Jaren Jackson Jr.", Overall: 90, "Inside Scoring": 53, "Outside Scoring": 69, ATH: 46, Playmaking: 81, Rebounding: 56, Defending: 81, PTS: 22.2, AST: 2, TRB: 5.6, STL: 1.2, BLK: 1.5, BPM: 2.3 },
  "MotorCade": { name: "Cade Cunningham", Overall: 92, "Inside Scoring": 72, "Outside Scoring": 89, ATH: 82, Playmaking: 88, Rebounding: 52, Defending: 66, PTS: 26.1, AST: 9.1, TRB: 6.1, STL: 1, BLK: 0.8, BPM: 3.9 },
  "Cool White Dude": { name: "Tyler Herro", Overall: 88, "Inside Scoring": 63, "Outside Scoring": 91, ATH: 75, Playmaking: 79, Rebounding: 47, Defending: 53, PTS: 0, AST: 0, TRB: 0, STL: 0, BLK: 0, BPM: 3.1 },
  "Baby Jokic": { name: "Alperen Sengun", Overall: 87, "Inside Scoring": 83, "Outside Scoring": 81, ATH: 76, Playmaking: 89, Rebounding: 81, Defending: 69, PTS: 19.1, AST: 4.9, TRB: 10.3, STL: 1.1, BLK: 0.8, BPM: 4.4 },
  "The Beard": { name: "James Harden", Overall: 90, "Inside Scoring": 74, "Outside Scoring": 86, ATH: 88, Playmaking: 88, Rebounding: 51, Defending: 66, PTS: 22.8, AST: 8.7, TRB: 5.8, STL: 1.5, BLK: 0.7, BPM: 4.3 },
  "Spicy P": { name: "Pascal Siakam", Overall: 87, "Inside Scoring": 88, "Outside Scoring": 86, ATH: 80, Playmaking: 72, Rebounding: 61, Defending: 78, PTS: 20.2, AST: 3.4, TRB: 6.9, STL: 0.9, BLK: 0.5, BPM: 1.7 }
};

function calculateTeamRating(players, statKey, weight = 1) {
  return players.reduce((sum, p) => sum + (p[statKey] || 0) * weight, 0) / players.length;
}
function simulateQuarter(offenseA, defenseB, strategyA) {
  let base = 36 + Math.floor(Math.random() * 11);
  let offenseBoost = 1, defenseDrop = 1;
  if (strategyA === "offense") { offenseBoost = 1.13; defenseDrop = 0.93; }
  else if (strategyA === "defense") { offenseBoost = 0.93; defenseDrop = 1.11; }
  const attack = offenseA * offenseBoost;
  const resist = defenseB * defenseDrop;
  const ratingDiff = (attack - resist) * 0.12;
  const randomSwing = (Math.random() - 0.5) * 8;
  let score = base + ratingDiff + randomSwing;
  score = Math.max(28, Math.round(score));
  return score;
}
function distributePlayerStats(players, teamPoints) {
  const totalAbility = players.reduce((sum, p) => sum + (p.Overall + (p.PTS || 0)), 0);
  return players.map(p => {
    const base = ((p.Overall + (p.PTS || 0)) / totalAbility) * teamPoints;
    return {
      ...p,
      simPoints: Math.round(base + Math.random() * 8 - 3)
    };
  });
}
function getRandomCommentary() {
  return COMMENTARY[getRandomIndex(COMMENTARY)];
}
function getPlayHighlight(players, cpuPlayers, userWon) {
  const combined = userWon ? players : cpuPlayers;
  const star = combined[getRandomIndex(combined)];
  const plays = [
    `splashes a deep three!`,
    `throws a no-look alley-oop!`,
    `blocks a shot into the 3rd row!`,
    `gets a steal and a breakaway dunk!`,
    `hits a buzzer-beater!`,
    `crosses over the defender and scores!`,
    `drains a step-back jumper!`
  ];
  return `${star.name} ${plays[getRandomIndex(plays)]}`;
}

function GameSimulation({ userTeam, cpuTeam, playersByName, onPlayAgain }) {
  const [quarterStrategy, setQuarterStrategy] = useState([
    "balanced", "balanced", "balanced", "balanced"
  ]);
  const [quarterScores, setQuarterScores] = useState([]);
  const [currentQuarter, setCurrentQuarter] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const [finalResult, setFinalResult] = useState(null);
  const [commentary, setCommentary] = useState("");
  const [highlightPlay, setHighlightPlay] = useState("");
  const [showRolling, setShowRolling] = useState(false);
  const [rollingScore, setRollingScore] = useState([0, 0]);

  const startersA = userTeam.slice(0, 5).map(n => playersByName[n]);
  const benchA = userTeam.slice(5).map(n => playersByName[n]);
  const startersB = cpuTeam.slice(0, 5).map(n => playersByName[n]);
  const benchB = cpuTeam.slice(5).map(n => playersByName[n]);

  const offenseA = 0.7 * calculateTeamRating(startersA, "Outside Scoring", 0.6) +
    0.7 * calculateTeamRating(startersA, "Inside Scoring", 0.4) +
    0.3 * calculateTeamRating(benchA, "Outside Scoring", 0.6) +
    0.3 * calculateTeamRating(benchA, "Inside Scoring", 0.4);
  const defenseA = 0.7 * calculateTeamRating(startersA, "Defending") +
    0.3 * calculateTeamRating(benchA, "Defending");
  const offenseB = 0.7 * calculateTeamRating(startersB, "Outside Scoring", 0.6) +
    0.7 * calculateTeamRating(startersB, "Inside Scoring", 0.4) +
    0.3 * calculateTeamRating(benchB, "Outside Scoring", 0.6) +
    0.3 * calculateTeamRating(benchB, "Inside Scoring", 0.4);
  const defenseB = 0.7 * calculateTeamRating(startersB, "Defending") +
    0.3 * calculateTeamRating(benchB, "Defending");

  const cumulative = quarterScores.reduce(
    (acc, q) => {
      acc[0].push((acc[0][acc[0].length - 1] || 0) + q[0]);
      acc[1].push((acc[1][acc[1].length - 1] || 0) + q[1]);
      return acc;
    },
    [[], []]
  );

  function handleStrategy(qIdx, strategy) {
    setQuarterStrategy(strats => {
      const copy = [...strats];
      copy[qIdx] = strategy;
      return copy;
    });
  }

  function simulateNextQuarter() {
    if (gameEnded || currentQuarter >= 4) return;
    const stratA = quarterStrategy[currentQuarter];
    const stratB = "offense";
    const qa = simulateQuarter(offenseA, defenseB, stratA);
    const qb = simulateQuarter(offenseB, defenseA, stratB);

    setShowRolling(true);
    let c = 0, steps = 20, interval;
    interval = setInterval(() => {
      setRollingScore([
        Math.floor(Math.random() * (qa + 1)),
        Math.floor(Math.random() * (qb + 1))
      ]);
      c++;
      if (c > steps) {
        clearInterval(interval);
        setRollingScore([qa, qb]);
        setTimeout(() => {
          setShowRolling(false);
          const newScores = [...quarterScores, [qa, qb]];
          setQuarterScores(newScores);

          setCommentary(getRandomCommentary());
          setHighlightPlay(getPlayHighlight(startersA.concat(benchA), startersB.concat(benchB), qa > qb));

          if (currentQuarter === 3) {
            const scoreA = newScores.reduce((s, q) => s + q[0], 0);
            const scoreB = newScores.reduce((s, q) => s + q[1], 0);
            const distA = distributePlayerStats(startersA.concat(benchA), scoreA);
            const distB = distributePlayerStats(startersB.concat(benchB), scoreB);
            function simImpact(p, teamScore) {
              return {
                ...p,
                simAssists: Math.round((p.AST || 5) * (teamScore / 180) + Math.random() * 3 - 1),
                simRebounds: Math.round((p.TRB || 6) * (teamScore / 180) + Math.random() * 2 - 1),
                simSteals: Math.round((p.STL || 1) * (teamScore / 180) + Math.random() * 1.2 - 0.5),
                simBlocks: Math.round((p.BLK || 0.7) * (teamScore / 180) + Math.random() * 1.2 - 0.5),
              };
            }
            const finalA = distA.map(p => simImpact(p, scoreA));
            const finalB = distB.map(p => simImpact(p, scoreB));
            function impact(p) {
              return p.simPoints + 1.2 * p.simAssists + 1.1 * p.simRebounds + 3 * p.simSteals + 3 * p.simBlocks;
            }
            const mvp = [...finalA, ...finalB].reduce((a, b) => impact(a) > impact(b) ? a : b);

            setFinalResult({
              quarterScores: newScores,
              scoreA,
              scoreB,
              mvp
            });
            setGameEnded(true);
          } else {
            setCurrentQuarter(currentQuarter + 1);
          }
        }, 700);
      }
    }, 40);
  }

  return (
    <div>
      <h2 style={{ color: "#fff" }}>All-Star Game Simulation</h2>
      {quarterScores.map((q, i) => (
        <div key={i} style={{ marginBottom: 12 }}>
          <div style={{ color: "#fff", fontWeight: 600, fontSize: 18 }}>
            {QUARTER_NAMES[i]}: {cumulative[0][i]} - {cumulative[1][i]}
          </div>
        </div>
      ))}
      {!gameEnded && currentQuarter < 4 && (
        <div style={{ marginBottom: 18, padding: 12, background: "rgba(0,0,0,0.21)", borderRadius: 12 }}>
          <div style={{ color: "#fff", fontWeight: 600 }}>{QUARTER_NAMES[currentQuarter]}</div>
          <div style={{ marginBottom: 6, display: "flex", gap: 10 }}>
            <span style={{ color: "#fff", paddingRight: 6 }}>Strategy:</span>
            {STRATEGIES.map(s =>
              <button key={s.key}
                disabled={gameEnded}
                onClick={() => handleStrategy(currentQuarter, s.key)}
                style={{
                  fontWeight: quarterStrategy[currentQuarter] === s.key ? "bold" : undefined,
                  margin: 2,
                  color: quarterStrategy[currentQuarter] === s.key ? "#fff" : "#222",
                  background: quarterStrategy[currentQuarter] === s.key ? s.color : "#fff",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 18,
                  padding: "10px 16px",
                  boxShadow: quarterStrategy[currentQuarter] === s.key ? "0 0 12px #fff7" : "0 1px 2px #0003",
                  transition: "all .2s",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <span style={{
                  fontSize: 24,
                  marginRight: 8
                }}>{s.emoji}</span> {s.label}
              </button>
            )}
          </div>
          {showRolling ? (
            <div style={{ color: "#fff", fontSize: 20, letterSpacing: 2, fontWeight: 700, margin: "10px 0" }}>
              {rollingScore[0]} - {rollingScore[1]}
            </div>
          ) : quarterScores[currentQuarter] ? (
            <div>
              <div style={{ color: "#fff", fontSize: 22, letterSpacing: 1 }}>
                Q{currentQuarter + 1} Score: You {quarterScores[currentQuarter][0]} - CPU {quarterScores[currentQuarter][1]}
                <span style={{ marginLeft: 12, fontSize: 17 }}>
                  (Total: You {cumulative[0][currentQuarter]} - CPU {cumulative[1][currentQuarter]})
                </span>
              </div>
              <div style={{ marginTop: 8, color: "#fff", fontStyle: "italic", fontSize: 16 }}>
                {commentary}
              </div>
              <div style={{ marginTop: 5, color: "#e6ff7b", fontWeight: 600, fontSize: 17 }}>
                Highlight: {highlightPlay}
              </div>
            </div>
          ) : null}
          {!showRolling && !quarterScores[currentQuarter] && (
            <button style={{ marginTop: 10, fontSize: 18, fontWeight: 700 }} onClick={simulateNextQuarter}>
              {currentQuarter === 0 ? "Start 1st Quarter" : `Play Q${currentQuarter + 1}`}
            </button>
          )}
        </div>
      )}
      {gameEnded && finalResult &&
        <div>
          <h2 style={{ color: "#fff", marginTop: 20 }}>Final Score</h2>
          <p style={{ color: "#fff", fontWeight: 600, fontSize: 22 }}>
            Your team: <b>{finalResult.scoreA}</b> — CPU team: <b>{finalResult.scoreB}</b>
          </p>
          <div style={{ marginTop: 16 }}>
            {finalResult.quarterScores.map((q, i) => (
              <div key={i} style={{ color: "#fff", fontWeight: 600, fontSize: 18 }}>
                {QUARTER_NAMES[i]}: {cumulative[0][i]} - {cumulative[1][i]}
              </div>
            ))}
          </div>
          <div style={{
            fontSize: 26,
            fontWeight: 800,
            margin: "34px 0 12px 0",
            color: finalResult.scoreA > finalResult.scoreB ? "#00ff95" : "#ffe25e"
          }}>
            {finalResult.scoreA > finalResult.scoreB
              ? <span>🏆 Got the W Boi! <span style={{ fontSize: 34 }}>🎉</span></span>
              : <span>😤 Tough luck! It's the All-Star game tho</span>}
          </div>
          <div style={{ marginTop: 20, color: "#fff", fontSize: 21 }}>
            <strong>All-Star Game MVP:</strong> <span style={{ color: "#fdf34f" }}>{finalResult.mvp.name}</span>
          </div>
          {finalResult.scoreA > finalResult.scoreB &&
            <div style={{ fontSize: 40, textAlign: "center", marginTop: 20 }}>
              🎊 🎉 🏀 🎉 🎊
            </div>
          }
          <div style={{ marginTop: 32, textAlign: "center" }}>
            <button
              style={{
                fontSize: 20,
                padding: "12px 40px",
                borderRadius: 10,
                border: "none",
                background: "#ffd700",
                color: "#222",
                fontWeight: 700,
                cursor: "pointer",
                marginTop: 10,
                boxShadow: "0 1px 6px #0006"
              }}
              onClick={() => {
                onPlayAgain();
                const audio = document.getElementById("nba-music");
                if (audio) audio.play();
              }}
            >
              Play the Game Again
            </button>
          </div>
        </div>
      }
    </div>
  );
}

function App() {
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  const initialStep = "start";
  const initialUserCaptainIdx = null;
  const initialCaptains = [];
  const initialStartersPool = [...STARTERS];
  const initialReservesPool = [...RESERVES];
  const initialTeams = [[], []];
  const initialGameReady = false;

  const [step, setStep] = useState(initialStep);
  const [userCaptainIdx, setUserCaptainIdx] = useState(initialUserCaptainIdx);
  const [captains, setCaptains] = useState(initialCaptains);
  const [startersPool, setStartersPool] = useState(initialStartersPool);
  const [reservesPool, setReservesPool] = useState(initialReservesPool);
  const [teams, setTeams] = useState(initialTeams);
  const [gameReady, setGameReady] = useState(initialGameReady);

  const handleStartGame = () => {
    setMusicPlaying(true);
    setStep("selectCaptain");
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  };
  const handlePause = () => {
    setMusicPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };
  const handleResume = () => {
    setMusicPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  };

  const selectCaptain = idx => {
    setUserCaptainIdx(idx);
    setCaptains([CAPTAINS[idx], CAPTAINS[1 - idx]]);
    setStep("preDraftStarters");
  };

  const userDraftPlayer = (playerName, type) => {
    if (type === "starters") {
      const pool = startersPool;
      const userPickPool = pool.filter(p => p.name !== playerName);
      const compIdx = getRandomIndex(userPickPool);
      const compPick = userPickPool[compIdx];
      const newPool = userPickPool.filter((_, i) => i !== compIdx);
      setTeams([
        [...teams[0], playerName],
        [...teams[1], compPick.name]
      ]);
      setStartersPool(newPool);
      if (newPool.length === 0) {
        setStep("preDraftReserves");
      }
    } else {
      const pool = reservesPool;
      const userPickPool = pool.filter(p => p.name !== playerName);
      const compIdx = getRandomIndex(userPickPool);
      const compPick = userPickPool[compIdx];
      const newPool = userPickPool.filter((_, i) => i !== compIdx);
      setTeams([
        [...teams[0], playerName],
        [...teams[1], compPick.name]
      ]);
      setReservesPool(newPool);
      if (newPool.length === 0) {
        setGameReady(true);
        setStep("game");
      }
    }
  };

  const getPlayerObj = name =>
    STARTERS.concat(RESERVES).find(p => p.name === name) || {};

  const handlePlayAgain = () => {
    setStep(initialStep);
    setUserCaptainIdx(initialUserCaptainIdx);
    setCaptains(initialCaptains);
    setStartersPool([...STARTERS]);
    setReservesPool([...RESERVES]);
    setTeams([[], []]);
    setGameReady(initialGameReady);
    setMusicPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  };

  const musicButtonStyle = (active, bg) => ({
    fontSize: 22,
    fontWeight: 700,
    border: "none",
    borderRadius: 10,
    padding: "10px 26px",
    marginRight: 12,
    background: active ? bg : "#fff",
    color: active ? "#fff" : "#222",
    boxShadow: active ? "0 1px 12px #0004" : "0 1px 6px #0002",
    opacity: active ? 1 : 0.7,
    outline: "none",
    cursor: active ? "pointer" : "not-allowed",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.7em",
    transition: "all 0.18s"
  });

  let content;
  if (step === "start") {
    content = (
      <div
        style={{
          background: "rgba(0,0,0,0.55)",
          padding: 40,
          borderRadius: 16,
          boxShadow: "0 4px 32px #0008",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <h1
          style={{
            color: "#fff",
            fontSize: 44,
            fontWeight: 800,
            letterSpacing: 1,
            textShadow: "0 2px 16px #000"
          }}
        >
          NBA All-Star Draft Game
        </h1>
        <button
          style={{
            fontSize: 24,
            padding: "14px 48px",
            borderRadius: 10,
            border: "none",
            background: "#fff",
            fontWeight: 600,
            cursor: "pointer",
            marginTop: 32,
            boxShadow: "0 1px 6px #0006"
          }}
          onClick={handleStartGame}
        >
          Start Game
        </button>
      </div>
    );
  } else if (step === "selectCaptain") {
    content = (
      <div
        style={{
          background: "rgba(0,0,0,0.55)",
          padding: 40,
          borderRadius: 16,
          boxShadow: "0 4px 32px #0008",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <h2 style={{ color: "#fff", marginBottom: 30 }}>Choose Your Captain</h2>
        <div style={{ display: "flex", gap: 48 }}>
          {CAPTAINS.map((captain, idx) => (
            <button
              key={captain.name}
              style={{
                fontSize: 22,
                padding: "18px 36px 12px 36px",
                borderRadius: 12,
                border: "none",
                background: "#fff",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 2px 8px #0004",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minWidth: 160
              }}
              onClick={() => selectCaptain(idx)}
            >
              <PlayerImage base={captain.base} size={90} style={{ marginBottom: 12 }} />
              <span style={{ fontWeight: 800 }}>{captain.name}</span>
            </button>
          ))}
        </div>
      </div>
    );
  } else if (step === "preDraftStarters") {
    content = (
      <div
        style={{
          background: "rgba(0,0,0,0.55)",
          padding: "44px 40px",
          borderRadius: 16,
          boxShadow: "0 4px 32px #0008",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <h2 style={{ color: "#fff", marginBottom: 24 }}>
          It's time for the Starters Draft!
        </h2>
        <p style={{ color: "#fff", fontSize: 18, marginBottom: 32 }}>
          Let the captains build their dream starting five!
        </p>
        <button
          style={{
            fontSize: 22,
            padding: "12px 44px",
            borderRadius: 10,
            border: "none",
            background: "#ffd700",
            color: "#222",
            fontWeight: 700,
            cursor: "pointer",
            marginTop: 12,
            boxShadow: "0 1px 6px #0006"
          }}
          onClick={() => setStep("draftStarters")}
        >
          🏀 Let the Starters Draft Begin!
        </button>
      </div>
    );
  } else if (step === "draftStarters") {
    content = (
      <div
        style={{
          background: "rgba(0,0,0,0.55)",
          padding: 40,
          borderRadius: 16,
          boxShadow: "0 4px 32px #0008",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: 350
        }}
      >
        <h2 style={{ color: "#fff", marginBottom: 20 }}>
          Your pick (Starters)
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 22 }}>
          {startersPool.map(player => (
            <button
              key={player.name}
              onClick={() => userDraftPlayer(player.name, "starters")}
              style={{
                fontSize: 19,
                padding: "8px 20px 8px 8px",
                borderRadius: 10,
                border: "none",
                background: "#ffd700",
                color: "#222",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 2px 8px #0004",
                display: "flex",
                alignItems: "center"
              }}
            >
              <PlayerImage base={player.base} size={40} style={{ marginRight: 8 }} />
              {player.name}
            </button>
          ))}
        </div>
        <div style={{ color: "#fff", fontSize: 20, marginTop: 18, width: "100%" }}>
          <div>
            <strong>{captains[0]?.name}:</strong>{" "}
            {teams[0].map(name => (
              <span key={name} style={{ marginRight: 8 }}>
                <PlayerImage base={getPlayerObj(name).base} size={24} style={{ marginRight: 2, verticalAlign: "middle" }} />
                {name}
              </span>
            )) || "(No picks yet)"}
          </div>
          <div>
            <strong>{captains[1]?.name}:</strong>{" "}
            {teams[1].map(name => (
              <span key={name} style={{ marginRight: 8 }}>
                <PlayerImage base={getPlayerObj(name).base} size={24} style={{ marginRight: 2, verticalAlign: "middle" }} />
                {name}
              </span>
            )) || "(No picks yet)"}
          </div>
        </div>
      </div>
    );
  } else if (step === "preDraftReserves") {
    content = (
      <div
        style={{
          background: "rgba(0,0,0,0.55)",
          padding: "44px 40px",
          borderRadius: 16,
          boxShadow: "0 4px 32px #0008",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <h2 style={{ color: "#fff", marginBottom: 24 }}>
          Starters Draft Complete!
        </h2>
        <p style={{ color: "#fff", fontSize: 18, marginBottom: 32 }}>
          Now let's fill the bench with some serious heat!
        </p>
        <button
          style={{
            fontSize: 22,
            padding: "12px 44px",
            borderRadius: 10,
            border: "none",
            background: "#c0eaff",
            color: "#222",
            fontWeight: 700,
            cursor: "pointer",
            marginTop: 12,
            boxShadow: "0 1px 6px #0006"
          }}
          onClick={() => setStep("draftReserves")}
        >
          🚀 Time for the Reserves Draft!
        </button>
      </div>
    );
  } else if (step === "draftReserves") {
    content = (
      <div
        style={{
          background: "rgba(0,0,0,0.55)",
          padding: 40,
          borderRadius: 16,
          boxShadow: "0 4px 32px #0008",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: 350
        }}
      >
        <h2 style={{ color: "#fff", marginBottom: 20 }}>
          Your pick (Reserves)
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 22 }}>
          {reservesPool.map(player => (
            <button
              key={player.name}
              onClick={() => userDraftPlayer(player.name, "reserves")}
              style={{
                fontSize: 19,
                padding: "8px 20px 8px 8px",
                borderRadius: 10,
                border: "none",
                background: "#c0eaff",
                color: "#222",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 2px 8px #0004",
                display: "flex",
                alignItems: "center"
              }}
            >
              <PlayerImage base={player.base} size={40} style={{ marginRight: 8 }} />
              {player.name}
            </button>
          ))}
        </div>
        <div style={{ color: "#fff", fontSize: 20, marginTop: 18, width: "100%" }}>
          <div>
            <strong>{captains[0]?.name}:</strong>{" "}
            {teams[0].map(name => (
              <span key={name} style={{ marginRight: 8 }}>
                <PlayerImage base={getPlayerObj(name).base} size={24} style={{ marginRight: 2, verticalAlign: "middle" }} />
                {name}
              </span>
            )) || "(No picks yet)"}
          </div>
          <div>
            <strong>{captains[1]?.name}:</strong>{" "}
            {teams[1].map(name => (
              <span key={name} style={{ marginRight: 8 }}>
                <PlayerImage base={getPlayerObj(name).base} size={24} style={{ marginRight: 2, verticalAlign: "middle" }} />
                {name}
              </span>
            )) || "(No picks yet)"}
          </div>
        </div>
      </div>
    );
  } else if (step === "game" && gameReady) {
    const userTeam = teams[0];
    const cpuTeam = teams[1];
    const playersByName = {};
    [...userTeam, ...cpuTeam].forEach(pname => {
      playersByName[pname] = PLAYER_STATS[pname] || { name: pname, Overall: 87, "Inside Scoring":70, "Outside Scoring":75, ATH: 75, Playmaking:75, Rebounding:60, Defending:65, PTS: 15, AST: 3, TRB: 4, STL: 1, BLK: 0.7, BPM: 2 };
    });
    content = (
      <div style={{ background: "rgba(0,0,0,0.55)", padding: 40, borderRadius: 16, boxShadow: "0 4px 32px #0008", minWidth: 400 }}>
        <GameSimulation userTeam={userTeam} cpuTeam={cpuTeam} playersByName={playersByName} onPlayAgain={handlePlayAgain} />
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: "url('/image.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <audio id="nba-music" ref={audioRef} src="/background.mp3" loop />
      <div style={{
        position: "absolute", top: 10, left: 10, zIndex: 10,
        background: "#fff3", borderRadius: 16, padding: 12, display: "flex", gap: 4, border: "2px solid #222"
      }}>
        <button
          onClick={() => {
            setMusicPlaying(false);
            if (audioRef.current) audioRef.current.pause();
          }}
          disabled={!musicPlaying}
          style={musicButtonStyle(musicPlaying, "#ff5e57")}
        >
          <span style={{ fontSize: 28, marginRight: 6 }}>⏸️</span>
          Pause Vibes
        </button>
        <button
          onClick={() => {
            setMusicPlaying(true);
            if (audioRef.current) audioRef.current.play().catch(() => {});
          }}
          disabled={musicPlaying}
          style={musicButtonStyle(!musicPlaying, "#36cfc9")}
        >
          <span style={{ fontSize: 28, marginRight: 6 }}>🎵</span>
          Resume Vibes
        </button>
      </div>
      {content}
    </div>
  );
}

export default App;