1. Update to the latest SDK versions in `package.json` and `plugin.xml`
1. Update version in `package.json` and `plugin.xml`.
1. Run `npm run fetch:ios:sdk`
1. Run `npm run fetch:ios:common`
1. Run `npm run build`
1. Add an entry to CHANGELOG.md
1. `git commit -am "Preparing for version x.y.z"`
1. `git tag x.y.z`
1. `git push origin master && git push --tags`
1. Create a new release in github and upload
1. `npm publish`