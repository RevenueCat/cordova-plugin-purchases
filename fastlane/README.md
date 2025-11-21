fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

### bump

```sh
[bundle exec] fastlane bump
```

Bump version, edit changelog, and create pull request

### automatic_bump

```sh
[bundle exec] fastlane automatic_bump
```

Automatically bumps version, edit changelog, and create pull request

### release

```sh
[bundle exec] fastlane release
```

Creates GitHub release and publishes package

### release_bc7

```sh
[bundle exec] fastlane release_bc7
```

Publishes package with bc7 variant dependencies on bc7 npm tag

### github_release

```sh
[bundle exec] fastlane github_release
```

Make github release

### tag_current_branch

```sh
[bundle exec] fastlane tag_current_branch
```

Tag current branch with current version number

### update_hybrid_common

```sh
[bundle exec] fastlane update_hybrid_common
```

Update hybrid common in plugin.xml and pushes changes to a new branch if open_pr option is true

### generate_docs

```sh
[bundle exec] fastlane generate_docs
```

Generate docs

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
