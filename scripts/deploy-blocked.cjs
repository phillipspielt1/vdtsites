// eslint-disable-next-line no-console
console.error(`
================================================================
🛑  DEPLOY BLOCKED  ·  vdtsites  (WRONG FOLDER)
================================================================

This 'vdtsites/' folder is the simpler Mara Studio showcase
codebase. It is NOT the production codebase for vdtsites.com.

The real production source lives in '../vdttest-site/'.

Both folders deploy to the same Cloudflare worker named
'vdtsites'. Deploying from here will overwrite the live site
with this simpler codebase. This is what broke the site
previously.

→ Never run npm run deploy from this folder.

If you understand the consequences and still want to deploy
this codebase (you probably don't), use:
  npm run deploy:force

If you want to roll the live worker back to the known-good
May 19 production at any time:
  npx wrangler rollback b0d3dee5-efd5-4a47-ab58-001593e8419f \\
      --name vdtsites
================================================================
`);
process.exit(1);
