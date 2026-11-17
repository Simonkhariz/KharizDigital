"use client";

import { useEffect, useRef } from "react";

/** How many points of pointer history the trail keeps. */
const TRAIL_MAX_POINTS = 60;
/** Width of the trail at the pointer, in pixels; it tapers to zero at the tail. */
const TRAIL_WIDTH = 12;

interface Point {
  x: number;
  y: number;
}

interface RgbColor {
  r: number;
  g: number;
  b: number;
}

interface CursorTrailProps {
  color: RgbColor;
}

/** Full-screen canvas that draws a tapering ribbon behind the mouse pointer on large screens. */
export default function CursorTrail({ color }: CursorTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement || window.innerWidth < 992) {
      return;
    }
    const context2d = canvasElement.getContext("2d");
    if (!context2d) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasElement;
    const context: CanvasRenderingContext2D = context2d;
    const pixelRatio = window.devicePixelRatio || 1;
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;
    canvas.width = viewportWidth * pixelRatio;
    canvas.height = viewportHeight * pixelRatio;
    context.scale(pixelRatio, pixelRatio);

    const trailPoints: Point[] = [];
    const leftEdge: Point[] = [];
    const rightEdge: Point[] = [];
    const pointer: Point = {
      x: viewportWidth / 2,
      y: viewportHeight / 2,
    };
    let frameId: number;

    function handleResize() {
      viewportWidth = window.innerWidth;
      viewportHeight = window.innerHeight;
      canvas.width = viewportWidth * pixelRatio;
      canvas.height = viewportHeight * pixelRatio;
      context.scale(pixelRatio, pixelRatio);
    }

    function handleMouseMove(event: MouseEvent) {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    }

    function drawFrame() {
      if ((context.clearRect(0, 0, viewportWidth, viewportHeight), trailPoints.length === 0)) {
        trailPoints.push({
          x: pointer.x,
          y: pointer.y,
        });
      } else {
        const head = trailPoints[0];
        trailPoints.unshift({
          x: head.x + (pointer.x - head.x) * 0.4,
          y: head.y + (pointer.y - head.y) * 0.4,
        });
      }
      if (
        (trailPoints.length > TRAIL_MAX_POINTS && (trailPoints.length = TRAIL_MAX_POINTS),
        trailPoints.length < 4)
      ) {
        frameId = requestAnimationFrame(drawFrame);
        return;
      }

      leftEdge.length = 0;
      rightEdge.length = 0;
      for (let index = 0; index < trailPoints.length; index++) {
        const progress = index / (trailPoints.length - 1);
        const halfWidth = (TRAIL_WIDTH * (1 - progress * progress)) / 2;
        let tangentX;
        let tangentY;
        if (index === 0) {
          tangentX = trailPoints[1].x - trailPoints[0].x;
          tangentY = trailPoints[1].y - trailPoints[0].y;
        } else {
          if (index === trailPoints.length - 1) {
            tangentX = trailPoints[index].x - trailPoints[index - 1].x;
            tangentY = trailPoints[index].y - trailPoints[index - 1].y;
          } else {
            tangentX = trailPoints[index + 1].x - trailPoints[index - 1].x;
            tangentY = trailPoints[index + 1].y - trailPoints[index - 1].y;
          }
        }
        const tangentLength = Math.sqrt(tangentX * tangentX + tangentY * tangentY) || 1;
        const normalX = -tangentY / tangentLength;
        const normalY = tangentX / tangentLength;
        leftEdge.push({
          x: trailPoints[index].x + normalX * halfWidth,
          y: trailPoints[index].y + normalY * halfWidth,
        });
        rightEdge.push({
          x: trailPoints[index].x - normalX * halfWidth,
          y: trailPoints[index].y - normalY * halfWidth,
        });
      }

      context.beginPath();
      context.moveTo(leftEdge[0].x, leftEdge[0].y);
      for (let index = 1; index < leftEdge.length; index++) {
        const previous = leftEdge[index - 1];
        const current = leftEdge[index];
        context.quadraticCurveTo(
          previous.x,
          previous.y,
          (previous.x + current.x) / 2,
          (previous.y + current.y) / 2,
        );
      }
      context.lineTo(leftEdge[leftEdge.length - 1].x, leftEdge[leftEdge.length - 1].y);
      for (let index = rightEdge.length - 1; index >= 1; index--) {
        const current = rightEdge[index];
        const next = rightEdge[index - 1];
        context.quadraticCurveTo(
          current.x,
          current.y,
          (current.x + next.x) / 2,
          (current.y + next.y) / 2,
        );
      }
      context.lineTo(rightEdge[0].x, rightEdge[0].y);
      context.closePath();

      const gradient = context.createLinearGradient(
        trailPoints[0].x,
        trailPoints[0].y,
        trailPoints[trailPoints.length - 1].x,
        trailPoints[trailPoints.length - 1].y,
      );
      gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0.65)`);
      gradient.addColorStop(0.6, `rgba(${color.r}, ${color.g}, ${color.b}, 0.2)`);
      gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
      context.fillStyle = gradient;
      context.fill();
      frameId = requestAnimationFrame(drawFrame);
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    frameId = requestAnimationFrame(drawFrame);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [color.r, color.g, color.b]);

  return (
    <div className="fixed inset-0 z-1000 pointer-events-none w-full h-full hidden lg:block">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
