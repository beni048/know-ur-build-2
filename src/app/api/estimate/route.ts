// src/app/api/estimate/route.ts

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const HOURLY_RATE = 150; // CHF per hour

export async function POST(req: Request) {
  try {
    // Check authentication
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { description } = await req.json()

    const prompt = `As a web development expert, analyze the following website customization request and provide:
1. A detailed technical specification
2. An estimated time to complete (in hours)
3. A cost estimate based on ${HOURLY_RATE} CHF per hour

Request: ${description}

Format your response in three sections:
TECHNICAL_DETAILS: [your technical breakdown]
TIME_ESTIMATE: [your time estimate in hours]
COST_ESTIMATE: [calculated cost in CHF]`

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a professional web development estimator with extensive experience in project planning and cost estimation."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
    })

    const response = completion.choices[0].message.content
    const sections = response.split('\n')

    // Parse the response
    const result = {
      technicalDetails: sections.find(s => s.startsWith('TECHNICAL_DETAILS:'))?.replace('TECHNICAL_DETAILS:', '').trim() || '',
      timeEstimate: sections.find(s => s.startsWith('TIME_ESTIMATE:'))?.replace('TIME_ESTIMATE:', '').trim() || '',
      costEstimate: sections.find(s => s.startsWith('COST_ESTIMATE:'))?.replace('COST_ESTIMATE:', '').trim() || '',
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate estimate' },
      { status: 500 }
    )
  }
}