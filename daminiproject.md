daminishukla.com  —  Full Technical Specification
Website Build Workflow · Prepared for IT Developer
Document Version: June 2025  |  Client: Damini Shukla  |  Ref: DS-WEB-001

1.  Project Overview
daminishukla.com is a personal brand hub for Damini Shukla — content creator and professional Vedic astrologer. The site is a single-domain property that presents two completely distinct identities to the visitor, each with its own page, colour palette, and purpose. The project requires three front-end pages, a lightweight back-end, and a simple admin panel.
Domain:  daminishukla.com

Pages at a Glance
Item	Detail
index.html	Landing / split-screen selector  —  no scroll, full viewport
creator.html	Content Creator profile page
astro.html	Astrologer overview → redirects all CTAs to dsastrology.com


2.  Page 1 — Index / Landing  (index.html)
Full-viewport split screen. Left column = Creator. Right column = Astrologer. No scrolling on this page — it must fill the browser window exactly. Each column occupies 50 % width on desktop; stacks vertically (50 % height each) on mobile.
Left Column — Creator
Item	Detail
Background	Damini's photo as content creator — warm, vibrant energy
Overlay text	Name + 'Content Creator · Digital Influencer'
CTA button	Explore  →  links to creator.html
Hover effect	Column expands to 58 % width; opposite shrinks to 42 %
Colour mood	Warm: coral #FF4D2E / amber #FF9A2E on dark background

Right Column — Astrologer
Item	Detail
Background	Damini's avatar / portrait as astrologer — cosmic, deep
Overlay text	Name + 'Vedic Astrologer · Astro Teacher'
CTA button	Explore  →  links to astro.html
Hover effect	Column expands to 58 % width; opposite shrinks to 42 %
Colour mood	Deep: purple #9B7FEA / gold #D4A843 on near-black background

Centre divider:  Thin luminous vertical line with a pulsing orb and the initials 'DS'. No navigation bar needed on this page.


3.  Page 2 — Content Creator  (creator.html)
3.1  Hero Section
Full-width banner. Background = image uploaded via admin panel (changeable). Overlay: Damini's name, role label, one-line tagline. Three buttons side-by-side: Instagram (opens in new tab), YouTube (opens in new tab), Brand Enquiry (scrolls to enquiry form).
3.2  Stats Strip
Item	Detail
Combined Followers	Editable figure — hardcoded initially, update manually
Brand Collaborations	Editable figure
TV Appearances	Editable figure

3.3  Achievements Grid
Six cards in a responsive grid. Each card: icon, title, short description. Content: TV Show Feature · Brand Partnerships · Viral Reels · Community Builder · Industry Recognition · Events & Appearances.
3.4  TV Feature Block
Two-column layout. Left: badge 'As Seen on TV', headline, description, CTA button linking to YouTube. Right: YouTube embed (paste embed URL, or placeholder image). Replace placeholder src with actual video embed URL before launch.
3.5  Social Platform Cards
Item	Detail
Instagram card	Links to @daminishukla — update handle before launch
YouTube card	Links to channel — update URL before launch
Live feed	Meta / YouTube API optional — see Section 6

3.6  Enquiry Form
Fields required:
Item	Detail
Full Name	Text input — required
Email Address	Email input — required
Phone Number	Tel input — optional
Enquiry Type	Dropdown: Brand Promotion / Sponsored Reels / YouTube Integration / Event / Show or TV / Product Gifting / Other
Message	Textarea — required
Submit button	Triggers two actions simultaneously: email + database save

Email trigger:  On every form submission → send email to AAPKIDAMINI@GMAIL.COM
Subject line (exact): Daminishukla.com website query
Body: all form fields formatted clearly.

Database save:  Simultaneously write submission to database (see Section 5 — Backend). Both email AND database write must happen; one does not replace the other.


