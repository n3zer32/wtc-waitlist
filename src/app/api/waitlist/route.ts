import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

const EMAILS_KEY = 'waitlist_emails';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json(
                { error: 'Valid email is required' },
                { status: 400 }
            );
        }

        const normalizedEmail = email.toLowerCase().trim();

        // Get existing emails
        let emails: string[] = [];
        try {
            emails = await kv.get(EMAILS_KEY) || [];
        } catch {
            emails = [];
        }

        // Check for duplicates
        if (emails.includes(normalizedEmail)) {
            return NextResponse.json(
                { error: 'Email already registered' },
                { status: 400 }
            );
        }

        // Add new email
        emails.push(normalizedEmail);
        await kv.set(EMAILS_KEY, emails);

        console.log(`✅ New signup: ${normalizedEmail} (Total: ${emails.length})`);

        return NextResponse.json({
            success: true,
            message: 'Successfully joined waitlist!'
        });
    } catch (error) {
        console.error('Waitlist error:', error);
        return NextResponse.json(
            { error: 'Failed to join waitlist. Please try again.' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const emails: string[] = await kv.get(EMAILS_KEY) || [];
        return NextResponse.json({
            count: emails.length,
            emails: emails
        });
    } catch (error) {
        console.error('KV Error:', error);
        return NextResponse.json({
            count: 0,
            emails: [],
            error: 'KV not connected'
        });
    }
}
