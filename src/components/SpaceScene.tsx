import { Html, OrbitControls, Stars } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
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

type SceneContentProps = SpaceSceneProps & {
  selectedObject?: CelestialObject;
};

function GalaxyDust({ lowPower }: { lowPower: boolean }) {
  const points = useMemo(() => {
    const vertices: number[] = [];
    const count = lowPower ? 850 : 1900;

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
      <pointsMaterial color="#9bd8ff" size={lowPower ? 0.018 : 0.025} transparent opacity={0.56} depthWrite={false} />
    </points>
  );
}

function OrbitLine({ radius, tilt = 0 }: { radius: number; tilt?: number }) {
  const line = useMemo(() => {
    const points = Array.from({ length: 129 }, (_, index) => {
      const angle = (index / 128) * Math.PI * 2;
      return new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
    });
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: '#7bdff2', transparent: true, opacity: 0.18 });
    return new THREE.LineLoop(geometry, material);
  }, [radius]);

  return <primitive object={line} rotation={[tilt, 0, 0]} />;
}

function SaturnRing({ active }: { active: boolean }) {
  return (
    <mesh rotation={[Math.PI / 2.35, 0.25, 0]}>
      <ringGeometry args={[0.72, 1.08, 96]} />
      <meshBasicMaterial color={active ? '#fff1bd' : '#d9c997'} side={THREE.DoubleSide} transparent opacity={0.58} />
    </mesh>
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
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const { orbitRadius, orbitSpeed = 0.2, orbitTilt = 0 } = object.visual;

    if (orbitRadius) {
      const angle = clock.elapsedTime * orbitSpeed * speed;
      group.current.position.set(Math.cos(angle) * orbitRadius, Math.sin(orbitTilt) * 0.18, Math.sin(angle) * orbitRadius);
    } else {
      group.current.position.set(...object.visual.position);
    }

    group.current.rotation.y += 0.004 + orbitSpeed * 0.002;
  });

  const scale = selected ? 1.23 : hovered ? 1.12 : 1;
  const emissive = object.visual.emissive ?? object.visual.color;

  return (
    <group ref={group} position={object.visual.position}>
      <mesh
        scale={scale}
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
        <sphereGeometry args={[object.visual.size, lowPower ? 28 : 48, lowPower ? 18 : 32]} />
        <meshStandardMaterial
          color={object.visual.color}
          emissive={emissive}
          emissiveIntensity={object.type === 'planet' ? 0.1 : active ? 0.82 : 0.45}
          roughness={0.62}
          metalness={0.08}
        />
      </mesh>
      {object.id === 'saturn' && <SaturnRing active={active} />}
      {(hovered || selected) && (
        <Html center distanceFactor={8} position={[0, object.visual.size + 0.38, 0]}>
          <span className="scene-label">{object.name[language]}</span>
        </Html>
      )}
    </group>
  );
}

function SceneContent(props: SceneContentProps) {
  const controls = useRef<React.ElementRef<typeof OrbitControls>>(null);

  useFrame(() => {
    const selected = props.selectedObject;
    if (!selected || !controls.current) return;
    const target = selected.visual.orbitRadius ? selected.visual.position : selected.visual.position;
    controls.current.target.lerp(new THREE.Vector3(...target), 0.025);
    controls.current.update();
  });

  return (
    <>
      <color attach="background" args={['#02050d']} />
      <fog attach="fog" args={['#02050d', 9, 22]} />
      <ambientLight intensity={0.35} />
      <pointLight position={[0, 0.2, 0]} intensity={4.5} color="#ffd166" />
      <directionalLight position={[-5, 7, 4]} intensity={1.4} color="#d6f3ff" />
      <Stars radius={80} depth={35} count={props.lowPower ? 900 : 2600} factor={4} saturation={0.25} fade speed={0.28} />
      <GalaxyDust lowPower={props.lowPower} />
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
      <OrbitControls ref={controls} enableDamping dampingFactor={0.08} minDistance={3.2} maxDistance={17} maxPolarAngle={Math.PI * 0.82} />
    </>
  );
}

export function SpaceScene(props: SpaceSceneProps) {
  const selectedObject = props.objects.find((object) => object.id === props.selectedId);

  return (
    <Canvas camera={{ position: [0, 5.7, 10.8], fov: 48 }} dpr={props.lowPower ? [1, 1.2] : [1, 1.75]}>
      <SceneContent {...props} selectedObject={selectedObject} />
    </Canvas>
  );
}
