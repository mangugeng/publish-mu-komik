"use client";
import { useEffect } from "react";
export default function BackgroundClient() {
  useEffect(() => {
    const hour = new Date().getHours();
    let bgNumber = 0;
    if (hour >= 5 && hour < 11) bgNumber = 1;
    else if (hour >= 11 && hour < 16) bgNumber = 2;
    else if (hour >= 16 && hour < 19) bgNumber = 3;
    else if (hour >= 19 && hour <= 23) bgNumber = 4;
    else bgNumber = 0;
    document.body.style.backgroundImage = `url('/bg${bgNumber}.png')`;
  }, []);
  return null;
} 