import { NextResponse,NextRequest } from 'next/server'

type commandOp = {
  command: string,
  targetUrl: string,
  userAddress: string
}

export async function POST(req:NextRequest) {  
  const command = await req.json() as commandOp
  console.log("query with address",command.userAddress);
  const response = await fetch(command.targetUrl,{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({command: command.command, userAddress: command.userAddress})
  })
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const result = await response.json()
  return NextResponse.json(result)
} 
