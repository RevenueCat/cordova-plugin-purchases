## RevenueCat SDK
### 📦 Dependency Updates
* Bump danger from 9.6.1 to 9.6.2 via dependabot[bot] (@dependabot[bot])

### 🔄 Other Changes
* ci: develop in the internal repository and mirror main and tags to the public one via Álvaro Brey (@AlvaroBrey)
* ci: add the fork PR base guard (#1150)

- Adds a caller for the reusable `fork-pr-base-guard.yml`
(RevenueCat/sdk-github-workflows#21, `v11.1.0`). On every PR open, push,
reopen and edit it posts a `fork-pr-base-guard` commit status: `failure`
for a fork PR whose base is neither `main` nor an `external/` branch,
`success` otherwise.
- Runs on `pull_request_target` with `statuses: write` only. The called
workflow checks nothing out and reads only the head SHA, the base ref
and the fork flag.
- Does nothing by itself. A ruleset requiring the status on non-default
branches comes after this merges, as a pilot for the other SDK repos.
- Part of SDK-4589.

<!-- CURSOR_SUMMARY -->
---

> [!NOTE]
> **Low Risk**
> CI-only change that adds a read-only guard status on fork PRs; no
application or runtime code is touched.
> 
> **Overview**
> Adds a new GitHub Actions workflow that wires this repo into
RevenueCat’s shared **fork PR base guard** (`sdk-github-workflows`
`v11.1.0`).
> 
> On every PR **open, reopen, sync, and edit** (`pull_request_target`),
it delegates to the reusable workflow with **status write** only (no
checkout). That posts a `fork-pr-base-guard` commit status: **failure**
when a **fork** PR targets a base branch that is neither `main` nor an
`external/*` branch; **success** otherwise.
> 
> Enforcement still depends on a follow-up **ruleset** requiring this
check on non-default branches; this PR only introduces the status
reporter, aligned with other SDK workflow callers in
`.github/workflows`.
> 
> <sup>Reviewed by [Cursor Bugbot](https://cursor.com/bugbot) for commit
5336e9b628b0b43031f87e5174a566019fa8531a. Bugbot is set up for automated
code reviews on this repo. Configure
[here](https://www.cursor.com/dashboard/bugbot).</sup>
<!-- /CURSOR_SUMMARY --> via Álvaro Brey
* ci: stop storing Maestro test artifacts (#1149)

## Description

Stop storing maestre e2e tests test output as artifacts, instead rely on
`store_test_results` to discover and process the test reports and make
them available to CircleCI.

<!-- CURSOR_SUMMARY -->
---

> [!NOTE]
> **Low Risk**
> CI-only change that removes duplicate artifact storage; test result
ingestion is unchanged.
> 
> **Overview**
> Stops uploading Maestro E2E output from `fastlane/test_output` as
CircleCI **artifacts** for both **`run-maestro-e2e-tests-ios`** and
**`run-maestro-e2e-tests-android`**.
> 
> **`store_test_results`** for the same path is unchanged, so test
reports should still surface in CircleCI’s test results UI without
keeping redundant artifact copies.
> 
> <sup>Reviewed by [Cursor Bugbot](https://cursor.com/bugbot) for commit
75015ce2996eab29c2d59935efdc3bea8784920b. Bugbot is set up for automated
code reviews on this repo. Configure
[here](https://www.cursor.com/dashboard/bugbot).</sup>
<!-- /CURSOR_SUMMARY --> via Rick
* Bump fastlane-plugin-revenuecat_internal from `723f005` to `52a8b95` (#1146)

Bumps
[fastlane-plugin-revenuecat_internal](https://github.com/RevenueCat/fastlane-plugin-revenuecat_internal)
from `723f005` to `52a8b95`.
<details>
<summary>Commits</summary>
<ul>
<li><a
href="https://github.com/RevenueCat/fastlane-plugin-revenuecat_internal/commit/52a8b9568ea0dd2bc33257dc9a3e8338901b7387"><code>52a8b95</code></a>
Add error_handler (<a
href="https://redirect.github.com/RevenueCat/fastlane-plugin-revenuecat_internal/issues/170">#170</a>)</li>
<li>See full diff in <a
href="https://github.com/RevenueCat/fastlane-plugin-revenuecat_internal/compare/723f005563d4653946f837145f72ae73cb2c9f4b...52a8b9568ea0dd2bc33257dc9a3e8338901b7387">compare
view</a></li>
</ul>
</details>
<br />


Dependabot will resolve any conflicts with this PR as long as you don't
alter it yourself. You can also trigger a rebase manually by commenting
`@dependabot rebase`.

[//]: # (dependabot-automerge-start)
[//]: # (dependabot-automerge-end)

---

<details>
<summary>Dependabot commands and options</summary>
<br />

You can trigger Dependabot actions by commenting on this PR:
- `@dependabot rebase` will rebase this PR
- `@dependabot recreate` will recreate this PR, overwriting any edits
that have been made to it
- `@dependabot show <dependency name> ignore conditions` will show all
of the ignore conditions of the specified dependency
- `@dependabot ignore this major version` will close this PR and stop
Dependabot creating any more for this major version (unless you reopen
the PR or upgrade to it yourself)
- `@dependabot ignore this minor version` will close this PR and stop
Dependabot creating any more for this minor version (unless you reopen
the PR or upgrade to it yourself)
- `@dependabot ignore this dependency` will close this PR and stop
Dependabot creating any more for this dependency (unless you reopen the
PR or upgrade to it yourself)


</details>

<!-- CURSOR_SUMMARY -->
---

> [!NOTE]
> **Low Risk**
> Lockfile-only dependency pin update for a Fastlane plugin; no
application or CI script changes in this repo.
> 
> **Overview**
> This PR updates the pinned **git revision** for
`fastlane-plugin-revenuecat_internal` in `Gemfile.lock` from `723f005`
to `52a8b95`. No other gems or lockfile sections change.
> 
> The newer plugin revision includes **error_handler** support (per
upstream PR #170). CI and local Fastlane flows that load this plugin
will pick up that behavior on the next `bundle install`.
> 
> <sup>Reviewed by [Cursor Bugbot](https://cursor.com/bugbot) for commit
8095097e12dd31708b840548cfc648a5056ba7d0. Bugbot is set up for automated
code reviews on this repo. Configure
[here](https://www.cursor.com/dashboard/bugbot).</sup>
<!-- /CURSOR_SUMMARY -->

Signed-off-by: dependabot[bot] <support@github.com>
Co-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com> via dependabot[bot]
* Bump fastlane-plugin-revenuecat_internal from `14d1ddf` to `723f005` (#1140) via dependabot[bot]
* Bump fastlane-plugin-revenuecat_internal from `6f0a9ec` to `14d1ddf` (#1138)

Bumps
[fastlane-plugin-revenuecat_internal](https://github.com/RevenueCat/fastlane-plugin-revenuecat_internal)
from `6f0a9ec` to `14d1ddf`.
<details>
<summary>Commits</summary>
<ul>
<li><a
href="https://github.com/RevenueCat/fastlane-plugin-revenuecat_internal/commit/14d1ddfa03360a057f668246c98cba3a9de09933"><code>14d1ddf</code></a>
feat: print the hotfix next steps and hotfix dependency updates (<a
href="https://redirect.github.com/RevenueCat/fastlane-plugin-revenuecat_internal/issues/166">#166</a>)</li>
<li>See full diff in <a
href="https://github.com/RevenueCat/fastlane-plugin-revenuecat_internal/compare/6f0a9ecf05420355de0c98eff2e0e22a2b08652e...14d1ddfa03360a057f668246c98cba3a9de09933">compare
view</a></li>
</ul>
</details>
<br />


Dependabot will resolve any conflicts with this PR as long as you don't
alter it yourself. You can also trigger a rebase manually by commenting
`@dependabot rebase`.

[//]: # (dependabot-automerge-start)
[//]: # (dependabot-automerge-end)

---

<details>
<summary>Dependabot commands and options</summary>
<br />

You can trigger Dependabot actions by commenting on this PR:
- `@dependabot rebase` will rebase this PR
- `@dependabot recreate` will recreate this PR, overwriting any edits
that have been made to it
- `@dependabot show <dependency name> ignore conditions` will show all
of the ignore conditions of the specified dependency
- `@dependabot ignore this major version` will close this PR and stop
Dependabot creating any more for this major version (unless you reopen
the PR or upgrade to it yourself)
- `@dependabot ignore this minor version` will close this PR and stop
Dependabot creating any more for this minor version (unless you reopen
the PR or upgrade to it yourself)
- `@dependabot ignore this dependency` will close this PR and stop
Dependabot creating any more for this dependency (unless you reopen the
PR or upgrade to it yourself)


</details>

<!-- CURSOR_SUMMARY -->
---

> [!NOTE]
> **Low Risk**
> Lockfile-only bump of an internal fastlane plugin used in CI/release
automation; no runtime app or security-sensitive code paths change.
> 
> **Overview**
> Updates the pinned Git revision for
**`fastlane-plugin-revenuecat_internal`** in `Gemfile.lock` from
`6f0a9ec` to `14d1ddf` (still at plugin version `0.1.0`).
> 
> The newer plugin revision adds **hotfix workflow output**: it prints
hotfix next steps and hotfix-related dependency update guidance during
internal fastlane runs, with no other dependency or application code
changes in this repo.
> 
> <sup>Reviewed by [Cursor Bugbot](https://cursor.com/bugbot) for commit
c27e501fcf0f6ef9652e063602e0ad5b2cb78e61. Bugbot is set up for automated
code reviews on this repo. Configure
[here](https://www.cursor.com/dashboard/bugbot).</sup>
<!-- /CURSOR_SUMMARY -->

Signed-off-by: dependabot[bot] <support@github.com>
Co-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com> via dependabot[bot]
* Bump fastlane-plugin-revenuecat_internal from `1e7875c` to `6f0a9ec` (#1132)

Bumps
[fastlane-plugin-revenuecat_internal](https://github.com/RevenueCat/fastlane-plugin-revenuecat_internal)
from `1e7875c` to `6f0a9ec`.
<details>
<summary>Commits</summary>
<ul>
<li><a
href="https://github.com/RevenueCat/fastlane-plugin-revenuecat_internal/commit/6f0a9ecf05420355de0c98eff2e0e22a2b08652e"><code>6f0a9ec</code></a>
feat: add wait_for_artifacts_in_maven_central action (<a
href="https://redirect.github.com/RevenueCat/fastlane-plugin-revenuecat_internal/issues/165">#165</a>)</li>
<li>See full diff in <a
href="https://github.com/RevenueCat/fastlane-plugin-revenuecat_internal/compare/1e7875ca4a57b940cb6182dd3fa125c2faa66128...6f0a9ecf05420355de0c98eff2e0e22a2b08652e">compare
view</a></li>
</ul>
</details>
<br />


Dependabot will resolve any conflicts with this PR as long as you don't
alter it yourself. You can also trigger a rebase manually by commenting
`@dependabot rebase`.

[//]: # (dependabot-automerge-start)
[//]: # (dependabot-automerge-end)

---

<details>
<summary>Dependabot commands and options</summary>
<br />

You can trigger Dependabot actions by commenting on this PR:
- `@dependabot rebase` will rebase this PR
- `@dependabot recreate` will recreate this PR, overwriting any edits
that have been made to it
- `@dependabot show <dependency name> ignore conditions` will show all
of the ignore conditions of the specified dependency
- `@dependabot ignore this major version` will close this PR and stop
Dependabot creating any more for this major version (unless you reopen
the PR or upgrade to it yourself)
- `@dependabot ignore this minor version` will close this PR and stop
Dependabot creating any more for this minor version (unless you reopen
the PR or upgrade to it yourself)
- `@dependabot ignore this dependency` will close this PR and stop
Dependabot creating any more for this dependency (unless you reopen the
PR or upgrade to it yourself)


</details>

Signed-off-by: dependabot[bot] <support@github.com>
Co-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com> via dependabot[bot]
* Restrict GitHub tokens to the jobs that need them (#1137)

### Motivation
Only jobs that use a GitHub token should receive it. Today the tokens
are project-level variables, so every job gets them.

### Description
Moves the tokens into contexts: `github-bot-public` for jobs that write
to GitHub, `danger-bot` for jobs that use the Danger token.

Merge only after both contexts hold the new tokens and allow this
project.

Related: RevenueCat/purchases-android#4593,
RevenueCat/purchases-ios#8242, RevenueCat/purchases-hybrid-common#2090,
RevenueCat/purchases-flutter#2016,
RevenueCat/react-native-purchases#2126,
RevenueCat/purchases-capacitor#1021, RevenueCat/purchases-unity#1194,
RevenueCat/purchases-kmp#1116, RevenueCat/purchases-js#1310

<!-- CURSOR_SUMMARY -->
---

> [!NOTE]
> **Low Risk**
> CI credential scoping only; pipelines fail until contexts are
configured, with no application runtime impact.
> 
> **Overview**
> **CircleCI no longer exposes GitHub/Danger tokens to every job.** Jobs
that talk to GitHub or run Danger now pull credentials only from named
contexts instead of inheriting project-wide secrets.
> 
> **`github-bot-public`** is wired to release and automation flows that
write to GitHub: tagging the release branch, npm release plus GitHub
release, merging the release PR, weekly/manual version bumps, and the
hybrid-common upgrade PR job. **`make-release`** keeps
**`npm-publishing`** and adds **`github-bot-public`** so npm OIDC and
GitHub steps each get only what they need.
> 
> **`danger-bot`** is limited to the **`revenuecat/danger`** workflow
job for the Danger token.
> 
> Merge depends on those contexts being populated and allowed for this
project (per the PR description).
> 
> <sup>Reviewed by [Cursor Bugbot](https://cursor.com/bugbot) for commit
0aca195fd422388717409395819f54e833dff9cf. Bugbot is set up for automated
code reviews on this repo. Configure
[here](https://www.cursor.com/dashboard/bugbot).</sup>
<!-- /CURSOR_SUMMARY -->

---------

Co-authored-by: Cursor <cursoragent@cursor.com> via Antonio Pallares
* [RENOVATE] Update dependency revenuecat to v4.8.0 (#1135)

This PR contains the following updates:

| Package | Type | Update | Change |
|---|---|---|---|
|
[revenuecat](https://circleci.com/developer/orbs/orb/revenuecat/sdks-common-config)
| orb | minor | `4.7.1` → `4.8.0` |

---

### Configuration

📅 **Schedule**: (UTC)

- Branch creation
  - At any time (no schedule defined)
- Automerge
  - At any time (no schedule defined)

🚦 **Automerge**: Disabled by config. Please merge this manually once you
are satisfied.

♻ **Rebasing**: Whenever PR becomes conflicted, or you tick the
rebase/retry checkbox.

🔕 **Ignore**: Close this PR and you won't be reminded about this update
again.

---

- [ ] <!-- rebase-check -->If you want to rebase/retry this PR, check
this box

---

This PR has been generated by [Mend Renovate
CLI](https://redirect.github.com/renovatebot/renovate).

<!--renovate-debug:eyJjcmVhdGVkSW5WZXIiOiI0NC4yMjIuMiIsInVwZGF0ZWRJblZlciI6IjQ0LjIyMi4yIiwidGFyZ2V0QnJhbmNoIjoibWFpbiIsImxhYmVscyI6WyJwcjpkZXBlbmRlbmNpZXMiXX0=-->

<!-- CURSOR_SUMMARY -->
---

> [!NOTE]
> **Low Risk**
> Single CI dependency pin change with no application code touched; any
risk is limited to pipeline behavior defined by the orb.
> 
> **Overview**
> Bumps the **RevenueCat `sdks-common-config` CircleCI orb** in
`.circleci/config.yml` from `4.7.1` to `4.8.0`. All workflows that call
shared orb commands (Ruby/gem setup, Maestro, SDKMAN, Git credentials,
Danger, release tagging, and related jobs) will pick up whatever changed
in that minor orb release on the next pipeline run—there are no other
file or config edits in this PR.
> 
> <sup>Reviewed by [Cursor Bugbot](https://cursor.com/bugbot) for commit
29b9aefb3cb3688fc7e63212fb985c50d2f47e38. Bugbot is set up for automated
code reviews on this repo. Configure
[here](https://www.cursor.com/dashboard/bugbot).</sup>
<!-- /CURSOR_SUMMARY -->

Co-authored-by: Renovate <renovate@whitesourcesoftware.com> via RevenueCat Git Bot
* [AUTOMATIC BUMP] Updates purchases-hybrid-common to 20.7.0 (#1133)

**This is an automatic bump.**

Updates purchases-hybrid-common to 20.7.0

<!-- CURSOR_SUMMARY -->
---

> [!NOTE]
> **Low Risk**
> Dependency version bump only, aligned across SPM and Android; risk is
limited to regressions in upstream 20.7.0.
> 
> **Overview**
> **Bumps** RevenueCat `purchases-hybrid-common` from **20.6.1** to
**20.7.0** in both integration paths: Swift Package Manager
(`Package.swift` `exact` dependency) and the Android Cordova plugin
manifest (`plugin.xml` Gradle `framework` coordinate).
> 
> No other files or plugin behavior are changed; consumers resolve the
newer hybrid-common release when building iOS (SPM) and Android
(Gradle).
> 
> <sup>Reviewed by [Cursor Bugbot](https://cursor.com/bugbot) for commit
c5fda34eb1360ac8ea94a9045e84cc1c23f9c42b. Bugbot is set up for automated
code reviews on this repo. Configure
[here](https://www.cursor.com/dashboard/bugbot).</sup>
<!-- /CURSOR_SUMMARY --> via RevenueCat Git Bot
* [AUTOMATIC BUMP] Updates purchases-hybrid-common to 20.6.1 (#1131)

**This is an automatic bump.**

Updates purchases-hybrid-common to 20.6.1

<!-- CURSOR_SUMMARY -->
---

> [!NOTE]
> **Low Risk**
> Version-only bump of a shared dependency with no local code changes;
risk is limited to upstream behavior in purchases-hybrid-common 20.6.1.
> 
> **Overview**
> **Automatic dependency bump** for RevenueCat’s shared hybrid layer
from **20.4.0** to **20.6.1**, keeping iOS and Android aligned.
> 
> On **iOS**, `Package.swift` updates the Swift Package Manager `exact`
pin for `purchases-hybrid-common`. On **Android**, `plugin.xml` updates
the Gradle `framework` coordinate for the same artifact. No Cordova
plugin source or API surface changes in this PR.
> 
> <sup>Reviewed by [Cursor Bugbot](https://cursor.com/bugbot) for commit
b1a153ea3e785007c5dad33402581a78225e1c9d. Bugbot is set up for automated
code reviews on this repo. Configure
[here](https://www.cursor.com/dashboard/bugbot).</sup>
<!-- /CURSOR_SUMMARY --> via RevenueCat Git Bot
* [AUTOMATIC] Release/9.0.1 (#1129)

**This is an automatic release.**

## RevenueCat SDK
### 📦 Dependency Updates
* [AUTOMATIC BUMP] Updates purchases-hybrid-common to 20.4.0 (#1125) via
RevenueCat Git Bot (@RCGitBot)
* [Android
11.0.1](https://github.com/RevenueCat/purchases-android/releases/tag/11.0.1)
* [iOS
5.101.0](https://github.com/RevenueCat/purchases-ios/releases/tag/5.101.0)
* [iOS
5.100.0](https://github.com/RevenueCat/purchases-ios/releases/tag/5.100.0)
* [iOS
5.99.2](https://github.com/RevenueCat/purchases-ios/releases/tag/5.99.2)
* [iOS
5.99.1](https://github.com/RevenueCat/purchases-ios/releases/tag/5.99.1)
* [AUTOMATIC BUMP] Updates purchases-hybrid-common to 20.3.0 (#1123) via
RevenueCat Git Bot (@RCGitBot)
* [RENOVATE] Update dependency revenuecat to v4.7.1 (#1121) via
RevenueCat Git Bot (@RCGitBot)
* [AUTOMATIC BUMP] Updates purchases-hybrid-common to 20.1.0 (#1116) via
RevenueCat Git Bot (@RCGitBot)

### 🔄 Other Changes
* ci: use circleci npm trusted publishing (#1127) via Nihal Gonsalves
(@nihalgonsalves)
* Bump fastlane-plugin-revenuecat_internal from `996879c` to `1e7875c`
(#1126) via dependabot[bot] (@dependabot[bot])
* chore(deps): update to node 26 lts/lithium (#1120) via Nihal Gonsalves
(@nihalgonsalves)
* ci: limit the Lock Threads token to `issues: write` (#1124) via Álvaro
Brey (@AlvaroBrey)
* ci: lint GitHub Actions workflows with actionlint (#1122) via Álvaro
Brey (@AlvaroBrey)
* Bump fastlane from 2.241.1 to 2.241.2 (#1118) via dependabot[bot]
(@dependabot[bot])

<!-- CURSOR_SUMMARY -->
---

> [!NOTE]
> **Low Risk**
> Patch release with version/changelog updates and reported platform
flavor version; no plugin API or purchase-flow logic changes in the
diff.
> 
> **Overview**
> **Automatic patch release** that publishes `cordova-plugin-purchases`
**9.0.1** with no Cordova/JS API changes in this diff.
> 
> Version identifiers are aligned across `.version`, `package.json`,
`plugin.xml`, Android `PLUGIN_VERSION`, iOS `platformFlavorVersion`, and
the docs redirect now points at **9.0.1**. `VERSIONS.md` and the
changelogs record the shipped native stack (**purchases-hybrid-common
20.4.0**, iOS **5.101.0**, Android **11.0.1**); `CHANGELOG.latest.md` is
reset to this release’s dependency and CI notes instead of the 9.0.0
breaking-change text.
> 
> Runtime behavior for app developers should match a dependency-only
bump from 9.0.0—upgrade for native SDK fixes/features bundled in those
versions.
> 
> <sup>Reviewed by [Cursor Bugbot](https://cursor.com/bugbot) for commit
18e2faa23c47fa067a62719d51732865e5474ea0. Bugbot is set up for automated
code reviews on this repo. Configure
[here](https://www.cursor.com/dashboard/bugbot).</sup>
<!-- /CURSOR_SUMMARY --> via RevenueCat Git Bot
