# GoatCounter Setup for Thumbs Up Counter

## Overview
This implementation uses GoatCounter to track thumbs up events in a privacy-friendly way. GoatCounter is an open-source, lightweight analytics solution that doesn't track personal data.

## What's Implemented

### 1. Analytics Tracking
- Each thumbs up click sends a custom event to GoatCounter
- Page views are tracked automatically by GoatCounter
- All tracking is privacy-focused (no cookies, no personal data)

### 2. Display Counter
- Uses a combination of localStorage and a base count for display
- Starts with a base count (42) to make the counter look more established
- Increments locally for immediate feedback

### 3. User Experience
- Prevents multiple likes from the same browser session
- Provides visual feedback with animations
- Shows thank you message after liking

## GoatCounter Dashboard

To view the data:

1. **Sign up for GoatCounter**: Go to https://www.goatcounter.com
2. **Create your site**: Choose a subdomain like `marvils.goatcounter.com`
3. **Update the script**: Replace `marvils` in the HTML with your chosen subdomain
4. **View events**: In your dashboard, you'll see:
   - `thumbs-up-click` events (each represents a like)
   - Regular page views
   - Visitor counts and trends

## Getting Real Count (Optional Enhancement)

For a production website, you might want to display the actual count from GoatCounter:

### Option 1: GoatCounter API
```javascript
// This would require a backend service to fetch from GoatCounter API
// GoatCounter has a free API for retrieving stats
fetch('/api/thumbs-count')
  .then(response => response.json())
  .then(data => {
    document.getElementById('thumbs-count').textContent = data.count;
  });
```

### Option 2: Database Backend
- Set up a simple backend (Node.js, Python Flask, etc.)
- Store thumbs up counts in a database
- Sync with GoatCounter events using webhooks or API polling

### Option 3: Static Site Generator
- Use GitHub Actions or similar CI/CD
- Periodically fetch GoatCounter data using their API
- Update a JSON file that the frontend reads

## Benefits of This Approach

1. **Privacy-First**: No tracking of personal information
2. **GDPR Compliant**: GoatCounter is GDPR compliant by design
3. **Lightweight**: Minimal impact on page load times (smaller than Google Analytics)
4. **Real Analytics**: Get insights into user engagement
5. **No Server Required**: Works with static sites
6. **Open Source**: GoatCounter is completely open source

## Customization

You can customize the events by modifying the `goatcounter.count()` calls in `script.js`:

```javascript
// Track different types of interactions
goatcounter.count({
    path: 'thumbs-up-click',
    title: 'Thumbs Up Click',
    event: true
});

goatcounter.count({
    path: 'social-link-click-linkedin',
    title: 'LinkedIn Link Click',
    event: true
});

goatcounter.count({
    path: 'research-page-visit',
    title: 'Research Page Visit',
    event: true
});
```

## Cost

- GoatCounter is **completely free** for personal and non-commercial use
- No limits on page views or events for personal sites
- Commercial use requires a paid plan starting at €15/month
- Self-hosting is also available (it's open source)