4.  Page 3 — Astrologer  (astro.html)
This page is a showcase / bridge page. Its sole conversion goal is to send the visitor to dsastrology.com. Every single clickable element on this page must link to https://dsastrology.com — no exceptions. Do not add any contact form or enquiry capture here.
4.1  Hero Section
Full-width banner. Background = image uploaded via admin panel (changeable). Cosmic / deep purple colour scheme. Floating zodiac glyph animation. Headline, tagline, two CTA buttons — both link to dsastrology.com.
4.2  Career Milestone Dials / Stats
Animated circular progress dials or number counters. Suggested metrics:
Item	Detail
1000+ Readings	Lifetime personal consultations
5+ Years Experience	In Vedic astrology practice
500+ Students Trained	Via astro teaching and courses
Top Platforms	Astrotalk and other major portals

Each dial, when clicked, links to dsastrology.com.
4.3  'How Astrology Helps You' Section
3–4 benefit blocks covering themes such as: Career Clarity · Relationship Guidance · Life Purpose · Business Timing. Each block has an icon, a short headline, and 2–3 lines of copy. Each block links to dsastrology.com.
4.4  Services Preview
Cards for: Birth Chart Reading · Predictive Astrology · Kundali Milan · Astro Courses. Each card CTA links to dsastrology.com.
4.5  Credentials Strip
Rows: Astrotalk (verified) · Corporate Workshops · Certified Educator · Media/TV · 1000+ Consultations. Clicking any row opens dsastrology.com.
4.6  Final CTA Block
RULE:  Every button, card, link, dial, and icon on astro.html must href to https://dsastrology.com — either in the same tab or a new tab (recommend new tab with target='_blank' rel='noopener').


5.  Backend Architecture
5.1  Technology Stack (Recommended)
Item	Detail
Runtime	Node.js with Express  OR  Python with FastAPI / Flask — dev's choice
Database	PostgreSQL (preferred) or MySQL — hosted on same server or PlanetScale / Supabase free tier
Email service	Gmail SMTP via Nodemailer (Node) or smtplib (Python) — use App Password for AAPKIDAMINI@GMAIL.COM
File storage	Local disk or AWS S3 / Cloudflare R2 for banner image uploads
Hosting	VPS (DigitalOcean / Hostinger) OR shared cPanel with Node/Python support
HTTPS	Mandatory — free via Let's Encrypt / Certbot

5.2  Database — Queries Table
Single table: enquiries
Item	Detail
id	Auto-increment primary key
created_at	TIMESTAMP — auto-set on insert
full_name	VARCHAR(255)
email	VARCHAR(255)
phone	VARCHAR(30) — nullable
enquiry_type	VARCHAR(100)
message	TEXT

5.3  Database — Banner Images Table
Single table: banners  (only two rows ever — one per page)
Item	Detail
id	1 = creator, 2 = astrologer — fixed
page	ENUM('creator','astrologer')
image_url	VARCHAR(512) — path or CDN URL
updated_at	TIMESTAMP

5.4  API Endpoints
Item	Detail
POST  /api/enquiry	Accepts form data, saves to DB, triggers email
GET   /api/banner/:page	Returns current banner image URL for 'creator' or 'astrologer'
POST  /api/admin/banner/:page	Authenticated — upload new banner image (multipart/form-data)
GET   /api/admin/queries/export	Authenticated — returns XLS file of enquiries filtered by date

Email config:  To:      AAPKIDAMINI@GMAIL.COM
Subject: Daminishukla.com website query
Method:  Gmail SMTP with App Password (Settings → Security → App Passwords). Do NOT use the main Gmail password — generate a 16-char app password.


6.  Live Social Feed Integration  (Optional — Phased)
This feature pulls the latest content from Instagram, YouTube, and Facebook automatically so the website always shows fresh content without manual updates.
YouTube — Easiest, Completely Free
Item	Detail
API	YouTube Data API v3 — free, 10,000 units/day quota
What to show	Latest 3 videos: thumbnail, title, duration, view count
Cost	₹0 — Google Cloud free tier covers this easily
Setup time	2–3 hours — just a Google Cloud API key
Show on	creator.html (mandatory for this feature)

