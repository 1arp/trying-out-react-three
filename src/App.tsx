import React, { Suspense, useRef, useState } from "react";
import "./App.css";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { Billboard, Stars, Text } from "@react-three/drei";
import Model from "./Pepe";

function Box(props: JSX.IntrinsicElements["mesh"]) {
	// This reference will give us direct access to the mesh
	const mesh = useRef<THREE.Mesh>(null!);
	// Set up state for the hovered and active state
	const [hovered, setHover] = useState(false);
	const [active, setActive] = useState(false);
	// Rotate mesh every frame, this is outside of React without overhead
	useFrame((state, delta) => (mesh.current.rotation.x += 0.01));

	return (
		<mesh
			{...props}
			ref={mesh}
			scale={active ? 1.5 : 1}
			onClick={(event) => setActive(!active)}
			onPointerOver={(event) => setHover(true)}
			onPointerOut={(event) => setHover(false)}
		>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
		</mesh>
	);
}

const RotatingStars = () => {
	const starsRef = useRef<Mesh>(null!);
	useFrame(() => {
		starsRef.current.rotation.y += 0.01;
		starsRef.current.rotation.x += 0.001;
	});
	return <Stars ref={starsRef} />;
};

function App() {
	return (
		<div className="App" style={{ height: "100vh", width: "100vw" }}>
			<Canvas>
				<RotatingStars />
				{/* <OrbitControls /> */}
				<ambientLight intensity={0.1} />
				<directionalLight color="green" position={[5, 0, 2]} />
				<directionalLight color="green" position={[-5, 0, -3]} />

				<Suspense fallback={null}>
					<Model />
					<Billboard follow={true} position={[0, 3, 0]}>
						<Text fontSize={0.5}>When Life Hits You At 3AM</Text>
					</Billboard>
				</Suspense>
				<Box
					position={[-1.2, 0.5, 0.1]}
					rotation={[Math.PI / 3, Math.PI / 3, 0]}
				/>
			</Canvas>
		</div>
	);
}

export default App;
