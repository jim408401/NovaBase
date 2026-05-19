import { Html, OrbitControls, Stars } from '@react-three/drei';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import type { CelestialObject, CelestialType, Language } from '../types';

type SpaceSceneProps = {
  objects: CelestialObject[];
  activeId: string;
  selectedId: string;
  language: Language;
  filter: CelestialType | 'all';
  speed: number;
  lowPower: boolean;
  onSelect: (id: string) => void;
};

type PlanetMaterialProps = {
  object: CelestialObject;
  active: boolean;
};

function CinematicComposer({ lowPower }: { lowPower: boolean }) {
  const { gl, scene, camera, size } = useThree();
  const composer = useMemo(() => {
    const nextComposer = new EffectComposer(gl);
    nextComposer.addPass(new RenderPass(scene, camera));
    nextComposer.addPass(
      new UnrealBloomPass(
        new THREE.Vector2(size.width, size.height),
        lowPower ? 0.18 : 0.42,
        lowPower ? 0.25 : 0.58,
        0.08,
      ),
    );
    nextComposer.addPass(new OutputPass());
    return nextComposer;
  }, [camera, gl, lowPower, scene, size.height, size.width]);

  useEffect(() => {
    composer.setSize(size.width, size.height);
  }, [composer, size.height, size.width]);

  useFrame(() => composer.render(), 1);
  return null;
}

function SkySphere({ lowPower }: { lowPower: boolean }) {
  const starTexture = useLoader(THREE.TextureLoader, '/textures/8k_stars.jpg');
  const skyTexture = useLoader(THREE.TextureLoader, '/textures/stars.jpg');

  useMemo(() => {
    starTexture.colorSpace = THREE.SRGBColorSpace;
    skyTexture.colorSpace = THREE.SRGBColorSpace;
  }, [skyTexture, starTexture]);

  return (
    <>
      <mesh>
        <sphereGeometry args={[115, lowPower ? 32 : 64, lowPower ? 32 : 64]} />
        <meshBasicMaterial map={starTexture} side={THREE.BackSide} toneMapped={false} color="#ffffff" />
      </mesh>
      {!lowPower && (
        <mesh>
          <sphereGeometry args={[108, 48, 48]} />
          <meshBasicMaterial map={skyTexture} side={THREE.BackSide} toneMapped={false} transparent opacity={0.28} color="#cfe9ff" />
        </mesh>
      )}
    </>
  );
}

function GalaxyDust({ lowPower }: { lowPower: boolean }) {
  const points = useMemo(() => {
    const vertices: number[] = [];
    const count = lowPower ? 850 : 2100;

    for (let i = 0; i < count; i += 1) {
      const arm = i % 4;
      const radius = Math.random() * 9.5;
      const angle = radius * 0.72 + arm * Math.PI * 0.5 + (Math.random() - 0.5) * 0.7;
      const height = (Math.random() - 0.5) * 0.55;
      vertices.push(Math.cos(angle) * radius, height, Math.sin(angle) * radius);
    }

    return new Float32Array(vertices);
  }, [lowPower]);

  return (
    <points rotation={[0.08, 0, -0.16]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={points.length / 3} array={points} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#9bd8ff" size={lowPower ? 0.018 : 0.025} transparent opacity={0.54} depthWrite={false} />
    </points>
  );
}

function AsteroidBelt({ lowPower, speed }: { lowPower: boolean; speed: number }) {
  const group = useRef<THREE.Points>(null);
  const points = useMemo(() => {
    const vertices: number[] = [];
    const colors: number[] = [];
    const count = lowPower ? 250 : 650;
    const palette = [new THREE.Color('#7b5b3f'), new THREE.Color('#918879'), new THREE.Color('#6b5544')];

    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 3.75 + Math.random() * 0.55;
      const height = (Math.random() - 0.5) * 0.28;
      const color = palette[Math.floor(Math.random() * palette.length)];
      vertices.push(Math.cos(angle) * radius, height, Math.sin(angle) * radius);
      colors.push(color.r, color.g, color.b);
    }

    return { positions: new Float32Array(vertices), colors: new Float32Array(colors) };
  }, [lowPower]);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.045 * speed;
  });

  return (
    <points ref={group}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={points.positions.length / 3} array={points.positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={points.colors.length / 3} array={points.colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={lowPower ? 0.018 : 0.026} vertexColors transparent opacity={0.74} />
    </points>
  );
}

function OrbitLine({ radius, tilt = 0 }: { radius: number; tilt?: number }) {
  const line = useMemo(() => {
    const points = Array.from({ length: 160 }, (_, index) => {
      const angle = (index / 160) * Math.PI * 2;
      return new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
    });
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: '#91dcff', transparent: true, opacity: 0.2 });
    return new THREE.LineLoop(geometry, material);
  }, [radius]);

  return <primitive object={line} rotation={[tilt, 0, 0]} />;
}

