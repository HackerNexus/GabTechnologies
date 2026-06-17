"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
export default function SeamlessTransitionPortal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const waitForReady = () => {
      if (canvas.clientWidth === 0 || canvas.clientHeight === 0) {
        requestAnimationFrame(waitForReady);
        return;
      }
      startAnimation();
    };
    type Packet = {
      t: number;
      speed: number;
      size: number;
      glowIntensity: number;
      lane: number;
    };
    const packets: Packet[] = [];
    let width = 0;
    let height = 0;
    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };
    const createPacket = (): Packet => ({
      t: Math.random(),
      speed: 0.003 + Math.random() * 0.004,
      size: 10 + Math.random() * 14,
      glowIntensity: 0.6 + Math.random() * 0.4,
      lane: Math.floor(Math.random() * 3)
    });
    for (let i = 0; i < 12; i++) {
      const p = createPacket();
      p.t = Math.random();
      packets.push(p);
    }
    const startAnimation = () => {
      resize();
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const animate = () => {
        ctx.clearRect(0, 0, width, height);
        const pipeY = height / 2;
        const pipeH = height * 0.22;
        const pipeX1 = width * 0.05;
        const pipeX2 = width * 0.95;
        const pipeGrad = ctx.createLinearGradient(0, pipeY - pipeH / 2, 0, pipeY + pipeH / 2);
        pipeGrad.addColorStop(0, "hsla(222, 47%, 11%, 0.7)");
        pipeGrad.addColorStop(0.5, "hsla(199, 89%, 48%, 0.2)");
        pipeGrad.addColorStop(1, "hsla(222, 47%, 11%, 0.7)");
        ctx.beginPath();
        ctx.roundRect(pipeX1, pipeY - pipeH / 2, pipeX2 - pipeX1, pipeH, 4);
        ctx.fillStyle = pipeGrad;
        ctx.fill();
        ctx.beginPath();
        ctx.roundRect(pipeX1, pipeY - pipeH / 2, pipeX2 - pipeX1, pipeH, 4);
        ctx.strokeStyle = "hsla(199, 89%, 48%, 0.5)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.roundRect(pipeX1 + 2, pipeY - pipeH / 2 + 2, pipeX2 - pipeX1 - 4, 3, 4);
        ctx.fillStyle = "hsla(210, 40%, 98%, 0.2)";
        ctx.fill();
        ctx.font = "bold 11px JetBrains Mono, monospace";
        ctx.fillStyle = "hsla(199, 89%, 48%, 0.9)";
        ctx.textAlign = "center";
        ctx.fillText("SECURE NODE", pipeX1 + 44, pipeY - pipeH / 2 - 10);
        ctx.fillText("GAB NETWORK", pipeX2 - 56, pipeY - pipeH / 2 - 10);
        const srcGrad = ctx.createRadialGradient(pipeX1 + 2, pipeY, 2, pipeX1 + 2, pipeY, 22);
        srcGrad.addColorStop(0, "hsla(199, 89%, 70%, 1)");
        srcGrad.addColorStop(0.4, "hsla(199, 89%, 48%, 0.8)");
        srcGrad.addColorStop(1, "hsla(199, 89%, 48%, 0)");
        ctx.beginPath();
        ctx.arc(pipeX1 + 2, pipeY, 22, 0, Math.PI * 2);
        ctx.fillStyle = srcGrad;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(pipeX1 + 2, pipeY, 8, 0, Math.PI * 2);
        ctx.fillStyle = "hsla(210, 40%, 98%, 1)";
        ctx.fill();
        const dstGrad = ctx.createRadialGradient(pipeX2 - 2, pipeY, 2, pipeX2 - 2, pipeY, 22);
        dstGrad.addColorStop(0, "hsla(174, 75%, 70%, 1)");
        dstGrad.addColorStop(0.4, "hsla(174, 75%, 46%, 0.8)");
        dstGrad.addColorStop(1, "hsla(174, 75%, 46%, 0)");
        ctx.beginPath();
        ctx.arc(pipeX2 - 2, pipeY, 22, 0, Math.PI * 2);
        ctx.fillStyle = dstGrad;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(pipeX2 - 2, pipeY, 8, 0, Math.PI * 2);
        ctx.fillStyle = "hsla(174, 75%, 85%, 1)";
        ctx.fill();
        const laneOffsets = [-pipeH * 0.22, 0, pipeH * 0.22];
        packets.forEach(packet => {
          packet.t += packet.speed;
          if (packet.t > 1.05) {
            packet.t = -0.05;
            packet.speed = 0.003 + Math.random() * 0.004;
            packet.size = 10 + Math.random() * 14;
            packet.glowIntensity = 0.6 + Math.random() * 0.4;
            packet.lane = Math.floor(Math.random() * 3);
          }
          const progress = Math.max(0, Math.min(1, packet.t));
          const px = pipeX1 + (pipeX2 - pipeX1) * progress;
          const py = pipeY + laneOffsets[packet.lane];
          const s = packet.size;
          const glowR = s * 2.5;
          const glowGrad = ctx.createRadialGradient(px, py, 0, px, py, glowR);
          glowGrad.addColorStop(0, `hsla(199, 89%, 48%, ${0.7 * packet.glowIntensity})`);
          glowGrad.addColorStop(0.5, `hsla(199, 89%, 48%, ${0.3 * packet.glowIntensity})`);
          glowGrad.addColorStop(1, "hsla(199, 89%, 48%, 0)");
          ctx.beginPath();
          ctx.arc(px, py, glowR, 0, Math.PI * 2);
          ctx.fillStyle = glowGrad;
          ctx.fill();
          const half = s / 2;
          ctx.save();
          ctx.translate(px, py);
          const faceGrad = ctx.createLinearGradient(-half, -half, half, half);
          faceGrad.addColorStop(0, `hsla(199, 89%, 75%, ${0.95 * packet.glowIntensity})`);
          faceGrad.addColorStop(1, `hsla(174, 75%, 46%, ${0.85 * packet.glowIntensity})`);
          ctx.beginPath();
          ctx.roundRect(-half, -half, s, s, 2);
          ctx.fillStyle = faceGrad;
          ctx.fill();
          ctx.strokeStyle = `hsla(210, 40%, 98%, ${0.9 * packet.glowIntensity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.restore();
          const trailLen = 40;
          const trailGrad = ctx.createLinearGradient(px - trailLen, py, px, py);
          trailGrad.addColorStop(0, "hsla(199, 89%, 48%, 0)");
          trailGrad.addColorStop(1, `hsla(199, 89%, 48%, ${0.25 * packet.glowIntensity})`);
          ctx.beginPath();
          ctx.moveTo(px - trailLen, py);
          ctx.lineTo(px - half, py);
          ctx.strokeStyle = trailGrad;
          ctx.lineWidth = 2;
          ctx.stroke();
        });
        const reflGrad = ctx.createLinearGradient(pipeX1, pipeY - pipeH / 2, pipeX1, pipeY - pipeH / 4);
        reflGrad.addColorStop(0, "hsla(210, 40%, 98%, 0.1)");
        reflGrad.addColorStop(1, "hsla(210, 40%, 98%, 0)");
        ctx.beginPath();
        ctx.roundRect(pipeX1 + 4, pipeY - pipeH / 2 + 4, pipeX2 - pipeX1 - 8, pipeH / 3, 4);
        ctx.fillStyle = reflGrad;
        ctx.fill();
        animFrameRef.current = requestAnimationFrame(animate);
      };
      animFrameRef.current = requestAnimationFrame(animate);
    };
    const observer = new ResizeObserver(() => {
      resize();
    });
    observer.observe(canvas);
    requestAnimationFrame(waitForReady);
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      observer.disconnect();
    };
  }, []);
  return <section data-section-id="230769" id="securing-your-digital-frontier" className="relative min-h-screen flex items-center overflow-hidden bg-background text-foreground" style={{
    background: "hsl(222 47% 4%)"
  }}>
      {}
      <div className="absolute inset-0 pointer-events-none" style={{
      backgroundImage: `
            linear-gradient(hsla(199, 89%, 48%, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, hsla(199, 89%, 48%, 0.05) 1px, transparent 1px)
          `,
      backgroundSize: "60px 60px"
    }} />

      {}
      <div className="absolute inset-0 pointer-events-none" style={{
      backgroundImage: `
            linear-gradient(hsla(199, 89%, 48%, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, hsla(199, 89%, 48%, 0.02) 1px, transparent 1px)
          `,
      backgroundSize: "240px 240px"
    }} />

      {}
      <div className="absolute inset-0 pointer-events-none" style={{
      background: "radial-gradient(ellipse 80% 60% at 30% 50%, hsla(199, 89%, 48%, 0.1) 0%, transparent 70%)"
    }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8 min-h-screen lg:min-h-0 lg:py-28">

          {}
          <div className="flex-1 flex flex-col items-start gap-6 lg:gap-8">
            {}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs font-mono tracking-widest uppercase" style={{
            background: "hsla(199, 89%, 48%, 0.1)",
            border: "1px solid hsla(199, 89%, 48%, 0.3)",
            color: "hsl(199, 89%, 60%)",
            fontFamily: "var(--font-mono)"
          }}><span className="inline-block w-2 h-2 rounded-lg animate-pulse" data-ast-id="f:/src/pages/Home/sections/SeamlessTransitionPortal.tsx|sig:dv7cj3" data-ast-start="9101" data-ast-end="9258" style={{
              background: 'rgb(29, 205, 188)'
            }}></span>Gab Technologies</div>

            {}
            <div>
              <h1 className="font-default text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight" style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              background: "linear-gradient(135deg, hsl(210, 40%, 98%) 30%, hsl(199, 89%, 48%) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>Securing<br />Your Property &amp;<br />Connecting you</h1>
            </div>

            {}
            <p className="text-lg lg:text-xl leading-relaxed max-w-lg" style={{
            color: "hsl(215, 20%, 65%)",
            fontFamily: "var(--font-sans)"
          }}>
              Premium CCTV installation, Starlink setup, and smart security systems for Kenyan homes and businesses. Experience elite tech protection today.
            </p>

            {}
            <div className="relative mt-2">
              {}
              <span className="absolute inset-0 rounded-md animate-ping" style={{
              background: "transparent",
              boxShadow: "0 0 0 6px hsla(199, 89%, 48%, 0.25)",
              animationDuration: "2s"
            }} />
              <span className="absolute inset-0 rounded-md animate-pulse" style={{
              background: "transparent",
              boxShadow: "0 0 20px 8px hsla(199, 89%, 48%, 0.2)"
            }} />
              <Button asChild size="lg" className="relative font-semibold text-base px-8 py-6 rounded-md" style={{
              background: "linear-gradient(135deg, hsl(199, 89%, 48%) 0%, hsl(222, 47%, 11%) 100%)",
              color: "hsl(210, 40%, 98%)",
              boxShadow: "0 0 24px hsla(199, 89%, 48%, 0.5), 0 4px 20px hsla(199, 89%, 48%, 0.3)",
              border: "none",
              fontFamily: "Plus Jakarta Sans, sans-serif"
            }}>
                <Link to ="/Services">
                  Explore Services
                  <ArrowRight className="ml-1 size-5" />
                </Link>
              </Button>
            </div>

            {}
            <div className="flex flex-wrap gap-6 mt-4">
              {[{
              label: "System Uptime",
              value: "99.9%"
            }, {
              label: "Security Status",
              value: "Elite"
            }, {
              label: "Response Time",
              value: "< 1h"
            }].map((stat, i) => <div data-index={i} key={i} className="flex flex-col gap-1">
                  <span className="text-2xl font-default font-bold" style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
                color: "hsl(199, 89%, 48%)"
              }}>
                    {stat.value}
                  </span>
                  <span className="text-xs uppercase tracking-wider" style={{
                color: "hsl(215, 20%, 50%)",
                fontFamily: "var(--font-mono)"
              }}>
                    {stat.label}
                  </span>
                </div>)}
            </div>
          </div>

          {}
          <div className="flex-1 w-full flex items-center justify-center">
            <div className="relative w-full rounded-md overflow-hidden backdrop-blur-xl" style={{
            aspectRatio: "4/3",
            maxWidth: "560px",
            background: "hsla(222, 47%, 8%, 0.8)",
            border: "1px solid hsla(199, 89%, 48%, 0.2)",
            boxShadow: "0 0 60px hsla(199, 89%, 48%, 0.12), 0 32px 48px hsla(0, 0%, 0%, 0.4)"
          }}>
              {}
              <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none" style={{
              borderTop: "2px solid hsl(199, 89%, 48%)",
              borderLeft: "2px solid hsl(199, 89%, 48%)"
            }} />
              <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none" style={{
              borderTop: "2px solid hsl(199, 89%, 48%)",
              borderRight: "2px solid hsl(199, 89%, 48%)"
            }} />
              <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none" style={{
              borderBottom: "2px solid hsl(199, 89%, 48%)",
              borderLeft: "2px solid hsl(199, 89%, 48%)"
            }} />
              <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none" style={{
              borderBottom: "2px solid hsl(199, 89%, 48%)",
              borderRight: "2px solid hsl(199, 89%, 48%)"
            }} />

              {}
              <canvas ref={canvasRef} className="w-full h-full" style={{
              display: "block"
            }} />

              {}
              <div className="absolute top-0 left-0 right-0 px-4 py-2 flex items-center gap-2" style={{
              background: "hsla(222, 47%, 4%, 0.9)",
              borderBottom: "1px solid hsla(199, 89%, 48%, 0.15)",
              fontFamily: "var(--font-mono)"
            }}>
                <div className="w-2.5 h-2.5 rounded-lg" style={{
                background: "hsl(0, 84%, 60%)"
              }} />
                <div className="w-2.5 h-2.5 rounded-lg" style={{
                background: "hsl(43, 96%, 56%)"
              }} />
                <div className="w-2.5 h-2.5 rounded-lg animate-pulse" style={{
                background: "hsl(174, 75%, 46%)"
              }} />
                <span className="ml-2 text-xs" style={{
                color: "hsl(199, 89%, 48%)"
              }}>
                  system.secure_status
                </span>
              </div>

              {}
              <div className="absolute bottom-0 left-0 right-0 px-4 py-2 flex items-center justify-between" style={{
              background: "hsla(222, 47%, 4%, 0.9)",
              borderTop: "1px solid hsla(199, 89%, 48%, 0.15)",
              fontFamily: "var(--font-mono)"
            }}>
                <span className="text-xs" style={{
                color: "hsl(215, 20%, 50%)"
              }}>
                  STATUS: PROTECTED
                </span>
                <span className="text-xs animate-pulse" style={{
                color: "hsl(174, 75%, 46%)"
              }}>
                  LIVE MONITORING
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
}