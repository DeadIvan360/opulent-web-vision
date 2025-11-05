import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const WarpDriveShader = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const clock = new THREE.Clock();

    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform vec2 iMouse;

      void main() {
        vec2 uv    = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;
        vec2 mouse = (iMouse - 0.5 * iResolution.xy) / iResolution.y;

        float t = iTime * 0.8;
        uv -= mouse * 0.5;

        float r = length(uv);
        float a = atan(uv.y, uv.x);

        vec3 finalColor = vec3(0.0);
        float offset = 0.02;
        finalColor.r = pow(fract(0.3 / length(uv + vec2(offset, 0.0)) + t * 3.0), 8.0) * 2.0;
        finalColor.g = pow(fract(0.3 / length(uv) + t * 3.0), 8.0) * 1.5;
        finalColor.b = pow(fract(0.3 / length(uv - vec2(offset, 0.0)) + t * 3.0), 8.0) * 2.5;

        float glow = 0.05 / (r + 0.1);
        finalColor += glow;

        float fade = smoothstep(0.0, 0.2, r) * smoothstep(1.5, 0.5, r);
        finalColor *= fade;

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2() },
      iMouse: { value: new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2) }
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const onResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      uniforms.iResolution.value.set(width, height);
    };
    window.addEventListener('resize', onResize);
    onResize();

    const onMouseMove = (e: MouseEvent) => {
      uniforms.iMouse.value.set(
        e.clientX,
        container.clientHeight - e.clientY
      );
    };
    window.addEventListener('mousemove', onMouseMove);

    renderer.setAnimationLoop(() => {
      uniforms.iTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    });

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      renderer.setAnimationLoop(null);
      const canvas = renderer.domElement;
      if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
      material.dispose();
      geometry.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section id="warp-drive" className="relative w-full min-h-screen py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4 text-white">Experiencia Visual</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Interactúa con el shader moviendo tu cursor
          </p>
        </div>
        <div
          ref={containerRef}
          className="shader-container rounded-lg overflow-hidden mx-auto border border-white/10"
          style={{
            width: "100%",
            maxWidth: "1200px",
            height: "600px",
            position: "relative",
            backgroundColor: "#000000"
          }}
          aria-label="Warp Drive animated background"
        />
      </div>
    </section>
  );
};

export default WarpDriveShader;
