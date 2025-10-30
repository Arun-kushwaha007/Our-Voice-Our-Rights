import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

type TrendPoint = { label: string; value: number };

export default function TrendChart({ data }: { data: TrendPoint[] }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (!canvasRef.current || !data) return;
    const ctx = canvasRef.current.getContext("2d")!;
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((d) => d.label),
        datasets: [
          {
            label: "Funds",
            data: data.map((d) => d.value),
            tension: 0.3,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } }
      }
    });
    return () => chart.destroy();
  }, [data]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: 140 }} />;
}
