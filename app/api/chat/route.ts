import { NextResponse } from 'next/server';

// Janam: Maternal health assistant system prompt
const SYSTEM_PROMPT = `You are Janam, a warm, knowledgeable, and supportive assistant specializing in maternal health, pregnancy, childbirth, newborn care, and women's wellness in India. Your goal is to provide clear, practical, and culturally sensitive information to mothers, families, and community health workers.

When users ask questions, you can help with:
- Pregnancy care, nutrition, and warning signs
- Safe delivery practices and birth preparation
- Postnatal care for mother and baby
- Breastfeeding, newborn care, and immunizations
- Kangaroo care and low-birth-weight baby support
- Common maternal and infant health issues
- Family planning and reproductive health
- Government schemes and entitlements for mothers (Janani Suraksha Yojana, PMMVY, etc.)
- When to seek medical help and how to access local resources

Always use simple, friendly language. If the user prefers Hindi, respond in Hindi. Encourage users to consult a qualified doctor or midwife for urgent or personal medical concerns. Never give a diagnosis or replace professional medical advice.`;

// OpenAI API Key Manager - Server-side version
class OpenAIManager {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || '';
    this.baseUrl = 'https://api.openai.com/v1/chat/completions';
  }

  async createCompletion(messages: any[], options: any = {}): Promise<any> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages,
          max_tokens: 900,
          temperature: 0.4,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`API Error ${response.status}: ${JSON.stringify(errorData)}`);
      }

      return await response.json();
    } catch (error: any) {
      throw error;
    }
  }

  hasApiKeys(): boolean {
    return Boolean(this.apiKey);
  }

  getApiKeyCount(): number {
    return this.apiKey ? 1 : 0;
  }
}

const openaiManager = new OpenAIManager();

export async function POST(req: Request) {
  let language = 'en';

  try {
    const { message, language: reqLanguage } = await req.json();
    language = reqLanguage || 'en';

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message format' },
        { status: 400 }
      );
    }

    if (!openaiManager.hasApiKeys()) {
      return NextResponse.json(
        {
          error: "Service configuration error. Please contact support.",
          timestamp: new Date().toISOString()
        },
        { status: 503 }
      );
    }

    const messages = [
      {
        role: 'system',
        content: `${SYSTEM_PROMPT} ${language !== 'en' ? `Respond in ${getLanguageName(language)}.` : ''}`
      },
      {
        role: 'user',
        content: message
      }
    ];

    const data = await openaiManager.createCompletion(messages);

    const aiResponse = data.choices[0]?.message?.content;

    if (!aiResponse) {
      return NextResponse.json(
        { error: 'Failed to generate response' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      response: aiResponse,
      timestamp: new Date().toISOString(),
      apiKeysAvailable: openaiManager.getApiKeyCount()
    });

  } catch (error: any) {
    let errorMessage = "I'm having trouble processing your request. Please try again later.";
    let statusCode = 500;

    if (typeof error.message === 'string') {
      if (error.message.includes('rate limited')) {
        errorMessage = "Our service is experiencing high demand. Please try again shortly.";
        statusCode = 429;
      } else if (error.message.includes('quota exceeded')) {
        errorMessage = "Service temporarily unavailable due to usage limits. Please try again later.";
        statusCode = 503;
      } else if (error.message.includes('insufficient_quota')) {
        errorMessage = "API quota exceeded. Please check your OpenAI billing.";
        statusCode = 503;
      }
    }

    return NextResponse.json(
      {
        error: errorMessage,
        timestamp: new Date().toISOString(),
        debug: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: statusCode }
    );
  }
}

function getLanguageName(code: string): string {
  const languages: Record<string, string> = {
    'hi': 'Hindi',
  };
  return languages[code] || 'English';
}