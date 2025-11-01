# KDP Creator Suite - Deployment Guide

## Project Overview

This is a fully-featured Next.js landing page for KDP Creator Suite with:
- ✅ SEO-optimized content and metadata
- ✅ Waitlist email capture functionality
- ✅ Contact Us page with email form integration
- ✅ Responsive design with Tailwind CSS
- ✅ Brand colors (Deep Pink #E91E63, Black #000000, Neutral Gray #333333)
- ✅ Custom fonts (Montserrat for headings, Lato for body)
- ✅ Indiegogo campaign countdown timer
- ✅ Navigation bar with dashboard button
- ✅ API routes for email storage and contact forms
- ✅ Schema.org structured data
- ✅ Open Graph and Twitter Card meta tags
- ✅ Sitemap and robots.txt

## Quick Start - Running Locally

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Steps

1. **Extract the Project Archive:**
   ```bash
   tar -xzf kdp-landing-deployment.tar.gz
   cd kdp-landing
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run Development Server:**
   ```bash
   npm run dev
   ```

4. **Open in Browser:**
   Navigate to `http://localhost:3000` to view the landing page.

### What to Test Locally

- **Homepage:** Verify all sections load correctly with proper colors and fonts
- **Email Capture:** Test the waitlist form with valid and invalid emails
- **Contact Form:** Test the contact page form (messages will be logged in development)
- **Countdown Timer:** Verify the Indiegogo campaign countdown displays correctly
- **Navigation:** Test all navigation links and the dashboard button
- **Responsiveness:** Resize browser to test mobile, tablet, and desktop views
- **Contact Page:** Verify the `/contact` page loads and form works

## Deployment to Vercel (Recommended)

Vercel is the official Next.js deployment platform and provides the best experience.

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy from the project directory:**
   ```bash
   cd /path/to/kdp-landing
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? **Yes**
   - Which scope? Select your account
   - Link to existing project? **No**
   - Project name: **kdp-creator-suite** (or your preferred name)
   - Directory: **./** (current directory)
   - Override settings? **No**

5. **Production deployment:**
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via GitHub (Recommended for Updates)

1. **Create a GitHub repository:**
   ```bash
   cd /path/to/kdp-landing
   git init
   git add .
   git commit -m "Initial commit: KDP Creator Suite landing page"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/kdp-landing.git
   git push -u origin main
   ```

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Select "Import Git Repository"
   - Paste your GitHub repository URL
   - Click "Import"
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

3. **Future updates:**
   - Simply push changes to GitHub
   - Vercel automatically deploys on every push to main

## Deployment to Heroku (Alternative)

### Prerequisites
- Heroku account
- Heroku CLI installed

### Steps

1. **Create Procfile:**
   ```bash
   echo "web: npm start" > Procfile
   ```

2. **Update package.json** to include start script (if not present):
   ```json
   "scripts": {
     "start": "next start -p $PORT"
   }
   ```

3. **Deploy:**
   ```bash
   heroku login
   heroku create kdp-creator-suite
   git push heroku main
   ```

## Environment Variables

### For Email Service (Contact Form)

To enable email sending for the contact form, add these environment variables:

**On Vercel:**
1. Go to Project Settings → Environment Variables
2. Add the following:
   - `EMAIL_USER`: Your Gmail address (e.g., contact.kdpcreatorsuite@gmail.com)
   - `EMAIL_PASSWORD`: Your Gmail App Password (not your regular password)

**On Heroku:**
```bash
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_PASSWORD=your-app-password
```

### Gmail App Password Setup

1. Enable 2-Factor Authentication on your Google account
2. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Select "Mail" and "Windows Computer" (or your device)
4. Google will generate a 16-character password
5. Use this password as `EMAIL_PASSWORD`

## Post-Deployment Checklist

### Domain Configuration
- [ ] Add custom domain in Vercel/Heroku dashboard
- [ ] Configure DNS records (A/CNAME)
- [ ] Enable SSL certificate (automatic on Vercel)
- [ ] Update `metadataBase` in `app/layout.tsx` to your domain
- [ ] Update sitemap.xml with your domain
- [ ] Update vercel.json with your domain

### SEO Configuration
- [ ] Add Google Search Console verification code
- [ ] Submit sitemap to Google Search Console: `https://www.kdpsuite.com/sitemap.xml`
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Add Google Analytics tracking code (optional)
- [ ] Verify robots.txt is accessible at `/robots.txt`

### Email Configuration
- [ ] Set up Gmail App Password for contact form
- [ ] Add `EMAIL_USER` and `EMAIL_PASSWORD` environment variables
- [ ] Test contact form by sending a test message
- [ ] Verify emails are being received at contact.kdpcreatorsuite@gmail.com

### Analytics & Monitoring
- [ ] Set up Google Analytics or Plausible
- [ ] Configure error tracking (Sentry)
- [ ] Set up uptime monitoring

## Database Migration (For Production)

Currently, the waitlist uses file-based storage. For production, consider upgrading:

### Option 1: Vercel KV (Recommended for Vercel)

1. Enable Vercel KV in your project dashboard
2. Update `app/api/waitlist/route.ts` to use Vercel KV:

```typescript
import { kv } from '@vercel/kv';

export async function POST(request: NextRequest) {
  const { email } = await request.json();
  
  const exists = await kv.sismember('waitlist:emails', email);
  if (exists) {
    return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
  }
  
  await kv.sadd('waitlist:emails', email);
  await kv.hset(`waitlist:entry:${email}`, {
    email,
    created_at: new Date().toISOString(),
  });
  
  return NextResponse.json({ success: true });
}
```

### Option 2: Supabase (Free tier available)

1. Create account at [supabase.com](https://supabase.com)
2. Create a new project
3. Create a `waitlist` table with columns: `id`, `email`, `created_at`
4. Add `SUPABASE_URL` and `SUPABASE_KEY` to environment variables
5. Update API route to use Supabase client

## Testing

Before going live:

```bash
# Run locally
npm run dev

# Test waitlist submission
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Test contact form submission
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test User",
    "email":"test@example.com",
    "subject":"Test",
    "message":"Test message"
  }'

# Build for production
npm run build

# Start production server
npm start
```

## Performance Optimization

The site is already optimized with:
- Static page generation for fast loading
- Tailwind CSS for minimal CSS bundle
- Next.js Image optimization
- Proper caching headers
- Code splitting and lazy loading
- Optimized fonts (Montserrat and Lato)

## 🎨 Customization Tips

### Change Colors to Match Branding

The site uses brand colors defined in `tailwind.config.ts`:
- Primary: `#E91E63` (Deep Pink)
- Secondary: `#000000` (Black)
- Neutral: `#333333` (Neutral Gray)

To change colors:

1. **Edit `tailwind.config.ts`:**
   ```typescript
   colors: {
     primary: '#YourPrimaryHexCode',
     secondary: '#YourSecondaryHexCode',
     neutral: '#YourNeutralHexCode',
   }
   ```

2. **Update `app/globals.css`:**
   ```css
   :root {
     --primary: #YourPrimaryHexCode;
     --secondary: #YourSecondaryHexCode;
     --neutral: #YourNeutralHexCode;
   }
   ```

3. **Rebuild:**
   ```bash
   npm run build
   ```

### Change Fonts

The site uses:
- **Headings:** Montserrat (font-heading)
- **Body:** Lato (font-body)

To change fonts:

1. **Edit `app/layout.tsx`:**
   ```typescript
   import { YourHeadingFont, YourBodyFont } from "next/font/google";
   
   const headingFont = YourHeadingFont({...});
   const bodyFont = YourBodyFont({...});
   ```

2. **Update Tailwind config:**
   ```typescript
   fontFamily: {
     heading: ["YourHeadingFont", "sans-serif"],
     body: ["YourBodyFont", "sans-serif"],
   }
   ```

### Update Domain References

After deploying to your custom domain, update:

1. **`app/layout.tsx`:**
   ```typescript
   metadataBase: new URL('https://www.kdpsuite.com'),
   ```

2. **`public/sitemap.xml`:**
   ```xml
   <loc>https://www.kdpsuite.com/</loc>
   ```

3. **`public/robots.txt`:**
   ```
   Sitemap: https://www.kdpsuite.com/sitemap.xml
   ```

### Add Logo

1. Add logo image to `/public/your-logo.png`
2. Update navigation in `app/page.tsx`:
   ```tsx
   <Image src="/your-logo.png" alt="Logo" width={200} height={50} />
   ```

### Add Images

1. Add images to `/public/` folder
2. Use Next.js Image component:
   ```tsx
   <Image src="/image.png" alt="Description" width={600} height={400} />
   ```

## Troubleshooting

### Build Errors

If you encounter build errors:
1. Delete `node_modules` and `.next` folders
2. Run `npm install` again
3. Run `npm run build`

### Email Not Sending

1. Verify `EMAIL_USER` and `EMAIL_PASSWORD` are set correctly
2. Check that Gmail App Password is being used (not regular password)
3. Verify 2FA is enabled on Gmail account
4. Check Vercel/Heroku logs for error messages

### Countdown Timer Not Updating

The countdown is set for November 17, 2025 (3 weeks from October 27, 2025). If you need to change this:

Edit `app/page.tsx` and update the launch date:
```typescript
const launchDate = new Date('YOUR_DATE_HERE').getTime();
```

## Support

For issues or questions:
- Check Next.js documentation: https://nextjs.org/docs
- Check Vercel documentation: https://vercel.com/docs
- Review the project code and comments
- Check browser console for error messages

## Project Structure

```
kdp-landing/
├── app/
│   ├── api/
│   │   ├── contact/
│   │   │   └── route.ts          # Contact form API
│   │   └── waitlist/
│   │       └── route.ts          # Waitlist API
│   ├── contact/
│   │   └── page.tsx              # Contact Us page
│   ├── layout.tsx                # Root layout with SEO metadata
│   ├── page.tsx                  # Homepage
│   └── globals.css               # Global styles
├── public/
│   ├── kdpsuitelogo.png          # KDP Creator Suite logo
│   ├── unlovedproductions_logo.png # Parent company logo
│   ├── robots.txt                # Search engine instructions
│   └── sitemap.xml               # Site structure for SEO
├── tailwind.config.ts            # Tailwind CSS configuration
├── next.config.ts                # Next.js configuration
├── vercel.json                   # Vercel deployment config
└── package.json                  # Dependencies

```

## License

© 2025 KDP Creator Suite. All rights reserved.

