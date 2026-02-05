import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const GEMINI_API_KEY = 'AIzaSyBWMKvKnp2vJJssdlN39hMZG1LR-3QIJw4';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

interface BailRequest {
  name: string;
  age: number;
  gender: string;
  offenseType: string;
  sectionNumber: string;
  priorConvictions: boolean;
  employmentStatus: string;
  familyTies: string;
  criminalHistory: string;
  additionalDetails?: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: BailRequest = await request.json();

    // Load BNS sections data (in production, you might want to cache this)
    const bnsDataResponse = await fetch(`${request.nextUrl.origin}/bns_sections.csv`);
    const bnsDataText = await bnsDataResponse.text();
    
    // Parse CSV to find relevant sections
    const lines = bnsDataText.split('\n');
    const relevantSections = lines.filter(line => {
      const lowerLine = line.toLowerCase();
      return lowerLine.includes(data.sectionNumber.toLowerCase()) || 
             lowerLine.includes(data.offenseType.toLowerCase());
    }).slice(0, 5); // Limit to 5 most relevant sections

    const bnsContext = relevantSections.join('\n');

    // Construct prompt for Gemini
    const prompt = `You are an expert legal AI assistant specializing in Indian criminal law and bail applications under the Bharatiya Nyaya Sanhita (BNS), 2023.

Based on the following case details, provide a comprehensive bail eligibility analysis:

**Case Details:**
- Name: ${data.name}
- Age: ${data.age}
- Gender: ${data.gender}
- Offense Type: ${data.offenseType}
- Section Number: ${data.sectionNumber}
- Prior Convictions: ${data.priorConvictions ? 'Yes' : 'No'}
- Employment Status: ${data.employmentStatus}
- Family Ties: ${data.familyTies}
- Criminal History: ${data.criminalHistory}
${data.additionalDetails ? `- Additional Details: ${data.additionalDetails}` : ''}

**Relevant BNS Sections:**
${bnsContext}

Please provide a detailed analysis including:
1. **Bail Eligibility Assessment**: Determine if the accused is likely eligible for bail based on the offense type, section, and case details.
2. **Legal Reasoning**: Explain the legal grounds supporting or opposing bail under BNS provisions.
3. **Risk Factors**: Identify any factors that might affect bail (flight risk, evidence tampering, etc.).
4. **Recommendations**: Suggest conditions that might be imposed if bail is granted.
5. **Precedents**: Mention any relevant legal principles or precedents that apply.
6. **Overall Likelihood**: Provide a percentage likelihood of bail being granted (e.g., 65% likely).

Format your response in a clear, structured manner suitable for legal professionals and defendants.`;

    // Call Gemini API using axios
    const geminiResponse = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    
    // Extract the generated text
    const suggestion = geminiResponse.data.candidates?.[0]?.content?.parts?.[0]?.text || 
                      'Unable to generate suggestion at this time.';

    return NextResponse.json({
      success: true,
      suggestion,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('AI Suggestion Error:', error);
    
    // Handle axios errors
    if (axios.isAxiosError(error)) {
      console.error('Gemini API Error:', error.response?.data);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to generate AI suggestion',
          message: error.response?.data?.error?.message || error.message
        },
        { status: error.response?.status || 500 }
      );
    }
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate AI suggestion',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
