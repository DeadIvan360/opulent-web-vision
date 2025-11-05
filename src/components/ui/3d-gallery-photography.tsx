import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

interface Image {
  src: string;
  alt: string;
}

interface InfiniteGalleryProps {
  images: Image[];
  speed?: number;
  zSpacing?: number;
  visibleCount?: number;
  falloff?: { near: number; far: number };
  className?: string;
}

export default function InfiniteGallery({
  images,
  speed = 1.2,
  zSpacing = 3,
  visibleCount = 12,
  falloff = { near: 0.8, far: 14 },
  className,
}: InfiniteGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshesRef = useRef<THREE.Mesh[]>([]);
  const currentIndexRef = useRef(0);
  const targetIndexRef = useRef(0);
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create meshes
    const textureLoader = new THREE.TextureLoader();
    const meshes: THREE.Mesh[] = [];

    images.forEach((image, index) => {
      const texture = textureLoader.load(image.src);
      const geometry = new THREE.PlaneGeometry(4, 3);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.z = -index * zSpacing;
      scene.add(mesh);
      meshes.push(mesh);
    });

    meshesRef.current = meshes;

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Smooth scrolling
      currentIndexRef.current += (targetIndexRef.current - currentIndexRef.current) * 0.1;

      meshes.forEach((mesh, index) => {
        const z = -index * zSpacing + currentIndexRef.current * zSpacing;
        mesh.position.z = z;

        // Fade effect based on distance
        const distance = Math.abs(z - camera.position.z);
        let opacity = 1;

        if (distance < falloff.near) {
          opacity = 1;
        } else if (distance > falloff.far) {
          opacity = 0;
        } else {
          opacity = 1 - (distance - falloff.near) / (falloff.far - falloff.near);
        }

        if (mesh.material instanceof THREE.MeshBasicMaterial) {
          mesh.material.opacity = opacity;
          mesh.material.transparent = true;
        }

        // Loop images
        if (z > camera.position.z + zSpacing) {
          mesh.position.z = z - images.length * zSpacing;
        } else if (z < camera.position.z - images.length * zSpacing) {
          mesh.position.z = z + images.length * zSpacing;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // Auto-play
    const autoPlay = () => {
      if (isAutoPlaying) {
        targetIndexRef.current += speed * 0.01;
      }
    };

    const autoPlayInterval = setInterval(autoPlay, 16);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(autoPlayInterval);
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      meshes.forEach((mesh) => {
        mesh.geometry.dispose();
        if (mesh.material instanceof THREE.Material) {
          mesh.material.dispose();
        }
      });
    };
  }, [images, speed, zSpacing, falloff, isAutoPlaying]);

  // Handle user interaction
  const resetAutoPlay = () => {
    setIsAutoPlaying(false);
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }
    autoPlayTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 3000);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    targetIndexRef.current += e.deltaY * 0.001;
    resetAutoPlay();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      targetIndexRef.current += 0.5;
      resetAutoPlay();
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      targetIndexRef.current -= 0.5;
      resetAutoPlay();
    }
  };

  const handleTouchStart = useRef({ x: 0, y: 0 });
  const handleTouchMove = (e: React.TouchEvent) => {
    const deltaY = e.touches[0].clientY - handleTouchStart.current.y;
    targetIndexRef.current += deltaY * 0.01;
    handleTouchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    resetAutoPlay();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      onWheel={handleWheel}
      onTouchStart={(e) => {
        handleTouchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }}
      onTouchMove={handleTouchMove}
    />
  );
}
