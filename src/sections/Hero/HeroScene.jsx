import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, RoundedBox, useTexture } from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

/* ------------------------------------------------------------------
   Hero WebGL scene: one large phone showing the real app, two smaller
   phones behind it, purple particles and studio lighting.
   Loaded lazily; paused when offscreen; static for reduced motion.
------------------------------------------------------------------- */

const W = 1; // phone width (world units)
const H = 2.08;
const D = 0.1;
const SCREEN_W = 0.9;
const SCREEN_H = 1.96;

/** Rounded-rectangle geometry with UVs normalised to 0..1 (ShapeGeometry uses raw positions). */
function roundedRectGeometry(w, h, r) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  const g = new THREE.ShapeGeometry(s, 12);
  const pos = g.attributes.position;
  const uv = g.attributes.uv;
  for (let i = 0; i < pos.count; i += 1) {
    uv.setXY(i, (pos.getX(i) - x) / w, (pos.getY(i) - y) / h);
  }
  uv.needsUpdate = true;
  return g;
}

/** "object-fit: cover; object-position: top" for a texture on the screen plane. */
function fitCoverTop(tex, planeAspect) {
  const img = tex.image;
  if (!img) return;
  const imgAspect = img.width / img.height;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  if (imgAspect > planeAspect) {
    tex.repeat.set(planeAspect / imgAspect, 1);
    tex.offset.set((1 - tex.repeat.x) / 2, 0);
  } else {
    tex.repeat.set(1, imgAspect / planeAspect);
    tex.offset.set(0, 1 - tex.repeat.y);
  }
  tex.needsUpdate = true;
}

function Phone({ texture, ...props }) {
  const screenGeo = useMemo(() => roundedRectGeometry(SCREEN_W, SCREEN_H, 0.1), []);
  const bezelGeo = useMemo(() => roundedRectGeometry(W - 0.035, H - 0.035, 0.13), []);
  const islandGeo = useMemo(() => roundedRectGeometry(0.26, 0.07, 0.035), []);

  useMemo(() => texture && fitCoverTop(texture, SCREEN_W / SCREEN_H), [texture]);

  return (
    <group {...props}>
      {/* titanium body */}
      <RoundedBox args={[W, H, D]} radius={0.045} smoothness={4}>
        <meshPhysicalMaterial color="#2a1f3d" metalness={0.85} roughness={0.28} clearcoat={1} clearcoatRoughness={0.15} />
      </RoundedBox>
      {/* front glass / bezel */}
      <mesh geometry={bezelGeo} position={[0, 0, D / 2 + 0.001]}>
        <meshPhysicalMaterial color="#050308" roughness={0.08} metalness={0.2} clearcoat={1} />
      </mesh>
      {/* screen: unlit so the real UI keeps its colours */}
      <mesh geometry={screenGeo} position={[0, 0, D / 2 + 0.003]}>
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      {/* dynamic island */}
      <mesh geometry={islandGeo} position={[0, SCREEN_H / 2 - 0.07, D / 2 + 0.004]}>
        <meshBasicMaterial color="#000" />
      </mesh>
      {/* side buttons */}
      <mesh position={[W / 2 + 0.006, 0.45, 0]}>
        <boxGeometry args={[0.014, 0.26, 0.04]} />
        <meshStandardMaterial color="#3b2d55" metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh position={[-W / 2 - 0.006, 0.55, 0]}>
        <boxGeometry args={[0.014, 0.16, 0.04]} />
        <meshStandardMaterial color="#3b2d55" metalness={0.9} roughness={0.3} />
      </mesh>
      {/* camera plateau on the back */}
      <RoundedBox args={[0.42, 0.42, 0.04]} radius={0.08} position={[-0.2, 0.74, -D / 2 - 0.015]}>
        <meshPhysicalMaterial color="#3a2b55" metalness={0.6} roughness={0.2} clearcoat={1} />
      </RoundedBox>
      {[
        [-0.29, 0.83],
        [-0.11, 0.65],
      ].map(([x, y]) => (
        <mesh key={x} position={[x, y, -D / 2 - 0.04]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.065, 0.065, 0.02, 32]} />
          <meshPhysicalMaterial color="#07040c" metalness={0.5} roughness={0.05} clearcoat={1} />
        </mesh>
      ))}
    </group>
  );
}

function makeDotTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(0.35, 'rgba(210,180,255,.7)');
  grd.addColorStop(1, 'rgba(138,71,250,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

function Particles({ count, reduced }) {
  const ref = useRef();
  const [positions, sprite] = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const r = 2.2 + Math.random() * 4.2;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      p[i * 3] = r * Math.sin(ph) * Math.cos(th);
      p[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.75;
      p[i * 3 + 2] = r * Math.cos(ph) - 1.5;
    }
    return [p, makeDotTexture()];
  }, [count]);

  useFrame((_, dt) => {
    if (reduced || !ref.current) return;
    ref.current.rotation.y += dt * 0.03;
    ref.current.rotation.x += dt * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        map={sprite}
        size={0.09}
        sizeAttenuation
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#c9a6ff"
      />
    </points>
  );
}

function FakeShadow({ y }) {
  const tex = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const g = c.getContext('2d');
    const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grd.addColorStop(0, 'rgba(40,10,90,.55)');
    grd.addColorStop(1, 'rgba(40,10,90,0)');
    g.fillStyle = grd;
    g.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }, []);
  return (
    <mesh position={[0, y, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[2.6, 1.1, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={tex} transparent depthWrite={false} />
    </mesh>
  );
}

function Rig({ pointer, compact, reduced, isDark }) {
  const group = useRef();
  const main = useRef();
  const left = useRef();
  const right = useRef();
  const t0 = useRef(null);

  const [homeLight, homeDark, dashLight, dashDark, bot] = useTexture([
    '/screenshots/home_fr.webp',
    '/screenshots/home.webp',
    '/screenshots/dash_light.webp',
    '/screenshots/dash_dark.webp',
    '/screenshots/servibot.webp',
  ]);

  useFrame((state, dt) => {
    if (t0.current === null) t0.current = state.clock.elapsedTime;
    const t = state.clock.elapsedTime - t0.current;
    const intro = reduced ? 1 : Math.min(1, t / 1.8);
    const e = 1 - Math.pow(1 - intro, 3);
    const px = reduced ? 0 : pointer.current.x;
    const py = reduced ? 0 : pointer.current.y;
    const k = 1 - Math.pow(0.002, dt);

    if (group.current) {
      const targetY = -0.32 + px * 0.42 + (1 - e) * -1.4;
      const targetX = 0.06 - py * 0.22;
      group.current.rotation.y += (targetY - group.current.rotation.y) * k;
      group.current.rotation.x += (targetX - group.current.rotation.x) * k;
      const s = (compact ? 0.92 : 1) * (0.7 + 0.3 * e);
      group.current.scale.setScalar(s);
    }
    if (!reduced) {
      if (main.current) main.current.position.y = Math.sin(t * 0.9) * 0.06;
      if (left.current) left.current.position.y = 0.15 + Math.sin(t * 0.8 + 1.2) * 0.08;
      if (right.current) right.current.position.y = -0.25 + Math.sin(t * 0.7 + 2.4) * 0.08;
    }
  });

  return (
    <group ref={group}>
      <group ref={main}>
        <Phone texture={isDark ? homeDark : homeLight} />
      </group>
      {!compact && (
        <>
          <group ref={left} position={[-1.25, 0.15, -1.1]} rotation={[0, 0.35, 0.06]} scale={0.72}>
            <Phone texture={isDark ? dashDark : dashLight} />
          </group>
          <group ref={right} position={[1.3, -0.25, -0.9]} rotation={[0, -0.4, -0.05]} scale={0.68}>
            <Phone texture={bot} />
          </group>
        </>
      )}
      <FakeShadow y={-1.35} />
    </group>
  );
}

export default function HeroScene({ isDark, compact = false, reduced = false, active = true }) {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <Canvas
      dpr={[1, compact ? 1.5 : 1.75]}
      camera={{ position: [0, 0, 5.2], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={!active ? 'never' : reduced ? 'demand' : 'always'}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={isDark ? 0.35 : 0.7} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} />
      <pointLight position={[-3, 1, 2]} intensity={18} color="#8a47fa" />
      <pointLight position={[3, -2, -1]} intensity={14} color="#c084fc" />
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={3} position={[0, 3, 4]} scale={[6, 1.5, 1]} />
        <Lightformer form="rect" intensity={4} color="#8a47fa" position={[-4, 0, 1]} rotation-y={Math.PI / 2} scale={[4, 4, 1]} />
        <Lightformer form="rect" intensity={2} color="#e9dcff" position={[4, 1, 1]} rotation-y={-Math.PI / 2} scale={[3, 5, 1]} />
        <Lightformer form="ring" intensity={2} color="#b98fff" position={[0, 0, -4]} scale={3} />
      </Environment>
      <Particles count={compact ? 160 : 420} reduced={reduced} />
      <Rig pointer={pointer} compact={compact} reduced={reduced} isDark={isDark} />
    </Canvas>
  );
}
