// src/app/api/estimate/route.ts

import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { headers } from 'next/headers'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const HOURLY_RATE = 150 // CHF per hour

export async function POST(request: Request) {
  try {
    // Get token from header
    const headersList = headers()
    const token = headersList.get('authorization')?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { formData } = await request.json()
    const customerName = formData.user?.name || 'Valued Customer'

    const prompt = `You are a senior web development and design consultant at a prestigious Swiss digital agency. Your task is to analyze the following project requirements and create a professional, detailed quote.

PROJECT DETAILS:
Type: ${formData.projectType}
${formData.existingTechnology?.hasExisting ? `Existing Technology: ${formData.existingTechnology.details}` : ''}
${formData.compatibility?.needsCompatibility ? `Required Compatibility: ${formData.compatibility.systems.join(', ')}` : ''}
Features Needed: ${formData.features.join(', ')}
Pages Required: ${formData.pages.count}
Page Details:
${formData.pages.details.map((page: any) => `- ${page.name}: ${page.description}`).join('\n')}
Design Requirements: ${formData.design.hasDesign ? `Has design: ${formData.design.preferences}` : 'Needs design'}
Timeline: ${formData.timeline}
Budget: ${formData.budget || 'Not specified'}
Additional Information: ${formData.additionalInfo || 'None provided'}

Please provide a professional quote with the following sections:

1. INTRODUCTION:
[Personalized greeting to ${customerName} and brief overview of their project requirements]

2. TECHNICAL IMPLEMENTATION:
[Detailed breakdown of technical steps, including:
- Technologies to be used
- Development approach
- Key features implementation
- Integration requirements]

3. DELIVERABLES:
[Clear list of what will be delivered, including:
- Codebase specifications
- Documentation
- Training/handover materials]

4. TIMELINE AND MILESTONES:
[Detailed breakdown of project phases and estimated duration]

5. COST BREAKDOWN:
[Itemized list of tasks with hours and costs, using rate of ${HOURLY_RATE} CHF per hour]

6. TOTAL INVESTMENT:
[Sum of all costs with clear payment terms]

7. NEXT STEPS:
[Clear instructions on how to proceed and what to expect]

8. CLOSING:
[Professional closing with contact information]

Format the response professionally as a formal business quote. Be specific with technical details but explain them in a way that a non-technical client can understand. Include realistic time estimates based on industry standards.

Sign off with:
Best regards,
Know Ur Build Team
www.knowurbuild.com`

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a senior web development consultant at a Swiss digital agency, skilled in creating professional project quotes."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
    })

    const response = completion.choices[0].message.content || ''

    // Updated parsing without /s flag
    function extractSection(text: string, sectionNumber: number, nextSectionNumber: number): string {
      const startMarker = `${sectionNumber}. `
      const endMarker = `${nextSectionNumber}. `
      const startIndex = text.indexOf(startMarker)
      const endIndex = text.indexOf(endMarker)
      
      if (startIndex === -1) return ''
      
      if (endIndex === -1 && sectionNumber === 8) {
        // For the last section
        return text.slice(startIndex + startMarker.length).trim()
      }
      
      return text.slice(
        startIndex + startMarker.length,
        endIndex !== -1 ? endIndex : undefined
      ).trim()
    }

    const sections = {
      introduction: extractSection(response, 1, 2),
      technical: extractSection(response, 2, 3),
      deliverables: extractSection(response, 3, 4),
      timeline: extractSection(response, 4, 5),
      costBreakdown: extractSection(response, 5, 6),
      totalInvestment: extractSection(response, 6, 7),
      nextSteps: extractSection(response, 7, 8),
      closing: extractSection(response, 8, 9),
    }

    return NextResponse.json({
      quote: sections,
      raw: response // Include raw response for debugging
    })

  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate estimate' },
      { status: 500 }
    )
  }
}