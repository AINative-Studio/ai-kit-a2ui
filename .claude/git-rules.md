# Git Commit Rules for AINative Projects

## 🚨 CRITICAL RULES - ZERO TOLERANCE - NEVER VIOLATE 🚨

### 1. ABSOLUTELY NO ANTHROPIC OR CLAUDE ATTRIBUTION - EVER!

**🛑 STOP! READ THIS BEFORE EVERY COMMIT! 🛑**

You are **STRICTLY FORBIDDEN** from including ANY of the following in git commits, pull requests, or GitHub activity:

❌ **ABSOLUTELY FORBIDDEN TEXT - DO NOT USE UNDER ANY CIRCUMSTANCES:**
- "Claude" (in any form)
- "Anthropic" (in any form)
- "claude.com" or any Claude URLs
- "Claude Code"
- "Generated with Claude"
- "Co-Authored-By: Claude"
- "🤖 Generated with..."
- "AI-generated" or "AI-assisted"
- Any emoji followed by Claude attribution
- Any reference to Claude, Anthropic, or AI tools whatsoever

**⚠️ THIS IS A ZERO TOLERANCE RULE ⚠️**

If you are about to commit with ANY of the above text, **STOP IMMEDIATELY** and remove it!

### 2. COMMIT MESSAGE FORMAT

✅ **CORRECT FORMAT:**
```
Short descriptive title

- Bullet point describing changes
- Another bullet point
- Final bullet point
```

❌ **INCORRECT FORMAT:**
```
Short descriptive title

- Changes made
- More changes

🤖 Generated with Claude Code
https://claude.com/claude-code

Co-Authored-By: Claude <noreply@anthropic.com>
```

### 3. PULL REQUEST DESCRIPTIONS

✅ **CORRECT FORMAT:**
```markdown
## Summary
- Clear description of changes
- What was fixed or added
- Why these changes were made

## Test Plan
- How to test the changes
- Expected results
```

❌ **INCORRECT FORMAT:**
```markdown
## Summary
Changes made...

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>
```

### 4. ENFORCEMENT

**These rules apply to:**
- All commit messages
- All pull request descriptions
- All issue comments
- All GitHub discussions
- Any public-facing git activity

**Violating these rules will:**
- Create public attribution that must be avoided
- Associate our work with third-party tools
- Compromise the professional appearance of our repositories

### 5. EXAMPLES

#### ✅ GOOD COMMIT:
```
Add multi-dimension vector support

- Support for 384, 768, 1024, and 1536 dimensions
- Update validation logic for new dimensions
- Add comprehensive test coverage
```

#### ❌ BAD COMMIT:
```
Add multi-dimension vector support

- Support for 384, 768, 1024, and 1536 dimensions
- Update validation logic for new dimensions
- Add comprehensive test coverage

🤖 Generated with Claude Code
https://claude.com/claude-code

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## 🚨 FINAL WARNING - READ BEFORE EVERY COMMIT 🚨

**BEFORE YOU COMMIT, ASK YOURSELF:**
1. ❓ Does my commit message contain "Claude", "Anthropic", "🤖", or any AI tool reference?
2. ❓ Does my commit message have a "Co-Authored-By: Claude" line?
3. ❓ Does my commit message have a "Generated with..." footer?

**IF YES TO ANY OF THE ABOVE:** ❌ **STOP! DO NOT COMMIT! REMOVE THE FORBIDDEN TEXT IMMEDIATELY!**

**IF NO TO ALL OF THE ABOVE:** ✅ **Proceed with commit**

---

## AUTOMATED ENFORCEMENT

**Pre-commit hook:** Create `.git/hooks/commit-msg` to automatically block forbidden text:

```bash
#!/bin/bash
COMMIT_MSG_FILE=$1
if grep -qiE "(claude|anthropic|🤖|generated with|co-authored-by: claude)" "$COMMIT_MSG_FILE"; then
    echo "❌ ERROR: Commit message contains FORBIDDEN attribution!"
    echo "Remove all references to Claude/Anthropic before committing."
    exit 1
fi
```

**This hook will REJECT any commit containing forbidden text.**

---

## ZERO TOLERANCE POLICY

Every commit **MUST** be checked before pushing to ensure:
- ❌ **NO** "Claude" references
- ❌ **NO** "Anthropic" references
- ❌ **NO** "Generated with..." footers
- ❌ **NO** "Co-Authored-By: Claude" lines
- ❌ **NO** AI tool attribution of any kind

**Violating this rule requires immediate commit amendment and force push to remove the attribution from git history.**
