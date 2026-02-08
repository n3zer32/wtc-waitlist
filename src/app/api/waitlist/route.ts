import { NextResponse } from 'next/server';

// In-memory storage for development/fallback
// Note: This resets on each deployment - use Vercel KV for persistence
const memoryEmails: string[] = [];

async function getKV() {
    try {
        const { kv } = await import('@vercel/kv');
        // Test if KV is configured
        await kv.ping();
        return kv;
    } catch {
        return null;
    }
}

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
        const kv = await getKV();

        if (kv) {
            // Use Vercel KV
            const emails: string[] = await kv.get(EMAILS_KEY) || [];

            if (emails.includes(normalizedEmail)) {
                return NextResponse.json(
                    { error: 'Email already registered' },
                    { status: 400 }
                );
            }

            emails.push(normalizedEmail);
            await kv.set(EMAILS_KEY, emails);

            console.log(`✅ [KV] New signup: ${normalizedEmail} (Total: ${emails.length})`);
        } else {
            // Fallback to memory (for testing)
            if (memoryEmails.includes(normalizedEmail)) {
                return NextResponse.json(
                    { error: 'Email already registered' },
                    { status: 400 }
                );
            }

            memoryEmails.push(normalizedEmail);
            console.log(`✅ [Memory] New signup: ${normalizedEmail} (Total: ${memoryEmails.length})`);
        }

        return NextResponse.json({
            success: true,
            message: 'Successfully joined waitlist!'
        });
    } catch (error) {
        console.error('Waitlist error:', error);
        return NextResponse.json(
            { error: 'Failed to join waitlist' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const kv = await getKV();

        if (kv) {
            const emails: string[] = await kv.get(EMAILS_KEY) || [];
            return NextResponse.json({
                storage: 'kv',
                count: emails.length,
                emails: emails
            });
        } else {
            return NextResponse.json({
                storage: 'memory',
                count: memoryEmails.length,
                emails: memoryEmails,
                warning: 'KV not configured - emails will reset on redeploy'
            });
        }
    } catch (error) {
        return NextResponse.json({
            count: 0,
            emails: [],
            error: String(error)
        });
    }
}
