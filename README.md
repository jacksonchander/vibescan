# VibeScan

VibeScan is a demo client-only web app that simulates a "Universal Social Score" experience.

Features
- 1-day free trial (24 hours) with all premium features unlocked during trial
- AI-like score engine and subscores
- Mood tracker, personality evolution, chatbot, community wall, trends, leaderboard
- Shareable image generator
- Client-side subscription simulation (stored in `localStorage`)

How the free trial works
- When you sign up, the trial start time is saved in `localStorage` and lasts 24 hours.
- During the trial, all premium features are available.
- After 24 hours, if you are not subscribed, the app redirects to `paywall.html` and locks features.

Subscription
- Subscriptions are simulated and stored in `localStorage` by the `VibeScanUser` class in `main.js`.

Deploying on GitHub Pages
1. Push the repository to GitHub.
2. In the repository settings, enable GitHub Pages and select the `main` branch and `/ (root)` folder.
3. Optionally add a `CNAME` file for a custom domain and update DNS.

Files
- `index.html` — landing page
- `signup.html`, `login.html` — auth flows (client-only)
- `dashboard.html` — main app dashboard (requires trial or subscription)
- `paywall.html` — paywall shown after trial expiry
- `*.js` — feature modules (mood-tracker, leaderboard, chatbot, etc.)
- `style.css` — app styles

Troubleshooting
- If you are redirected to the paywall unexpectedly, check `localStorage` for `vibeScanUser`.
- To reset the demo, open browser DevTools and run `localStorage.clear()` then reload.

Important notes
- This is a demo app and stores all data in the user's browser. No server or real payment processing is included.
- Replace sandbox PayPal/Stripe placeholders with real integration and server-side verification for production use.
# VibeScan - Universal Social Score Platform

A fully functional, modern website that calculates and displays your universal social score across all platforms using AI simulation. VibeScan helps users discover their social personality type, receive daily improvement tips, and share their scores on social media.

## 🚀 Features

### Landing Page
- Modern, responsive hero section with clear value proposition
- Features showcase highlighting AI multi-platform scoring
- Flexible pricing plans (Monthly $4.99, Quarterly $12.99, Yearly $39.99)
- Prominent call-to-action buttons for free trial signup
- Clear non-refundable subscription warning
- Professional navigation and footer

### User Dashboard
- **Universal Social Score** (out of 100) with animated circular display
- **Sub-Metrics**: Confidence, Friendliness, Trust, Professionalism, Red-Flag Index, Engagement
- **Personality Type** randomly generated with personalized descriptions
- **Daily AI Tips** - 5 rotating improvement suggestions
- **Achievement Badges** - 8 different badges based on score thresholds
- **Global Leaderboard** - See how you rank against other users
- **Score History** - Track improvements over time with visual chart
- **Social Sharing** - Download score graphics or share on Facebook, Instagram, Twitter, TikTok

### Technical Features
- **AI Score Simulation** - Realistic, randomized scores that update on each refresh
- **Free 1-Day Trial** - Full dashboard access without payment
- **Subscription Management** - Monthly, quarterly, and yearly plans
- **Data Persistence** - localStorage saves user data and scores
- **Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- **Modern Animations** - Smooth transitions and interactive elements

## 📁 File Structure

```
vibescan/
├── index.html          # Landing page
├── dashboard.html      # User dashboard
├── style.css           # All styling (responsive design)
├── main.js             # Subscription & trial logic
├── dashboard.js        # AI simulation & dashboard functionality
└── README.md           # This file
```

## 🎨 Design Highlights

