import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const EMAILS_FILE = path.join(process.cwd(), 'emails.json');

function getEmails(): string[] {
    try {
        if (fs.existsSync(EMAILS_FILE)) {
            const data = fs.readFileSync(EMAILS_FILE, 'utf-8');
            return JSON.parse(data);
        }
    } catch {
        // File doesn't exist or is invalid
    }
    return [];
}

function saveEmails(emails: string[]) {
    fs.writeFileSync(EMAILS_FILE, JSON.stringify(emails, null, 2));
}

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json(
                { error: 'Valid email is required' },
                { status: 400 }
            );
        }

        const emails = getEmails();

        // Check for duplicates
        if (emails.includes(email.toLowerCase())) {
            return NextResponse.json(
                { error: 'Email already registered' },
                { status: 400 }
            );
        }

        // Add new email
        emails.push(email.toLowerCase());
        saveEmails(emails);

        console.log(`✅ New waitlist signup: ${email}`);
        console.log(`📊 Total signups: ${emails.length}`);

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
    const emails = getEmails();
    return NextResponse.json({
        count: emails.length,
        emails: emails
    });
}
