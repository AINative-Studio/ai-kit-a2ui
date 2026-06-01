# quaid-scanner Report: /Users/karstenwade/Projects/AINative-Studio/src/ai-kit-a2ui

**Score:** 🔴 1.4/10 — CRITICAL risk
**Maturity:** sandbox | **Depth:** standard | **Duration:** 1.6s
**Scanned:** 2026-06-01T20:54:37.296Z

## Pillar Scores

| Pillar | Score | Weight | Findings |
|--------|-------|--------|----------|
| Security | 0.0 | 25% | 0C 38W 1I |
| Governance | 0.0 | 20% | 1C 2W 11I |
| Community | 2.5 | 15% | 0C 2W 9I |
| AI Readiness | 2.5 | 15% | 0C 5W 0I |
| Inclusive Language | 0.0 | 15% | 0C 5W 29I |
| Technical Rigor | 6.0 | 10% | 0C 1W 5I |

## Critical Findings

### vendor-neutrality-critical-concentration
**Pillar:** Governance | **Category:** vendor-neutrality

Project is dominated by ainative.studio (93% of commits)

_(source: computed heuristic)_

**Suggestion:** Diversify contributors across multiple organizations to reduce single-vendor risk

**Reference:** https://chaoss.community/metric-project-sponsorship/

## Warnings

