# public/downloads

`DiskBuddy-<version>.dmg` is dropped here by `Scripts/release.sh` in the app repo,
*after* the disk image has been notarized and stapled. Nothing else belongs here.

Do not copy an ad-hoc-signed build in by hand: Gatekeeper shows every visitor
"DiskBuddy is damaged and can't be opened" and the download becomes worse than
having no download at all.

To cut a release:

    cd ../diskbuddy
    make dmg          # builds, signs, notarizes, staples, and copies here

Then bump `VERSION` in `src/lib/product.ts` to match and redeploy the site.
