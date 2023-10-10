'use client'

// import * as THREE from 'three'
// import React, { useRef, useMemo, useEffect } from 'react'
// import { extend, useThree, useFrame , } from '@react-three/fiber'
// import { EffectComposer } from '@react-three/postprocessing'

// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
// import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
// import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass'
// import { CrtShader } from './crt'

// extend({ EffectComposer, ShaderPass, RenderPass, UnrealBloomPass })

// export default function Effects() {
//   const composer = useRef() as any
//   const { scene, gl, size, camera } = useThree()
//   const aspect = useMemo(() => new THREE.Vector2(512, 512), [])
//   useEffect(() => void composer.current.setSize(size.width, size.height), [size])
//   useFrame(() => composer.current.render(), 1)
//   return (
//     <effectComposer ref={composer} args={[gl]}>
//       <renderPass attachArray="passes" scene={scene} camera={camera} />
//       <shaderPass attachArray="passes" args={[CrtShader]} scene={scene} camera={camera} />
//       <unrealBloomPass attachArray="passes" args={[undefined, 2, 0.8, 0]} />
//     </effectComposer>
//   )
// }
