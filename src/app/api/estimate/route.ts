// src/app/api/estimate/route.ts

import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { headers } from 'next/headers'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const HOURLY_RATE = 179

export async function POST(request: Request) {
  try {
    const { description } = await request.json()

    const prompt = `As a web development expert, analyze this request and provide:
1. Technical details
2. Time estimate
3. Cost calculation (${HOURLY_RATE} CHF/hour)

Request: ${description}

Format your response exactly like this:
TECHNICAL_DETAILS: [technical breakdown]
TIME_ESTIMATE: [time in hours]
COST_ESTIMATE: [cost in CHF]`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        {
          role: "system",
          content: "You are a web development expert providing estimates."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
    })

    const response = completion.choices[0].message.content || ''
    
    function extractSection(content: string, section: string): string {
      const startIndex = content.indexOf(section + ': ')
      if (startIndex === -1) return ''
      
      const start = startIndex + section.length + 2
      const nextSection = content.indexOf('\n', start)
      
      return content.slice(start, nextSection === -1 ? undefined : nextSection).trim()
    }

    return NextResponse.json({
      technicalDetails: extractSection(response, 'TECHNICAL_DETAILS'),
      timeEstimate: extractSection(response, 'TIME_ESTIMATE'),
      costEstimate: extractSection(response, 'COST_ESTIMATE')
    })

  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate estimate' },
      { status: 500 }
    )
  }
}