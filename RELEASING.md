1. Create a release branch- `release/x.y.z`
1. Update versions in `VERSIONS.md`
1. Update to the latest purchases-hybrid-common version in `plugin.xml`
1. Update version in `package.json`, `plugin.xml`, `PurchasesPlugin.java`, `PurchasesPlugin.swift`, and `scripts/docs/index.html`.
1. Run `npm run build`
1. Add an entry to CHANGELOG.md
1. Create a PR with the changes - "Preparing for version x.y.z" and include the new contents of `CHANGELOG.md` as the description.
1. Once approved, merge.
1. From the updated `main` branch, create a tag `git tag x.y.z`
1. `git push origin <tag name>`
1. Create a new release in github and upload the output from the build. If this is a beta/release candidate, make sure to check `This is a pre-release`
1. `npm publish`
1. Update the version in `package.json` and `plugin.xml` to x.y.z-SNAPSHOT, with x.y.z being the next version
