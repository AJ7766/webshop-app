import { NextResponse } from 'next/server';

export async function POST(req: Request){
  const product = await req.json()
  console.log('Received value:', product); // Log the received value
  return NextResponse.json({
  product
  });
}

export async function GET(req: Request) {
  const product = req.body;
  console.log('sending:', product); // Log the received value
  return NextResponse.json({
    product
  })
}