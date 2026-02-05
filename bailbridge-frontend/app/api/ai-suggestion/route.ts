import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

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

    const bnsDataResponse = await fetch(`${request.nextUrl.origin}/bns_sections.csv`);
    const bnsDataText = await bnsDataResponse.text();
    

    const lines = bnsDataText.split('\n');
    const relevantSections = lines.filter(line => {
      const lowerLine = line.toLowerCase();
      return lowerLine.includes(data.sectionNumber.toLowerCase()) || 
             lowerLine.includes(data.offenseType.toLowerCase());
    }).slice(0, 10); 

    const bnsContext = relevantSections.join('\n');

    
    const prompt = `You are an expert legal AI assistant and bail eligibility analyzer specializing in Indian criminal law under the Bharatiya Nyaya Sanhita (BNS), 2023.

Your task is to provide a COMPREHENSIVE and DEFINITIVE bail eligibility analysis that clearly determines whether the accused is likely to GET BAIL or NOT GET BAIL.

**ACCUSED PERSON DETAILS:**
- Name: ${data.name}
- Age: ${data.age}
- Gender: ${data.gender}
- Offense Type: ${data.offenseType}
- BNS Section Number: ${data.sectionNumber}
- Prior Convictions: ${data.priorConvictions ? 'Yes' : 'No'}
- Employment Status: ${data.employmentStatus}
- Family Ties: ${data.familyTies}
- Criminal History: ${data.criminalHistory}
${data.additionalDetails ? `- Additional Details: ${data.additionalDetails}` : ''}

**RELEVANT BNS SECTIONS FROM DATABASE:**
${bnsContext}

**INSTRUCTIONS FOR ANALYSIS:**
You MUST provide a detailed analysis that covers ALL of the following sections. Use the BNS sections data above to make informed decisions.

---

## 1. FINAL BAIL DECISION
**START WITH THIS - CLEARLY STATE: "BAIL LIKELY TO BE GRANTED" OR "BAIL UNLIKELY TO BE GRANTED" OR "BAIL DECISION UNCERTAIN"**

Provide the percentage likelihood: X% chance of bail being granted

---

## 2. OFFENSE CLASSIFICATION & SEVERITY
- Classify the offense (Bailable/Non-bailable/Cognizable/Non-cognizable)
- Analyze the severity based on BNS Section ${data.sectionNumber}
- Specify punishment provisions (imprisonment duration, fines)
- Explain if this is a scheduled offense under CrPC provisions

---

## 3. LEGAL GROUNDS ANALYSIS
**Factors SUPPORTING Bail:**
- List all positive factors (age, first-time offender, family ties, employment, etc.)
- Reference specific BNS provisions that support bail

**Factors OPPOSING Bail:**
- List all negative factors (prior convictions, severity of crime, flight risk, etc.)
- Reference specific BNS provisions that oppose bail

---

## 4. RISK ASSESSMENT
Evaluate the following risks:
- **Flight Risk**: Likelihood of accused absconding (Low/Medium/High)
- **Evidence Tampering Risk**: Risk of interfering with witnesses/evidence (Low/Medium/High)
- **Public Safety Risk**: Danger to society if released (Low/Medium/High)
- **Repeat Offense Risk**: Likelihood of committing another crime (Low/Medium/High)

---

## 5. BAIL CONDITIONS (IF GRANTED)
If bail is likely to be granted, specify the probable conditions:
- Monetary surety/bond amount (estimated)
- Regular reporting to police station
- Travel restrictions
- Surrendering passport
- Other specific conditions

---

## 6. LEGAL PRECEDENTS & PROVISIONS
- Cite relevant Supreme Court/High Court precedents on similar cases
- Reference CrPC sections (437, 439) applicable
- Mention landmark judgments if applicable

---

## 7. DETAILED REASONING
Provide a comprehensive paragraph explaining:
- Why the person will/will not get bail based on case specifics
- How the BNS section influences the decision
- Impact of personal circumstances (age, family, employment)
- Weight given to prior convictions and criminal history

---

## 8. ALTERNATIVE REMEDIES
If bail is unlikely:
- Suggest approaching High Court under Section 439 CrPC
- Mention possibility of anticipatory bail
- Other legal recourse available

---

## 9. TIMELINE & PROCESS
- Expected time for bail hearing
- Documents required
- Steps in the bail application process

---

**IMPORTANT**: Base your analysis STRICTLY on Indian law, BNS provisions, and the specific BNS sections provided. Be definitive in your conclusion - the user needs a clear answer on bail eligibility.`;

    
    const geminiResponse = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 4096,
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
    
    
    const suggestion = geminiResponse.data.candidates?.[0]?.content?.parts?.[0]?.text || 
                      'Unable to generate suggestion at this time.';

    return NextResponse.json({
      success: true,
      suggestion,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('AI Suggestion Error:', error);
    

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