function TexturedPlanetMaterial({ object, active }: PlanetMaterialProps) {
  const texture = useLoader(THREE.TextureLoader, object.visual.texture!);

  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
  }, [texture]);

  if (object.id === 'sun') {
    return <meshBasicMaterial map={texture} toneMapped={false} color="#fff2c3" />;
  }

  return (
    <meshStandardMaterial
      map={texture}
      roughness={object.visual.roughness ?? 0.82}
      metalness={object.visual.metalness ?? 0.04}
      emissive={object.visual.emissive ?? '#000000'}
      emissiveIntensity={active ? 0.12 : 0.04}
    />
  );
}

function SolidPlanetMaterial({ object, active }: PlanetMaterialProps) {
  return (
    <meshStandardMaterial
      color={object.visual.color}
      roughness={object.visual.roughness ?? 0.82}
      metalness={object.visual.metalness ?? 0.05}
      emissive={object.visual.emissive ?? object.visual.color}
      emissiveIntensity={object.type === 'planet' ? 0.08 : active ? 0.7 : 0.36}
    />
  );
}

function SaturnRing({ textureUrl, active }: { textureUrl?: string; active: boolean }) {
  if (textureUrl) return <TexturedRing textureUrl={textureUrl} active={active} />;

  return (
    <mesh rotation={[Math.PI / 2.35, 0.25, 0]}>
      <ringGeometry args={[0.72, 1.1, 128]} />
      <meshBasicMaterial color={active ? '#fff1bd' : '#d9c997'} side={THREE.DoubleSide} transparent opacity={0.58} />
    </mesh>
  );
}

function TexturedRing({ textureUrl, active }: { textureUrl: string; active: boolean }) {
  const texture = useLoader(THREE.TextureLoader, textureUrl);

  return (
    <mesh rotation={[Math.PI / 2.35, 0.25, 0]}>
      <ringGeometry args={[0.72, 1.22, 128]} />
      <meshBasicMaterial
        map={texture}
        alphaMap={texture}
        side={THREE.DoubleSide}
        transparent
        opacity={active ? 0.82 : 0.62}
        toneMapped={false}
      />
    </mesh>
  );
}

function MoonSystem({ object, speed, lowPower }: { object: CelestialObject; speed: number; lowPower: boolean }) {
  const moonRefs = useRef<Array<THREE.Group | null>>([]);
  const moons = object.visual.moons ?? [];

  useFrame((_, delta) => {
    moonRefs.current.forEach((moonPivot, index) => {
      const moon = moons[index];
      if (moonPivot && moon) moonPivot.rotation.y += delta * moon.orbitSpeed * speed;
    });
  });

  if (!moons.length) return null;

  return (
    <>
      {moons.map((moon, index) => (
        <group
          key={`${object.id}-${moon.name.en}`}
          ref={(node) => {
            moonRefs.current[index] = node;
          }}
          rotation={[0, index * 1.4, 0]}
        >
          <mesh position={[moon.orbitRadius, 0.02 * (index + 1), 0]}>
            <sphereGeometry args={[moon.size, lowPower ? 12 : 24, lowPower ? 8 : 16]} />
            <meshStandardMaterial color={moon.color} roughness={0.92} metalness={0.05} />
          </mesh>
        </group>
      ))}
    </>
  );
}

function SunGlow({ active }: { active: boolean }) {
  return (
    <>
      <mesh>
        <sphereGeometry args={[1.55, 48, 32]} />
        <meshBasicMaterial color="#ffc857" transparent opacity={active ? 0.2 : 0.14} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.15, 48, 32]} />
        <meshBasicMaterial color="#ff7b00" transparent opacity={0.055} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </>
  );
}

