# Vercel Deployment Guide for IronCanvas

## Environment Variables Required

Add these environment variables in your Vercel dashboard:

### Convex

- `CONVEX_DEPLOYMENT`: Your Convex deployment ID
- `NEXT_PUBLIC_CONVEX_URL`: Your Convex URL (public)

### Clerk Authentication

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Your Clerk publishable key (public)
- `CLERK_SECRET_KEY`: Your Clerk secret key (private)

### Liveblocks

- `LIVEBLOCKS_SECRET_KEY`: Your Liveblocks secret key (private)

## Deployment Steps

1. **Push your code to GitHub**

   ```bash
   git add .
   git commit -m "Deploy to Vercel"
   git push origin main
   ```

2. **Connect to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables

3. **Set Environment Variables**

   - In Vercel dashboard, go to Project Settings → Environment Variables
   - Add all the required environment variables listed above

4. **Deploy**
   - Vercel will automatically deploy when you push to main branch

## Troubleshooting Common Issues

### Build Errors

- Ensure all environment variables are set
- Check that TypeScript compiles without errors locally
- Verify all dependencies are in package.json

### Runtime Errors

- Check Vercel function logs for API route errors
- Ensure secret keys are properly configured
- Verify Convex and Clerk are properly configured

### Performance

- Consider using Vercel Analytics
- Monitor function execution times
- Optimize images using Next.js Image component
