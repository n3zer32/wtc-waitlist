# WillThey.Click Waitlist

Standalone waitlist page for willthey.click

## Setup

```bash
npm install
npm run dev
```

## Deploy to Vercel

1. Push this folder to a separate GitHub repo (or subfolder deploy)
2. Connect to Vercel
3. Deploy!

## View Signups

- **Locally:** Check `emails.json` file
- **API:** `GET /api/waitlist` returns all emails

## Upgrade to Resend (Optional)

To send confirmation emails, add Resend:

1. `npm install resend`
2. Get API key from [resend.com](https://resend.com)
3. Update `/api/waitlist/route.ts` to send emails
