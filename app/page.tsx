'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'

export default function Home() {
  const [data, setData] = useState(null)
  const [address,setAddress] = useState(null)
  useEffect(() => {
    const initEth = async()=>{
      if(window.ethereum){
        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAddress(accounts[0])
        } catch (error) {
            console.log(error)
        }
      }else{
        console.error("window.ethereum context unavailable")
      }
    }
   
    initEth()
  }, [])

  useEffect(()=>{
    if (address){
      const fetchData = async () => {
        console.log("query with address",address);
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()
        setData(result)      
      } 
      fetchData().catch((e) => {
        // handle the error as needed
        console.error('An error occurred while fetching the data: ', e)
      })
    }
  },[address])

  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <code className="font-mono font-bold">{address}</code>
        </p>        
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
      {JSON.stringify(data)}
      </div>
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
      </div>
    </main>
  )
}
