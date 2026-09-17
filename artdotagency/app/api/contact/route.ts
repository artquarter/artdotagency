import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const API_KEY = process.env.HUBSPOT_API_KEY;
    
    if (API_KEY) {
      const crmResponse = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          properties: {
            firstname: data.name,
            company: data.organisation,
            email: data.email,
            message: data.goals,
          }
        })
      });

      if (!crmResponse.ok) {
        console.error('HubSpot API error:', await crmResponse.text());
      }
    } else {
      console.log('No HubSpot API key provided, logging submission:', data);
    }

    return NextResponse.json({ success: true }, { status: 200 });
    
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