- **Color Scheme**: Modern gradient (Cyan #00d4ff → Purple #8338ec → Pink #ff006e)
- **Dark Mode**: Easy on the eyes with professional appearance
- **Responsive**: Mobile-first approach with breakpoints at 1024px, 768px, and 480px
- **Animations**: Smooth pulse effects, fade-in animations, and hover transitions
- **Typography**: Clean sans-serif fonts for maximum readability

## 🔧 How It Works

### Trial System
1. User enters email and clicks "Start Free Trial"
2. Trial duration: 24 hours (stored in localStorage)
3. Access to full dashboard for one day
4. After expiration, user must subscribe

### Subscription Plans
- **Monthly**: $4.99/month - Best for testing the platform
- **Quarterly**: $12.99/3 months - 13% savings
- **Yearly**: $39.99/year - 33% savings
- All subscriptions are non-refundable (clearly warned)

### Score Generation
- Scores are generated randomly but realistically
- Ranges: Typically 60-95 for positive metrics
- Red-Flag Index: Lower is better (5-30)
- Main score calculated from average of positive metrics minus red-flag penalty
- Scores persist in localStorage but regenerate on refresh

### Personality Types
8 different personality types randomly assigned:
- The Influencer
- The Visionary
- The Connector
- The Authentic
- The Leader
- The Empath
- The Achiever
- The Innovator

### Gamification
- 8 achievement badges with unlock conditions
- Global leaderboard (simulated with real user ranking)
- Score history tracking
- Improvement tracking

## 📱 Responsive Breakpoints

- **Desktop**: Full layout (1024px+)
- **Tablet**: 2-column grid adjustments (768px-1023px)
- **Mobile**: Single column, optimized touch targets (480px-767px)
- **Small Mobile**: Minimal, focused layout (<480px)

## 🌐 Deployment on GitHub Pages

### Prerequisites
- GitHub account
- Git installed locally

### Step-by-Step Instructions

1. **Create a GitHub Repository**
   - Go to https://github.com/new
   - Repository name: `vibescan` (or any name you prefer)
   - Make sure it's public
   - Click "Create repository"

2. **Clone the Repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/vibescan.git
   cd vibescan
   ```

3. **Add Your Files**
   - Copy all files (index.html, dashboard.html, style.css, main.js, dashboard.js, README.md) into the repository folder

4. **Commit and Push**
   ```bash
   git add .
   git commit -m "Initial commit: VibeScan website"
   git push origin main
   ```

5. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click "Settings" (top right)
   - Scroll to "GitHub Pages" section
   - Under "Source", select "main" branch
   - Click "Save"
   - Your site will be available at: `https://YOUR_USERNAME.github.io/vibescan/`

6. **Verify Deployment**
   - Wait 1-2 minutes
   - Visit your URL to see the live site
   - All features should work immediately

### Custom Domain (Optional)
To use a custom domain:
1. In GitHub Pages settings, add your custom domain
2. Update your domain registrar's DNS records as instructed by GitHub
3. GitHub will auto-generate an SSL certificate for HTTPS

## 🎮 Using the Website

### For Users
1. Visit the landing page
2. Click "Start Free Trial" button
3. Enter your email address
4. Access the dashboard immediately
5. View your social score and personality type
6. Get daily improvement tips
7. Share your score on social media
8. Check the leaderboard to compare with others

### For Developers
- All code is self-contained and client-side
- No backend server required
- Data stored in browser localStorage
- Easy to customize colors in CSS variables
- Easy to modify score ranges or personality types
- Ready to integrate with payment APIs (Stripe, PayPal, etc.)

## 🛠️ Customization

### Change Colors
Edit the CSS variables at the top of `style.css`:
```css
:root {
    --primary-color: #00d4ff;
    --secondary-color: #ff006e;
    --accent-color: #8338ec;
    /* etc. */
}
```

### Adjust Score Ranges
In `dashboard.js`, modify the `generateRealisticScores()` function:
```javascript
const generateScore = (min = 60, max = 95) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
```

### Add More Personality Types
Edit the `PERSONALITY_TYPES` array in `dashboard.js`

### Modify Pricing
Update the price and plan details in `index.html` pricing section

## 📊 Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

## 🔒 Data Privacy

- All data stored locally in user's browser
- No server communication or data collection
- Users can clear data by clearing browser localStorage
- Perfect for GDPR compliance

## 💡 Future Enhancements

- Backend API integration for real data storage
- Payment processing with Stripe/PayPal
- User authentication system
- Real social media API integration
- Email notifications for trial expiration
- Referral program
- Premium features based on subscription tier

## 📝 License

This project is open source and ready for commercial use.

## 🤝 Support

For issues or suggestions, you can:
1. Check the code comments
2. Modify the JavaScript files as needed
3. Test in browser DevTools console

## 🚀 Quick Start Summary

```bash
# 1. Clone repository
git clone https://github.com/YOUR_USERNAME/vibescan.git
cd vibescan

# 2. Open in browser (no build required!)
# Simply open index.html in your browser or use a local server:
python3 -m http.server 8000
# Then visit: http://localhost:8000

# 3. Deploy to GitHub Pages
git add .
git commit -m "Deploy VibeScan"
git push origin main
# Site available at: https://YOUR_USERNAME.github.io/vibescan/
```

---

**VibeScan** - Discover Your Universal Social Score

Built with ❤️ for modern web experiences