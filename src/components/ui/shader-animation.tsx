"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / min(uResolution.x, uResolution.y);

    float d = length(uv);

    float rings = sin(d * 25.0 - uTime * 1.2) * 0.5 + 0.5;
    rings *= smoothstep(1.2, 0.0, d);

    float pulse = sin(uTime * 0.5) * 0.15 + 0.85;
    rings *= pulse;

    float innerGlow = exp(-d * 3.0) * 0.15;

    vec3 baseColor = vec3(0.075, 0.078, 0.082);
    vec3 ringColor = vec3(0.38, 0.39, 0.41);
    vec3 highlightColor = vec3(0.52, 0.53, 0.55);

    vec3 color = baseColor;
    color += ringColor * rings * 0.3;
    color += highlightColor * innerGlow;

    float shimmer = sin(d * 40.0 - uTime * 2.0) * 0.5 + 0.5;
    shimmer *= smoothstep(0.8, 0.1, d) * 0.08;
    color += vec3(0.44, 0.45, 0.47) * shimmer;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export function ShaderAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const uniforms = {
      uTime: { value: 0 },
      uResolution: {
        value: new THREE.Vector2(
          container.clientWidth * Math.min(window.devicePixelRatio, 2),
          container.clientHeight * Math.min(window.devicePixelRatio, 2)
        ),
      },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(
        w * Math.min(window.devicePixelRatio, 2),
        h * Math.min(window.devicePixelRatio, 2)
      );
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      style={{ background: "#131416" }}
    />
  );
}
