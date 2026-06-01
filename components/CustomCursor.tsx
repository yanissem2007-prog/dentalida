"use client";
import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    const cursor = document.getElementById("cursor");
    const dot = document.getElementById("cursor-dot");
    if (!cursor || !dot) return;
    document.body.classList.add("custom-cursor");
    let mx = 0, my = 0, cx = 0, cy = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + "px";
      dot.style.top = my + "px";
    };
    window.addEventListener("mousemove", onMove);
    let raf = 0;
    const loop = () => {
      cx += (mx - cx) * 0.15;
      cy += (my - cy) * 0.15;
      cursor.style.left = cx + "px";
      cursor.style.top = cy + "px";
      raf = requestAnimationFrame(loop);
    };
    loop();
    const enter = () => document.body.classList.add("cursor-hover");
    const leave = () => document.body.classList.remove("cursor-hover");
    const hoverables = document.querySelectorAll("a, button, [data-magnetic], .ba-wrap");
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });
    return () => {
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <>
      <div id="cursor" />
      <div id="cursor-dot" />
    </>
  );
}
