# Deployment Checklist for KDP Suite Website

## Pre-Deployment Verification

Before deploying any changes to the KDP Suite website, ensure the following:

### Critical Files (MUST BE PRESENT)

- [ ] `/public/BingSiteAuth.xml` - Bing Webmaster Tools verification
- [ ] `/public/a893d08d1c9d4429b266d5faaf5f41ff.txt` - Google Search Console verification
- [ ] `/public/robots.txt` - Search engine crawling rules
- [ ] `/public/sitemap.xml` - Site structure for search engines

### Verification Steps

1. **Check File Existence**
   ```bash
   ls -la public/BingSiteAuth.xml
   ls -la public/a893d08d1c9d4429b266d5faaf5f41ff.txt
   ls -la public/robots.txt
   ls -la public/sitemap.xml
   ```

2. **Verify Git Status**
   ```bash
   git status
   # Ensure verification files are tracked and committed
   ```

3. **Build Test**
   ```bash
   npm run build
   # Ensure build completes without errors
   ```

4. **Local Verification**
   ```bash
   npm run dev
   # Visit http://localhost:3000/BingSiteAuth.xml
   # Visit http://localhost:3000/a893d08d1c9d4429b266d5faaf5f41ff.txt
   ```

## Post-Deployment Verification

After deployment, verify that all critical files are accessible:

### Production URL Checks

- [ ] Visit `https://kdpsuite.com/BingSiteAuth.xml` - Should return XML content
- [ ] Visit `https://kdpsuite.com/a893d08d1c9d4429b266d5faaf5f41ff.txt` - Should return token
- [ ] Visit `https://kdpsuite.com/robots.txt` - Should return robots directives
- [ ] Visit `https://kdpsuite.com/sitemap.xml` - Should return sitemap XML

### Expected Responses

**BingSiteAuth.xml**
```xml
<?xml version="1.0"?>
<users>
    <user>4864B8B1F574734C07D654636C5D0125</user>
</users>
```

**a893d08d1c9d4429b266d5faaf5f41ff.txt**
```
a893d08d1c9d4429b266d5faaf5f41ff
```

## Common Issues and Solutions

### Issue: Verification file returns 404

**Solution:**
1. Check if file exists in `/public/` directory
2. Verify file is committed to Git
3. Rebuild and redeploy
4. Clear Vercel cache if necessary

### Issue: File content is incorrect

**Solution:**
1. Verify file content matches expected tokens
2. Check for extra whitespace or line breaks
3. Ensure UTF-8 encoding
4. Recommit and redeploy

### Issue: Files missing after deployment

**Solution:**
1. Check `.gitignore` - ensure files are not excluded
2. Verify files are in the Git repository
3. Check Vercel build logs for errors
4. Manually verify files in Vercel deployment inspector

## Emergency Recovery

If verification files are accidentally deleted or corrupted:

1. **Restore from Git history**
   ```bash
   git checkout HEAD -- public/BingSiteAuth.xml
   git checkout HEAD -- public/a893d08d1c9d4429b266d5faaf5f41ff.txt
   ```

2. **Recreate from backup** (if needed)
   - BingSiteAuth.xml: Contains token `4864B8B1F574734C07D654636C5D0125`
   - Google verification: Contains token `a893d08d1c9d4429b266d5faaf5f41ff`

3. **Commit and redeploy immediately**
   ```bash
   git add public/BingSiteAuth.xml public/a893d08d1c9d4429b266d5faaf5f41ff.txt
   git commit -m "Restore verification files"
   git push origin main
   ```

## Automated Checks (Future Enhancement)

Consider adding these automated checks to CI/CD pipeline:

- Pre-deployment script to verify file existence
- Post-deployment health check to verify file accessibility
- Automated alerts if verification files return 404

## Contact

For issues or questions about verification files, refer to:
- [VERIFICATION_FILES.md](../VERIFICATION_FILES.md) - Detailed documentation
- [README.md](../README.md) - Project overview

---

**Last Updated**: November 5, 2025
**Maintained By**: KDP Suite Development Team
