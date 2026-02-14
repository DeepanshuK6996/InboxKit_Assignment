import { useEffect, useState, useMemo } from "react";
import { io } from "socket.io-client";
import Grid from "@/components/Grid";
import { DottedGlowBackground } from "../components/ui/dotted-glow-background";

const socket = io(import.meta.env.BACKEND_URL || "http://localhost:3001");

const MapPage = () => {
  const [grid, setGrid] = useState([]);
  const [user, setUser] = useState("User" + Math.floor(Math.random()*1000));
  const [color] = useState("#" + Math.floor(Math.random() * 16777215).toString(16));
  const [activePlayers, setActivePlayers] = useState(0);

  useEffect(() => {
    console.log("Setting up socket listeners...");
    
    socket.on("grid", (cells) => {
      console.log("Received grid:", cells.length, "cells");
      const sorted = [...cells].sort((a, b) => a.id - b.id);
      setGrid(sorted);
    });
    
    //cell updation listener
    socket.on("cellUpdated", (cell) => {
      console.log("Cell updated:", cell);
      setGrid((prev) => {
        const updated = prev.map((c) =>
          c.id === cell.id ? { ...c, ...cell } : c,
        );
        return updated.sort((a, b) => a.id - b.id);
      });
    });

    //Handle when cell was already claimed by someone else
    socket.on("cellAlreadyClaimed", ({ cellId }) => {
      console.log("⚠️ Cell already claimed:", cellId);
    });

    //Handle capture errors
    socket.on("captureError", ({ cellId, message }) => {
      console.error("❌ Capture error:", cellId, message);
    });

    //active count listener
    socket.on("activeCount", (count) => {
      console.log("Active count received:", count);
      setActivePlayers(count);
    });

    return () => {
      socket.off("grid");
      socket.off("cellUpdated");
      socket.off("cellAlreadyClaimed");   
      socket.off("captureError"); 
      socket.off("activeCount");
    };
  }, []);

  const captureCell = (id) => {
    socket.emit("capture", {
      cellId: id,
      user,
      color,
    });
  };

  //for top 3 users and their stats
  const topUsers = useMemo(() => {
    const userCounts = {};
    grid.forEach((cell) => {
      if (cell.owner) {
        if (!userCounts[cell.owner]) {
          userCounts[cell.owner] = { count: 0, color: cell.color };
        }
        userCounts[cell.owner].count++;
      }
    });

    return Object.entries(userCounts)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);
  }, [grid]);

  const totalClaimed = grid.filter((c) => c.owner).length;
  const totalCells = grid.length;
  const userClaimed = grid.filter((c) => c.owner === user).length;

  return (
    <div className="min-h-screen bg-black p-6">      
      <DottedGlowBackground
        className="pointer-events-none mask-radial-to-90% mask-radial-at-center opacity-20 dark:opacity-100"
        opacity={1}
        gap={10}
        radius={1.6}
        colorLightVar="--color-neutral-500"
        glowColorLightVar="--color-neutral-600"
        colorDarkVar="--color-neutral-500"
        glowColorDarkVar="--color-sky-800"
        backgroundOpacity={0}
        speedMin={0.3}
        speedMax={1.6}
        speedScale={1}
      />
      <div className="max-w-[1600px] mx-auto relative z-10">
        <h1 className="text-4xl font-bold text-white mb-6 text-center tracking-tight">
          Territory Conquest
        </h1>

        <div className="flex gap-6 h-[calc(100vh-140px)]">
          {/* Stats Panel - Left Side */}
          <div className="w-80 space-y-4 flex flex-col">
            {/* Current User Card */}
            <div className="bg-black rounded-2xl p-6 border border-white/20 shadow-xl hover:border-white hover:shadow-2xl hover:shadow-white/20 transition-all">
              <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">
                Your Profile
              </h2>
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-16 h-16 rounded-full border-4 border-white/30 shadow-lg"
                  style={{ background: color }}
                />
                <div className="flex-1">
                  <input
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    className="bg-white/10 border border-white/30 px-4 py-2 rounded-lg text-white placeholder-slate-400 w-full focus:outline-none focus:ring-2 focus:ring-white/50 transition"
                    placeholder="Enter username"
                  />
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                <div className="text-slate-400 text-sm">Cells Claimed</div>
                <div className="text-3xl font-bold text-white">{userClaimed}</div>
              </div>
            </div>

            {/* Active Players Card */}
            <div className="bg-black rounded-2xl p-6 border border-white/20 shadow-xl hover:border-white hover:shadow-2xl hover:shadow-white/20 transition-all">
              <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">
                Live Stats
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-slate-300">Active Players</span>
                  </div>
                  <span className="text-2xl font-bold text-white">{activePlayers}</span>
                </div>
                <div className="h-px bg-white/10" />
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Claimed</span>
                  <span className="text-white font-semibold">
                    {totalClaimed} / {totalCells}
                  </span>
                </div>
              </div>
            </div>

            {/* Leaderboard Card */}
            <div className="bg-black rounded-2xl p-6 border border-white/20 shadow-xl hover:border-white hover:shadow-2xl hover:shadow-white/20 transition-all">
              <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">
                Top Players
              </h2>
              <div className="space-y-3">
                {topUsers.length > 0 ? (
                  topUsers.map((user, index) => (
                    <div
                      key={user.name}
                      className="flex items-center gap-4 bg-white/5 rounded-lg p-3 border border-white/10 hover:bg-white/10 transition"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 font-bold text-white text-sm">
                        {index + 1}
                      </div>
                      <div
                        className="w-10 h-10 rounded-full border-2 border-white/30"
                        style={{ background: user.color }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-medium truncate">
                          {user.name}
                        </div>
                        <div className="text-slate-400 text-sm">
                          {user.count} cells
                        </div>
                      </div>
                      {index === 0 && (
                        <div className="text-2xl">🏆</div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center text-slate-400 py-8">
                    No players yet. Be the first!
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Map Panel - Right Side */}
          <div className="flex-1 bg-black rounded-2xl p-8 border border-white/20 shadow-xl hover:border-white hover:shadow-2xl hover:shadow-white/20 transition-all flex items-center justify-center overflow-hidden">
            <Grid grid={grid} onCapture={captureCell} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapPage;
