import connectDB from "@/lib/mongoose";
import User from "@/models/Users";
import { NextResponse } from "next/server";

export async function POST(req){
  try{
    await connectDB();
    const { name, email } = await req.json();
    const user = await User.create({ name, email });
    return NextResponse.json(user,{status:201});
  }
  catch(error){
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