Instagram — Feasible via Meta Graph API
Item	Detail
API	Instagram Graph API (requires Facebook Developer account)
What to show	Latest 3–6 posts: image/reel thumbnail, caption excerpt, likes
Cost	₹0 API cost — one-time 2–4 hour Meta App setup
Limitation	Token must be refreshed every 60 days — automate with a cron job
Setup time	4–6 hours including Meta App verification
Show on	creator.html · astro.html (astro side shows latest astro reels)

Facebook — Simple Embed Option
Item	Detail
Option A	Facebook Page Plugin embed — paste one script tag, zero maintenance
Option B	Graph API — same setup as Instagram (they share the same app)
Cost	₹0
Show on	Optional — either page

Recommendation:  Phase 1 (Launch): YouTube API only — fastest, zero cost, zero maintenance.
Phase 2 (Month 2): Add Instagram Graph API once the site is stable.
Facebook embed can be added anytime with a single script paste.


7.  Admin Panel  (/admin)
Simple password-protected web page — no CMS, no WordPress, no external service needed. Single HTML + backend route. Access via daminishukla.com/admin
7.1  Login
Username + Password fields. Session-based auth (express-session or Flask session). No public registration — credentials set in .env file.
7.2  Feature: Change Creator Banner
File upload input. Accepts JPG, PNG, WebP. On save → uploads file → updates banners table row id=1 → creator.html banner changes immediately. Show current banner as preview before uploading.
7.3  Feature: Change Astrologer Banner
Same as above but updates row id=2. astro.html banner changes immediately.
7.4  Feature: Download Enquiries (XLS)
Item	Detail
Filter	Date From and Date To — both optional (blank = all records)
Export button	Generates and downloads .xlsx file instantly
Columns	ID | Date & Time | Name | Email | Phone | Enquiry Type | Message
Library	Node: exceljs   OR   Python: openpyxl
Nothing else	No edit, no delete, no other filters — keep it minimal

Security note:  Admin panel must be behind session auth. Never expose the /api/admin/* routes without checking the session. Add rate limiting on the login endpoint (max 5 attempts / 15 min).


8.  Deployment Checklist
Item	Detail
Domain	Point daminishukla.com A record to server IP — TTL 300
HTTPS	Install SSL via Certbot (Let's Encrypt) — free
Environment file	.env on server only — never commit to Git — contains DB credentials, email password, admin password
Database	Run migration / CREATE TABLE scripts in production
Email test	Submit one test enquiry and verify email arrives at AAPKIDAMINI@GMAIL.COM
Mobile test	Check all three pages on iOS Safari and Android Chrome
Social API keys	Add YouTube API key to .env if implementing Phase 1
Banner images	Upload initial creator and astrologer banners via admin panel
Astro redirect	Click every element on astro.html and confirm dsastrology.com opens
Form validation	Test empty submissions, invalid emails — ensure correct error messages
XLS export	Download a test export and verify columns match spec


9.  Estimated Effort
Item	Detail
Front-end (3 pages)	2–3 days
Back-end API + DB	1–2 days
Email integration	2–4 hours
Admin panel	1 day
YouTube API (Phase 1)	2–3 hours
Instagram API (Phase 2)	4–6 hours
Testing + deployment	1 day
TOTAL	Approx. 6–9 working days for full build including Phase 1 social feed

Note to IT developer:  Front-end HTML/CSS/JS files (index.html, creator.html, astro.html) are already designed and available. The developer's primary task is: (1) wire the enquiry form to backend, (2) build the API and DB, (3) build the admin panel, (4) handle banner image serving dynamically, and (5) optionally integrate YouTube API. All design decisions are already made — do not redesign.


10.  Handoff Notes
Item	Detail
Client contact email	AAPKIDAMINI@GMAIL.COM
Enquiry email subject	Daminishukla.com website query  (exact — do not change)
Astrology website	https://dsastrology.com  (all astro page links point here)
Front-end files	index.html · creator.html · astro.html  — provided separately
Admin path	/admin  — password protected
Repo	Private Git repo recommended — share access with client

