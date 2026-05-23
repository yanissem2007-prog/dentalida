"use client";
import { useEffect, useState } from "react";
import Logo from "./Logo";

export default function Loader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    let v = 0;
    const id = setInterval(() => {
      v += Math.random() * 8 + 3;
      if (v >= 100) {
        v = 100;
        setPct(100);
        clearInterval(id);
        setTimeout(() => setDone(true), 350);
        setTimeout(() => setHide(true), 1700);
      } else {
        setPct(v);
      }
    }, 90);
    return () => clearInterval(id);
  }, []);

  if (hide) return null;

  return (
    <div
      id="loader"
      style={{
        transform: done ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 1.1s cubic-bezier(.83,0,.17,1)",
      }}
    >
      <div className="relative flex flex-col items-center gap-10 px-8">
        <div
          className="relative"
          style={{
            opacity: 0.5 + (pct / 100) * 0.5,
            transform: `scale(${0.85 + (pct / 100) * 0.15})`,
            transition: "all .3s ease-out",
          }}
        >
          <div className="absolute inset-0 rounded-full bg-violet-soft/40 blur-3xl" />
          <div className="relative">
            <Logo size={120} />
          </div>
        </div>

        <div className="font-serif text-5xl font-light text-white tracking-[0.4em]">DENTALIDA</div>

        <div className="w-72 max-w-full">
          <div className="h-px bg-white/15 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-violet-soft via-white to-gold"
              style={{ width: pct + "%", transition: "width .25s linear" }}
            />
          </div>
          <div className="flex justify-between mt-4 text-[10px] uppercase tracking-[0.4em] text-white/50 font-mono">
            <span>Chargement</span>
            <span>{String(Math.floor(pct)).padStart(3, "0")}</span>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-deep/30 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-royal/30 blur-[120px]" />
      </div>
    </div>
  );
}
