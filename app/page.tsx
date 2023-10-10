'use client'
import * as THREE from 'three'
import React, { useState, useEffect,Suspense,useRef } from 'react'
import {base58 } from '@scure/base';
import { Environment, Text3D,Center,Text, OrbitControls,useGLTF,Stats,Circle, MeshDistortMaterial} from '@react-three/drei'
import { Canvas, useThree} from '@react-three/fiber'
import { Bloom, DepthOfField, EffectComposer, Noise, Scanline, Vignette,Grid ,ChromaticAberration} from '@react-three/postprocessing'
import { materialOpacity } from 'three/examples/jsm/nodes/Nodes.js';

//import { TextureLoader } from 'three/src/loaders/TextureLoader'


function Model() {
  const {camera, size:{width,height}} = useThree()
  const gltf = useGLTF('/david_head/scene.gltf')
  const box = new THREE.Box3().setFromObject(gltf.scene);
  // const boxSize = box.getSize(new THREE.Vector3()).length();
  // const boxCenter = box.getCenter(new THREE.Vector3());
  camera.zoom = 
    width/ (1.5*(box.max.x - box.min.x));
  camera.updateProjectionMatrix();
  return <primitive object={gltf.scene} scale={.05} position={[0,-(box.max.y-box.min.y)/2,0]} material={null}/>
   
}

const Box = () => {
  return<></>
  // return (
  //   <mesh rotation-x={0.} rotation-z={0.2} position={[0,0,-5.5]}>
  //     <planeGeometry args={[8, 6]} />
  //     <meshToonMaterial color={"black"} />
  //   </mesh>
  // );
};

const Box2 = () => {
  return (
    <mesh position={[-0.1,1.3,2]}>
      <planeGeometry args={[100, .6]} />
      <meshBasicMaterial color={"red"} opacity={0.8} />
    </mesh>
  );
};

function Scene() {
  //const colorMap = useLoader(TextureLoader, 'bg.png')
  return (
    <>
      <ambientLight intensity={0} />
      <directionalLight />     
    </>
  )
}

type command = {
  command: string
  targetUrl: string
}

export default function Home() {
  // const [data, setData] = useState(null)
  // const [address,setAddress] = useState(null)
  
  // useEffect(() => {
  //   const initEth = async()=>{
  //     if((window as any).ethereum){
  //       try {
  //           const accounts = await (window as any).ethereum.request({
  //               method: "eth_requestAccounts",
  //           });
  //           setAddress(accounts[0])
  //       } catch (error) {
  //           console.log(error)
  //       }
  //     }else{
  //       console.error("window.ethereum context unavailable")
  //     }
  //   }
    
  //   initEth()
  // }, [])

  // useEffect(()=>{
  //   if (address){
  //     const queryParameters = new URLSearchParams(window.location.search)
  //     const base58data = queryParameters.get("data") 
  //     // var commandParamsE = base58.encode(Buffer.from(JSON.stringify({command: "cb_marketing_q4", targetUrl: 'https://api.wallet.coinbase.com/rpc/v2/bot/mint'})))
  //     // console.log("encoded data",commandParamsE)
  //     if (!base58data){
  //       console.error("no data received")
  //     }
  //     var commandParams = JSON.parse(Buffer.from(base58.decode(base58data as string)).toString()) as command
  //     console.log("decoded data",commandParams)

  //     const fetchData = async () => {
  //       console.log("query with address",address);
  //       const response = await fetch('/api/relay',{
  //         method: 'POST',
  //         headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({command: commandParams.command, userAddress: address, targetUrl: commandParams.targetUrl})
  //       })
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`)
  //       }
  //       const result = await response.json()
  //       setData(result)      
  //     } 
  //     fetchData().catch((e) => {
  //       // handle the error as needed
  //       console.error('An error occurred while fetching the data: ', e)
  //     })
  //   }
  // },[address])

  
  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor:'blue'}}>
       <>
       <Canvas orthographic shadows>
       <ambientLight intensity={2} color={"white"}/>
       <pointLight position={[1, 1, 1]} color={"blue"} intensity={12}/>
      <directionalLight position={[10, 10, 10]} /> 
       <Suspense fallback={null}>    
       <group>     
          <Model />          
          <Box2 />
          {/* <group position={[.5,2.1,2.2]}>           
            <Center>           
              <Text font={'/font.ttf'} scale={1.4} >
                BASED
                <meshBasicMaterial color={'red'}/>                
              </Text>                     
            </Center> 
          </group> */}
          <group position={[.5,2.2,2.5]}>
            <Center >           
              <Text font={'/font.ttf'} scale={[1.4,1.8,1]} fillOpacity={0.95}  >
                {/*outlineColor={"black"} outlineWidth={.01}
                */}
                BASED
                <meshBasicMaterial color={'#FFC300'}/>                
              </Text>                     
            </Center> 
          </group>
        </group>
        </Suspense>
        <Box />
        <EffectComposer>
        {/* <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} /> */}
        {/* <Grid scale={.1} /> */}
        <ChromaticAberration      
          // @ts-expect-error: Let's ignore a compile error  
          offset={[0.01, 0.002]} // color offset
        />
        <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} height={500} />
        {/* <Noise opacity={0.02} /> */}
        {/* <Vignette eskil={false} offset={0.1} darkness={1.1} /> */}
       
      </EffectComposer>
      <OrbitControls target={[0, 0, 0]} />
      <axesHelper args={[5]} />
      <Stats />
    </Canvas>
    </>
      {/* <Canvas orthographic  camera={{ position: [0, 0, 100], zoom: 1 }}>
      <primitive
        object={gltf.scene}
        position={[0, 0, 0]}
        children-0-castShadow        
      />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} /> */}
    {/* <Center Top Left>
      <Text3D font={'/font.json'} size={80} >
        WORLD
        <meshNormalMaterial />
      </Text3D>      
      </Center> */}
       {/* <group position={[-20, -20, 0]}>
      <Text
        font={
          "/font.ttf"
        }
        //scale={[50, 200, 11]}
        fontSize={300}
        color="yellow" // default
        anchorX="center" // default
        anchorY="middle" // default
        
      >
        AIR
      </Text>
      </group>
      <group position={[-10, -10, 0]}>
      <Text
        font={
          "/font.ttf"
        }
        //scale={[50, 200, 11]}
        fontSize={300}
        color="orange" // default
        anchorX="center" // default
        anchorY="middle" // default
        
      >
        AIR
      </Text>
      </group>
      <group position={[0, 0, 0]}>     
        <Text
        font={
          "/font.ttf"
        }
        //scale={[50, 200, 11]}
        fontSize={300}
        color="red" // default
        anchorX="center" // default
        anchorY="middle" // default
        
      >
        AIR
      </Text>
      
    </group>
    <group position={[0, -190, 0]}>
    <Text
      font={
        "/font.ttf"
      }
      //scale={[50, 200, 11]}
      fontSize={195}
      color="black" // default
      anchorX="center" // default
      anchorY="middle" // default
      
    >
      DROP
    </Text>
    </group> */}
    {/* <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />
      </Canvas> */}
      </div>

  )
}