- **[TIMEOUT-binary-artifacts]** Scanner "binary-artifacts" timed out after undefinedms *(Increase scannerTimeout in configuration or check network connectivity)*
- **[TIMEOUT-dep-pinning-docker]** Scanner "dep-pinning-docker" timed out after undefinedms *(Increase scannerTimeout in configuration or check network connectivity)*
- **[dep-pinning-packages-1]** Loosely pinned dependency "@radix-ui/react-checkbox": "^1.0.4" uses ^ prefix in dependencies *(Consider pinning "@radix-ui/react-checkbox" to an exact version for reproducible builds)*
- **[dep-pinning-packages-2]** Loosely pinned dependency "@radix-ui/react-dialog": "^1.0.5" uses ^ prefix in dependencies *(Consider pinning "@radix-ui/react-dialog" to an exact version for reproducible builds)*
- **[dep-pinning-packages-3]** Loosely pinned dependency "@radix-ui/react-label": "^2.0.2" uses ^ prefix in dependencies *(Consider pinning "@radix-ui/react-label" to an exact version for reproducible builds)*
- **[dep-pinning-packages-4]** Loosely pinned dependency "@radix-ui/react-popover": "^1.0.7" uses ^ prefix in dependencies *(Consider pinning "@radix-ui/react-popover" to an exact version for reproducible builds)*
- **[dep-pinning-packages-5]** Loosely pinned dependency "@radix-ui/react-select": "^2.0.0" uses ^ prefix in dependencies *(Consider pinning "@radix-ui/react-select" to an exact version for reproducible builds)*
- **[dep-pinning-packages-6]** Loosely pinned dependency "@radix-ui/react-separator": "^1.0.3" uses ^ prefix in dependencies *(Consider pinning "@radix-ui/react-separator" to an exact version for reproducible builds)*
- **[dep-pinning-packages-7]** Loosely pinned dependency "@radix-ui/react-slider": "^1.1.2" uses ^ prefix in dependencies *(Consider pinning "@radix-ui/react-slider" to an exact version for reproducible builds)*
- **[dep-pinning-packages-8]** Loosely pinned dependency "@radix-ui/react-tabs": "^1.0.4" uses ^ prefix in dependencies *(Consider pinning "@radix-ui/react-tabs" to an exact version for reproducible builds)*
- **[dep-pinning-packages-9]** Loosely pinned dependency "class-variance-authority": "^0.7.0" uses ^ prefix in dependencies *(Consider pinning "class-variance-authority" to an exact version for reproducible builds)*
- **[dep-pinning-packages-10]** Loosely pinned dependency "clsx": "^2.1.0" uses ^ prefix in dependencies *(Consider pinning "clsx" to an exact version for reproducible builds)*
- **[dep-pinning-packages-11]** Loosely pinned dependency "date-fns": "^3.0.0" uses ^ prefix in dependencies *(Consider pinning "date-fns" to an exact version for reproducible builds)*
- **[dep-pinning-packages-12]** Loosely pinned dependency "react-day-picker": "^8.10.0" uses ^ prefix in dependencies *(Consider pinning "react-day-picker" to an exact version for reproducible builds)*
- **[dep-pinning-packages-13]** Loosely pinned dependency "tailwind-merge": "^2.2.0" uses ^ prefix in dependencies *(Consider pinning "tailwind-merge" to an exact version for reproducible builds)*
- **[dep-pinning-packages-14]** Loosely pinned dependency "@testing-library/jest-dom": "^6.1.5" uses ^ prefix in devDependencies *(Consider pinning "@testing-library/jest-dom" to an exact version for reproducible builds)*
- **[dep-pinning-packages-15]** Loosely pinned dependency "@testing-library/react": "^14.1.2" uses ^ prefix in devDependencies *(Consider pinning "@testing-library/react" to an exact version for reproducible builds)*
- **[dep-pinning-packages-16]** Loosely pinned dependency "@testing-library/user-event": "^14.5.1" uses ^ prefix in devDependencies *(Consider pinning "@testing-library/user-event" to an exact version for reproducible builds)*
- **[dep-pinning-packages-17]** Loosely pinned dependency "@types/node": "^20.10.0" uses ^ prefix in devDependencies *(Consider pinning "@types/node" to an exact version for reproducible builds)*
- **[dep-pinning-packages-18]** Loosely pinned dependency "@types/react": "^18.3.0" uses ^ prefix in devDependencies *(Consider pinning "@types/react" to an exact version for reproducible builds)*
- **[dep-pinning-packages-19]** Loosely pinned dependency "@types/react-dom": "^18.3.0" uses ^ prefix in devDependencies *(Consider pinning "@types/react-dom" to an exact version for reproducible builds)*
- **[dep-pinning-packages-20]** Loosely pinned dependency "@typescript-eslint/eslint-plugin": "^6.13.0" uses ^ prefix in devDependencies *(Consider pinning "@typescript-eslint/eslint-plugin" to an exact version for reproducible builds)*
- **[dep-pinning-packages-21]** Loosely pinned dependency "@typescript-eslint/parser": "^6.13.0" uses ^ prefix in devDependencies *(Consider pinning "@typescript-eslint/parser" to an exact version for reproducible builds)*
- **[dep-pinning-packages-22]** Loosely pinned dependency "@vitest/coverage-v8": "^1.0.4" uses ^ prefix in devDependencies *(Consider pinning "@vitest/coverage-v8" to an exact version for reproducible builds)*
- **[dep-pinning-packages-23]** Loosely pinned dependency "@vitest/ui": "^1.0.4" uses ^ prefix in devDependencies *(Consider pinning "@vitest/ui" to an exact version for reproducible builds)*
- **[dep-pinning-packages-24]** Loosely pinned dependency "eslint": "^8.55.0" uses ^ prefix in devDependencies *(Consider pinning "eslint" to an exact version for reproducible builds)*
- **[dep-pinning-packages-25]** Loosely pinned dependency "eslint-plugin-react": "^7.33.2" uses ^ prefix in devDependencies *(Consider pinning "eslint-plugin-react" to an exact version for reproducible builds)*
- **[dep-pinning-packages-26]** Loosely pinned dependency "eslint-plugin-react-hooks": "^4.6.0" uses ^ prefix in devDependencies *(Consider pinning "eslint-plugin-react-hooks" to an exact version for reproducible builds)*
- **[dep-pinning-packages-27]** Loosely pinned dependency "jsdom": "^23.0.1" uses ^ prefix in devDependencies *(Consider pinning "jsdom" to an exact version for reproducible builds)*
- **[dep-pinning-packages-28]** Loosely pinned dependency "prettier": "^3.1.0" uses ^ prefix in devDependencies *(Consider pinning "prettier" to an exact version for reproducible builds)*
- **[dep-pinning-packages-29]** Loosely pinned dependency "react": "^18.3.1" uses ^ prefix in devDependencies *(Consider pinning "react" to an exact version for reproducible builds)*
- **[dep-pinning-packages-30]** Loosely pinned dependency "react-dom": "^18.3.1" uses ^ prefix in devDependencies *(Consider pinning "react-dom" to an exact version for reproducible builds)*
- **[dep-pinning-packages-31]** Loosely pinned dependency "tailwindcss": "^3.4.0" uses ^ prefix in devDependencies *(Consider pinning "tailwindcss" to an exact version for reproducible builds)*
- **[dep-pinning-packages-32]** Loosely pinned dependency "tsup": "^8.0.1" uses ^ prefix in devDependencies *(Consider pinning "tsup" to an exact version for reproducible builds)*
- **[dep-pinning-packages-33]** Loosely pinned dependency "typescript": "^5.3.3" uses ^ prefix in devDependencies *(Consider pinning "typescript" to an exact version for reproducible builds)*
- **[dep-pinning-packages-34]** Loosely pinned dependency "vitest": "^1.0.4" uses ^ prefix in devDependencies *(Consider pinning "vitest" to an exact version for reproducible builds)*
- **[TIMEOUT-openssf-local-checks]** Scanner "openssf-local-checks" timed out after undefinedms *(Increase scannerTimeout in configuration or check network connectivity)*
- **[TIMEOUT-openssf-scorecard]** Scanner "openssf-scorecard" timed out after undefinedms *(Increase scannerTimeout in configuration or check network connectivity)*
- **[TIMEOUT-clearly-defined]** Scanner "clearly-defined" timed out after undefinedms *(Increase scannerTimeout in configuration or check network connectivity)*
- **[TIMEOUT-license-header-scanner]** Scanner "license-header-scanner" timed out after undefinedms *(Increase scannerTimeout in configuration or check network connectivity)*
- **[psych-safety-1]** No Code of Conduct found *(Add a CODE_OF_CONDUCT.md — see https://www.contributor-covenant.org/)*
- **[support-channels-1]** No SUPPORT.md or .github/SUPPORT.md found *(Add a SUPPORT.md documenting how users can get help)*
- **[agentic-rules-2]** CLAUDE.md lacks recognized structural sections *(Add sections like "Critical Rules", "Project Structure", "Common Tasks" to improve agent guidance.)*
- **[TIMEOUT-ai-repo-detection]** Scanner "ai-repo-detection" timed out after undefinedms *(Increase scannerTimeout in configuration or check network connectivity)*
- **[TIMEOUT-dataset-provenance]** Scanner "dataset-provenance" timed out after undefinedms *(Increase scannerTimeout in configuration or check network connectivity)*
- **[TIMEOUT-model-card-detection]** Scanner "model-card-detection" timed out after undefinedms *(Increase scannerTimeout in configuration or check network connectivity)*
- **[TIMEOUT-model-card-scoring]** Scanner "model-card-scoring" timed out after undefinedms *(Increase scannerTimeout in configuration or check network connectivity)*
- **[AK-PREREQ-MISSING-README.md]** README.md contains tool commands but no Prerequisites or Requirements section *(Consider adding a Prerequisites section listing required tools and versions)*
- **[TIMEOUT-diminishing-language-scanner]** Scanner "diminishing-language-scanner" timed out after undefinedms *(Increase scannerTimeout in configuration or check network connectivity)*
- **[TIMEOUT-inclusive-code-scanner]** Scanner "inclusive-code-scanner" failed: Cannot read properties of undefined (reading 'termListUrl') *(Check scanner implementation for errors)*
- **[TIMEOUT-inclusive-doc-scanner]** Scanner "inclusive-doc-scanner" failed: Cannot read properties of undefined (reading 'termListUrl') *(Check scanner implementation for errors)*
- **[TIMEOUT-inclusive-naming-scanner]** Scanner "inclusive-naming-scanner" failed: Cannot read properties of undefined (reading 'termListUrl') *(Check scanner implementation for errors)*
- **[interaction-templates-1]** No issue templates configured *(Add .github/ISSUE_TEMPLATE/ with bug report and feature request templates)*

## Info

- **[branch-protection-1]** GitHub token not provided. Cannot check branch protection settings.
- **[asset-protection-1]** No trademark policy found (optional)
- **[asset-protection-2]** No export control documentation found (optional)
- **[asset-protection-3]** No CLA or DCO requirement detected
- **[asset-protection-4]** Contributor friction level: Low
- **[bus-factor-1]** Bus factor: 1, Elephant factor: 93% (2 contributors, 14 commits in last 12 months)
- **[dep-license-scanning-1]** package.json found but node_modules not installed — cannot scan dependency licenses
- **[governance-classification-1]** No governance model detected — governance files exist but no recognizable model pattern found
- **[governance-detection-1]** No governance documentation found
- **[license-compatibility-1]** Project license is MIT — no installed dependencies to check compatibility
- **[vendor-neutrality-domain-count]** Found 2 unique email domain(s) across 14 commits
- **[vendor-neutrality-no-succession]** No succession planning documentation found
- **[burnout-detection-1]** Burnout detection requires a GitHub token
- **[contributor-data-1]** 2 unique contributors with 14 commits in the last 12 months
- **[contributor-data-2]** Contributor emails span 2 domains
- **[contributor-funnel-1]** Contributor funnel: 0 core, 1 regular, 1 casual (2 total)
- **[funding-1]** No funding infrastructure detected
- **[issue-closure-1]** Issue closure analysis requires a GitHub token
- **[response-classification-1]** Response classification requires a GitHub token
- **[response-time-1]** Response time analysis requires a GitHub token
- **[stale-bot-1]** No stale bot configured
- **[AK-GIT-CLONE-README.md:413]** Assumed knowledge: "clone" operation used without explanation
- **[AK-GIT-CLONE-README.md:414]** Assumed knowledge: "clone" operation used without explanation
- **[AK-GIT-CLONE-README.md:670]** Assumed knowledge: "clone" operation used without explanation
- **[AK-GIT-BRANCH-README.md:671]** Assumed knowledge: "branch" operation used without explanation
- **[AK-TOOL-NPM-README.md:27]** Assumed knowledge: "npm" command used without Node.js listed as prerequisite
- **[AK-TOOL-NPM-README.md:43]** Assumed knowledge: "npm" command used without Node.js listed as prerequisite
- **[AK-TOOL-NPM-README.md:372]** Assumed knowledge: "npm" command used without Node.js listed as prerequisite
- **[AK-TOOL-NPM-README.md:375]** Assumed knowledge: "npm" command used without Node.js listed as prerequisite
- **[AK-TOOL-NPM-README.md:378]** Assumed knowledge: "npm" command used without Node.js listed as prerequisite
- **[AK-TOOL-NPM-README.md:381]** Assumed knowledge: "npm" command used without Node.js listed as prerequisite
- **[AK-TOOL-NPM-README.md:389]** Assumed knowledge: "npm" command used without Node.js listed as prerequisite
- **[AK-TOOL-NPM-README.md:418]** Assumed knowledge: "npm" command used without Node.js listed as prerequisite
- **[AK-TOOL-NPM-README.md:421]** Assumed knowledge: "npm" command used without Node.js listed as prerequisite
- **[AK-TOOL-NPM-README.md:424]** Assumed knowledge: "npm" command used without Node.js listed as prerequisite
- **[AK-TOOL-NPM-README.md:427]** Assumed knowledge: "npm" command used without Node.js listed as prerequisite
- **[AK-TOOL-MAKE-README.md:672]** Assumed knowledge: "make" command used without build tools listed as prerequisite
- **[AK-TOOL-NPM-README.md:673]** Assumed knowledge: "npm" command used without Node.js listed as prerequisite
- **[AK-TOOL-NPM-README.md:683]** Assumed knowledge: "npm" command used without Node.js listed as prerequisite
- **[AK-ACRONYM-RFC-README.md:18]** Undefined acronym "RFC" may confuse newcomers
- **[AK-ACRONYM-WCAG-README.md:20]** Undefined acronym "WCAG" may confuse newcomers
- **[AK-ACRONYM-JSX-README.md:201]** Undefined acronym "JSX" may confuse newcomers
- **[AK-ACRONYM-TBD-README.md:389]** Undefined acronym "TBD" may confuse newcomers
- **[AK-ACRONYM-ESM-README.md:404]** Undefined acronym "ESM" may confuse newcomers
- **[AK-ACRONYM-README-README.md:455]** Undefined acronym "README" may confuse newcomers
- **[AK-ACRONYM-CONTRIBUTING-README.md:665]** Undefined acronym "CONTRIBUTING" may confuse newcomers
- **[AK-ACRONYM-TDD-README.md:672]** Undefined acronym "TDD" may confuse newcomers
- **[AK-ACRONYM-RED-README.md:672]** Undefined acronym "RED" may confuse newcomers
- **[AK-ACRONYM-GREEN-README.md:672]** Undefined acronym "GREEN" may confuse newcomers
- **[AK-ACRONYM-REFACTOR-README.md:672]** Undefined acronym "REFACTOR" may confuse newcomers
- **[linter-config-2]** Linter config found but no lint step detected in CI workflows
- **[release-cadence-1]** No releases or version tags found
- **[test-coverage-2]** Coverage configuration found: vitest.config.ts
- **[test-coverage-3]** No coverage badge found in README
- **[semver-validation-1]** No git tags found — cannot validate SemVer

## Recommendations

- **[HIGH impact / medium effort]** Diversify contributors across multiple organizations to reduce single-vendor risk
  - https://chaoss.community/metric-project-sponsorship/
- **[MEDIUM impact / low effort]** Increase scannerTimeout in configuration or check network connectivity
- **[MEDIUM impact / low effort]** Consider pinning "@radix-ui/react-checkbox" to an exact version for reproducible builds
- **[MEDIUM impact / low effort]** Increase scannerTimeout in configuration or check network connectivity
- **[MEDIUM impact / low effort]** Add a CODE_OF_CONDUCT.md — see https://www.contributor-covenant.org/
- **[MEDIUM impact / low effort]** Add a SUPPORT.md documenting how users can get help
- **[MEDIUM impact / low effort]** Add sections like "Critical Rules", "Project Structure", "Common Tasks" to improve agent guidance.
- **[MEDIUM impact / low effort]** Increase scannerTimeout in configuration or check network connectivity
- **[MEDIUM impact / low effort]** Consider adding a Prerequisites section listing required tools and versions
- **[MEDIUM impact / low effort]** Increase scannerTimeout in configuration or check network connectivity
- **[MEDIUM impact / low effort]** Check scanner implementation for errors
- **[MEDIUM impact / low effort]** Add .github/ISSUE_TEMPLATE/ with bug report and feature request templates

## Score Rationale

Overall score is a weighted sum of six pillar scores (each scored 0–10).

| Pillar | Weight | Raw Score | Contribution |
|--------|--------|-----------|-------------|
| Security | 25% | 0.0 | 0.00 |
| Governance | 20% | 0.0 | 0.00 |
| Community | 15% | 2.5 | 0.38 |
| AI Readiness | 15% | 2.5 | 0.38 |
| Inclusive Language | 15% | 0.0 | 0.00 |
| Technical Rigor | 10% | 6.0 | 0.60 |
| **Overall** | **100%** | | **1.40** |

---
*quaid-scanner v0.1.2 | 2026-06-01T20:54:37.296Z*
*Commit: 4d736259b79043d3a168177c98b1d6f431f593a0*