function CelestialMesh({
  object,
  active,
  selected,
  language,
  speed,
  lowPower,
  onSelect,
}: {
  object: CelestialObject;
  active: boolean;
  selected: boolean;
  language: Language;
  speed: number;
  lowPower: boolean;
  onSelect: (id: string) => void;
}) {
  const pivot = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (pivot.current && object.visual.orbitRadius) {
      pivot.current.rotation.y += delta * (object.visual.orbitSpeed ?? 0.2) * speed;
    }
    if (mesh.current) {
      mesh.current.rotation.y += delta * (object.visual.rotationSpeed ?? 0.08) * speed;
    }
  });

  const meshPosition: [number, number, number] = object.visual.orbitRadius ? [object.visual.orbitRadius, 0, 0] : object.visual.position;
  const scale = selected ? 1.18 : hovered ? 1.08 : 1;

  return (
    <group ref={pivot} rotation={[object.visual.orbitTilt ?? 0, object.visual.orbitRadius ? object.visual.position[0] * 0.4 : 0, 0]}>
      <group position={meshPosition}>
        {object.id === 'sun' && <SunGlow active={active || selected} />}
        <mesh
          ref={mesh}
          scale={scale}
          castShadow={object.id !== 'sun'}
          receiveShadow={object.id !== 'sun'}
          onClick={(event) => {
            event.stopPropagation();
            onSelect(object.id);
          }}
          onPointerOver={(event) => {
            event.stopPropagation();
            setHovered(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = 'auto';
          }}
        >
          <sphereGeometry args={[object.visual.size, lowPower ? 32 : 72, lowPower ? 20 : 48]} />
          {object.visual.texture ? <TexturedPlanetMaterial object={object} active={active || selected} /> : <SolidPlanetMaterial object={object} active={active || selected} />}
        </mesh>
        {object.visual.ringTexture && <SaturnRing textureUrl={object.visual.ringTexture} active={active || selected} />}
        <MoonSystem object={object} speed={speed} lowPower={lowPower} />
        {(hovered || selected) && (
          <Html center distanceFactor={8} position={[0, object.visual.size + 0.38, 0]}>
            <span className="scene-label">{object.name[language]}</span>
          </Html>
        )}
      </group>
    </group>
  );
}

function SceneContent(props: SpaceSceneProps) {
  const controls = useRef<React.ElementRef<typeof OrbitControls>>(null);

  useFrame(() => {
    const selected = props.objects.find((object) => object.id === props.selectedId);
    if (!selected || !controls.current) return;
    const target = selected.visual.orbitRadius ? [selected.visual.orbitRadius, 0, 0] : selected.visual.position;
    controls.current.target.lerp(new THREE.Vector3(...target), 0.018);
    controls.current.update();
  });

  return (
    <>
      <color attach="background" args={['#000814']} />
      <fog attach="fog" args={['#000814', 24, 85]} />
      <ambientLight intensity={0.42} color="#20242c" />
      <pointLight position={[0, 0, 0]} intensity={9.5} distance={120} decay={0.7} color="#fff3d0" />
      <pointLight position={[45, 35, -55]} intensity={1.8} distance={100} decay={1} color="#5fa8ff" />
      <SkySphere lowPower={props.lowPower} />
      <Stars radius={95} depth={35} count={props.lowPower ? 700 : 1800} factor={4} saturation={0.25} fade speed={0.18} />
      <GalaxyDust lowPower={props.lowPower} />
      {props.objects.some((object) => object.id === 'jupiter' || object.id === 'mars') && <AsteroidBelt lowPower={props.lowPower} speed={props.speed} />}
      {props.objects.map((object) => {
        const visible = props.filter === 'all' || object.type === props.filter;
        if (!visible) return null;
        return (
          <group key={object.id}>
            {object.visual.orbitRadius && <OrbitLine radius={object.visual.orbitRadius} tilt={object.visual.orbitTilt} />}
            <CelestialMesh
              object={object}
              active={object.id === props.activeId}
              selected={object.id === props.selectedId}
              language={props.language}
              speed={props.speed}
              lowPower={props.lowPower}
              onSelect={props.onSelect}
            />
          </group>
        );
      })}
      <OrbitControls ref={controls} enableDamping dampingFactor={0.08} rotateSpeed={0.38} zoomSpeed={0.82} minDistance={3.2} maxDistance={22} maxPolarAngle={Math.PI * 0.84} />
      <CinematicComposer lowPower={props.lowPower} />
    </>
  );
}

export function SpaceScene(props: SpaceSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 6.2, 12.5], fov: 52 }}
      dpr={props.lowPower ? [1, 1.2] : [1, 2]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      shadows
      onCreated={({ gl }) => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.15;
        gl.outputColorSpace = THREE.SRGBColorSpace;
      }}
    >
      <SceneContent {...props} />
    </Canvas>
  );
}
