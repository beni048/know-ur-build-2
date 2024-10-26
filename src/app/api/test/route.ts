// src/app/api/test/route.ts

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function GET() {
  try {
    await dbConnect();
    
    // Simple test query
    const count = await User.countDocuments();
    
    return NextResponse.json({ 
      status: 'Connected to MongoDB!', 
      userCount: count 
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ 
      error: 'Failed to connect to database' 
    }, { status: 500 });
  }
}