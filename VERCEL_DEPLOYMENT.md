# Vercel Deployment Guide for FHE Democracy Vote

This guide provides step-by-step instructions for deploying the FHE Democracy Vote platform to Vercel.

## Prerequisites

- GitHub account with access to the repository
- Vercel account (free tier available)
- Node.js 18+ installed locally (for testing)

## Step-by-Step Deployment

### 1. Prepare the Repository

The repository is already prepared with:
- ✅ Removed all Lovable dependencies
- ✅ Updated package.json with correct dependencies
- ✅ Added RainbowKit wallet integration
- ✅ Configured environment variables
- ✅ Added FHE smart contracts

### 2. Connect to Vercel

1. **Visit Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project" or "Add New..." → "Project"
   - Select "Import Git Repository"
   - Choose `apolloDAO155/fhedemocracy-vote` from the list
   - Click "Import"

### 3. Configure Project Settings

1. **Project Name**
   - Set project name: `fhe-democracy-vote`
   - Or keep the default generated name

2. **Framework Preset**
   - Framework: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Root Directory**
   - Leave as default (root of repository)

### 4. Set Environment Variables

In the Vercel dashboard, go to **Settings** → **Environment Variables** and add:

```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

**Important**: Make sure to set these for all environments (Production, Preview, Development).

### 5. Deploy

1. **Initial Deployment**
   - Click "Deploy" button
   - Wait for the build process to complete (usually 2-3 minutes)
   - Vercel will automatically build and deploy your application

2. **Monitor Deployment**
   - Watch the build logs for any errors
   - If successful, you'll get a deployment URL like: `https://fhe-democracy-vote-xxx.vercel.app`

### 6. Configure Custom Domain (Optional)

1. **Add Domain**
   - Go to **Settings** → **Domains**
   - Add your custom domain (e.g., `voting.yourdomain.com`)
   - Follow DNS configuration instructions

2. **SSL Certificate**
   - Vercel automatically provides SSL certificates
   - No additional configuration needed

### 7. Post-Deployment Verification

1. **Test Wallet Connection**
   - Visit your deployed URL
   - Click "Connect Wallet" button
   - Verify RainbowKit modal appears
   - Test with MetaMask or other wallets

2. **Test Network Configuration**
   - Ensure Sepolia testnet is configured
   - Verify RPC endpoints are working
   - Check console for any errors

3. **Test Responsive Design**
   - Test on mobile devices
   - Verify all UI components work correctly

## Build Configuration

### Vite Configuration
The project uses Vite with the following configuration:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: 18.x (automatically detected)

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

## Environment Variables Reference

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_CHAIN_ID` | `11155111` | Sepolia testnet chain ID |
| `NEXT_PUBLIC_RPC_URL` | `https://sepolia.infura.io/v3/...` | Sepolia RPC endpoint |
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | `2ec9743d0d0cd7fb94dee1a7e6d33475` | WalletConnect project ID |
| `NEXT_PUBLIC_INFURA_API_KEY` | `b18fb7e6ca7045ac83c41157ab93f990` | Infura API key |

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (should be 18+)
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Wallet Connection Issues**
   - Verify environment variables are set correctly
   - Check WalletConnect project ID
   - Ensure RPC URLs are accessible

3. **Network Issues**
   - Verify Sepolia testnet configuration
   - Check if RPC endpoints are working
   - Ensure proper chain ID is set

### Debug Steps

1. **Check Build Logs**
   - Go to Vercel dashboard
   - Click on the failed deployment
   - Review build logs for specific errors

2. **Local Testing**
   ```bash
   npm install
   npm run build
   npm run preview
   ```

3. **Environment Variables**
   - Double-check all environment variables are set
   - Ensure no typos in variable names
   - Verify values are correct

## Performance Optimization

### Vercel Optimizations
- **Automatic HTTPS**: Enabled by default
- **Global CDN**: Automatic edge caching
- **Image Optimization**: Built-in image optimization
- **Automatic Scaling**: Handles traffic spikes

### Application Optimizations
- **Code Splitting**: Automatic with Vite
- **Tree Shaking**: Unused code elimination
- **Minification**: Automatic in production builds
- **Caching**: Static assets cached at edge

## Monitoring and Analytics

1. **Vercel Analytics**
   - Enable in project settings
   - Monitor performance metrics
   - Track user interactions

2. **Error Monitoring**
   - Check Vercel function logs
   - Monitor for runtime errors
   - Set up alerts for critical issues

## Security Considerations

1. **Environment Variables**
   - Never commit sensitive keys to repository
   - Use Vercel's environment variable system
   - Rotate keys regularly

2. **HTTPS**
   - Automatically enabled by Vercel
   - No additional configuration needed

3. **CORS Configuration**
   - Configured for wallet connections
   - Supports multiple wallet providers

## Maintenance

### Regular Updates
1. **Dependencies**: Keep packages updated
2. **Security**: Monitor for vulnerabilities
3. **Performance**: Regular performance audits

### Monitoring
1. **Uptime**: Monitor application availability
2. **Performance**: Track load times and user experience
3. **Errors**: Monitor for runtime errors and issues

## Support

For deployment issues:
1. Check Vercel documentation
2. Review build logs
3. Test locally first
4. Contact support if needed

## Success Checklist

- [ ] Repository imported to Vercel
- [ ] Environment variables configured
- [ ] Build successful
- [ ] Application accessible via URL
- [ ] Wallet connection working
- [ ] Network configuration correct
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Performance optimized
- [ ] Monitoring enabled

Your FHE Democracy Vote platform is now successfully deployed on Vercel! 🎉
