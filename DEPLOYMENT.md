# 🚀 Deployment Guide

## Green Supply Chain Tracker - Production Deployment

This guide will help you deploy the Angular 18 application to various hosting platforms.

---

## 📋 Pre-Deployment Checklist

- [ ] All features tested and working
- [ ] No console errors or warnings
- [ ] Responsive design verified on multiple devices
- [ ] All forms validated properly
- [ ] Charts rendering correctly
- [ ] Maps loading successfully
- [ ] QR codes generating properly
- [ ] Navigation working on all routes
- [ ] Loading states implemented
- [ ] Error handling in place

---

## 🏗️ Build for Production

### 1. Install Dependencies
```bash
cd sustainable-ai-dashboard
npm install
```

### 2. Build the Application
```bash
npm run build
# or
ng build --configuration production
```

This creates an optimized build in the `dist/` directory.

### 3. Test Production Build Locally
```bash
# Install a simple HTTP server
npm install -g http-server

# Serve the production build
cd dist/sustainable-ai-dashboard/browser
http-server -p 8080
```

Visit `http://localhost:8080` to test the production build.

---

## 🌐 Deployment Options

### Option 1: GitHub Pages (Free)

1. **Install Angular CLI GitHub Pages**
```bash
npm install -g angular-cli-ghpages
```

2. **Build and Deploy**
```bash
ng build --configuration production --base-href "/your-repo-name/"
npx angular-cli-ghpages --dir=dist/sustainable-ai-dashboard/browser
```

3. **Enable GitHub Pages**
- Go to your repository settings
- Navigate to Pages section
- Select `gh-pages` branch
- Save

Your app will be live at: `https://your-username.github.io/your-repo-name/`

### Option 2: Netlify (Free)

1. **Create `netlify.toml` in project root:**
```toml
[build]
  command = "npm run build"
  publish = "dist/sustainable-ai-dashboard/browser"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

2. **Deploy via Netlify CLI:**
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

Or drag and drop the `dist/sustainable-ai-dashboard/browser` folder to Netlify's web interface.

### Option 3: Vercel (Free)

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy:**
```bash
vercel login
vercel
```

Follow the prompts. Vercel will auto-detect Angular and configure everything.

### Option 4: Firebase Hosting (Free)

1. **Install Firebase Tools:**
```bash
npm install -g firebase-tools
```

2. **Initialize Firebase:**
```bash
firebase login
firebase init hosting
```

3. **Configure:**
- Select your Firebase project
- Set public directory to: `dist/sustainable-ai-dashboard/browser`
- Configure as single-page app: Yes
- Set up automatic builds: No

4. **Deploy:**
```bash
npm run build
firebase deploy
```

### Option 5: AWS S3 + CloudFront

1. **Build the app:**
```bash
npm run build
```

2. **Create S3 Bucket:**
- Go to AWS S3 Console
- Create a new bucket
- Enable static website hosting
- Upload contents of `dist/sustainable-ai-dashboard/browser`

3. **Configure CloudFront:**
- Create CloudFront distribution
- Point to S3 bucket
- Set default root object to `index.html`
- Configure error pages to redirect to `index.html`

---

## 🔧 Environment Configuration

### Production Environment Variables

Create `src/environments/environment.prod.ts`:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-api-url.com',
  version: '1.0.0'
};
```

### Update API Service

If you add a real backend, update `src/app/services/api.service.ts`:
```typescript
import { environment } from '../../environments/environment';

// Replace mock data with real API calls
private apiUrl = environment.apiUrl;
```

---

## 📊 Performance Optimization

### 1. Enable Production Mode
Already configured in `angular.json` for production builds.

### 2. Lazy Loading
Consider lazy loading feature modules:
```typescript
const routes: Routes = [
  {
    path: 'analytics',
    loadComponent: () => import('./pages/analytics.component').then(m => m.AnalyticsComponent)
  }
];
```

### 3. Bundle Analysis
```bash
npm install -g webpack-bundle-analyzer
ng build --stats-json
webpack-bundle-analyzer dist/sustainable-ai-dashboard/browser/stats.json
```

---

## 🔒 Security Considerations

- [ ] Remove any sensitive data from code
- [ ] Use environment variables for API keys
- [ ] Enable HTTPS on hosting platform
- [ ] Configure CORS properly
- [ ] Add security headers
- [ ] Implement CSP (Content Security Policy)

---

## 📈 Monitoring & Analytics

### Add Google Analytics (Optional)

1. **Install:**
```bash
npm install @angular/fire
```

2. **Configure in `app.config.ts`:**
```typescript
import { provideAnalytics } from '@angular/fire/analytics';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnalytics(() => getAnalytics()),
    // ... other providers
  ]
};
```

---

## ✅ Post-Deployment Checklist

- [ ] Test all routes on live URL
- [ ] Verify responsive design on real devices
- [ ] Check browser console for errors
- [ ] Test form submissions
- [ ] Verify charts load correctly
- [ ] Test map functionality
- [ ] Check QR code generation
- [ ] Verify all images load
- [ ] Test navigation and routing
- [ ] Check page load performance
- [ ] Verify SEO meta tags
- [ ] Test on multiple browsers

---

## 🆘 Troubleshooting

### Issue: Routes not working (404 errors)
**Solution:** Configure server to redirect all routes to `index.html`

### Issue: Assets not loading
**Solution:** Check `base-href` in build command matches deployment path

### Issue: Charts not rendering
**Solution:** Ensure Chart.js is included in production build

### Issue: Maps not showing
**Solution:** Verify Leaflet CSS is imported in `angular.json`

---

## 📞 Support

For deployment issues or questions:
- Check Angular documentation: https://angular.io/guide/deployment
- Review hosting platform docs
- Check browser console for errors

---

**Ready to showcase your Angular skills! 🚀**

