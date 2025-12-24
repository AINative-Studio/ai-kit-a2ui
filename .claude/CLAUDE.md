# AINative Studio Core - Project Memory for AI Assistants

---

## 🚨 CRITICAL RULE #1 - READ THIS FIRST - ZERO TOLERANCE 🚨

### ABSOLUTELY NO AI ATTRIBUTION IN GIT COMMITS - EVER!

**🛑 BEFORE EVERY COMMIT, READ THIS:**

You are **STRICTLY FORBIDDEN** from including ANY of the following in git commits, pull requests, or any GitHub activity:

❌ **ABSOLUTELY FORBIDDEN - NEVER USE:**
- "Claude" (in any form)
- "Anthropic" (in any form)
- "claude.com" or any URLs
- "Claude Code"
- "Generated with Claude"
- "Co-Authored-By: Claude"
- "🤖 Generated with..."
- "AI-generated" or "AI-assisted"
- ANY reference to AI tools whatsoever

**✅ CORRECT COMMIT FORMAT:**
```
Short descriptive title

- Bullet point describing changes
- Another bullet point
- Final bullet point
```

**❌ FORBIDDEN - NEVER DO THIS:**
```
Short descriptive title

- Changes made
- More changes

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>
```

**⚠️ ZERO TOLERANCE POLICY ⚠️**
- Automated hook at `.git/hooks/commit-msg` will BLOCK commits with forbidden text
- See `.claude/git-rules.md` for complete rules
- **CHECK EVERY COMMIT** before pushing

---

## Project Overview

**Project**: AINative Studio - Core Backend & Infrastructure
**Tech Stack**: Python 3.11 + FastAPI + PostgreSQL + Redis + Celery + Kong Gateway
**Deployment**: Railway (production), Docker Compose (development)
**Last Updated**: 2025-12-18

---

## Quick Reference

### Repository Structure
```
/Users/aideveloper/core/
├── src/backend/          # FastAPI backend application
│   ├── app/              # Application code
│   │   ├── api/          # API endpoints (v1, admin)
│   │   ├── models/       # SQLAlchemy models
│   │   ├── services/     # Business logic
│   │   ├── schemas/      # Pydantic schemas
│   │   └── tasks/        # Celery tasks
│   ├── tests/            # Comprehensive test suite
│   └── alembic/          # Database migrations
├── sdks/                 # Client SDKs
│   ├── python/           # ZeroDB Python SDK
│   ├── typescript/       # ZeroDB TypeScript SDK
│   └── go/               # ZeroDB Go SDK
├── packages/             # Monorepo packages
│   ├── mcp-servers/      # MCP server implementations
│   └── tools/            # Development tools
├── docs/                 # Documentation
│   ├── reports/          # Implementation reports
│   └── deployment/       # Deployment guides
└── .claude/              # AI assistant configuration
    ├── CLAUDE.md         # This file
    ├── git-rules.md      # Git commit rules
    └── commands/         # Slash commands
```

---

## Critical Rules & Guidelines

### 1. Git Commit Rules (MOST IMPORTANT)
- **File**: `.claude/git-rules.md`
- **Hook**: `.git/hooks/commit-msg` (automated enforcement)
- **Policy**: ZERO TOLERANCE for AI attribution

### 2. File Placement Rules
- **File**: `.claude/CRITICAL_FILE_PLACEMENT_RULES.md`
- Documentation in `docs/{category}/`
- No `.md` files in project root (except README.md)
- Pre-commit hook enforces placement

### 3. Testing Requirements

#### 🚨 **MANDATORY: ACTUALLY RUN TESTS BEFORE CLAIMING THEY PASS** 🚨

**ZERO TOLERANCE POLICY - Tests MUST be executed with proof of output:**

- ❌ **FORBIDDEN**: Writing tests but not running them
- ❌ **FORBIDDEN**: Claiming "tests passing" without actual pytest/npm test output
- ❌ **FORBIDDEN**: Stating "80%+ coverage" without coverage report
- ❌ **FORBIDDEN**: Closing issues without running test suite
- ❌ **FORBIDDEN**: Making PRs without executing tests locally

**REQUIRED WORKFLOW:**

```bash
# Backend - MUST run before any commit
cd /Users/aideveloper/core/src/backend
python3 -m pytest tests/test_your_feature.py -v --cov=app.your.module --cov-report=term-missing

# Frontend - MUST run before any commit
cd /Users/aideveloper/core/AINative-website
npm test -- --coverage

# MUST see: ✓ All tests PASSED, ✓ Coverage >= 80%
```

**EVERY commit/PR/issue closure MUST include:**
1. Actual command executed
2. Full test output showing PASSED status
3. Coverage report with actual percentages
4. If tests fail or cannot run, DOCUMENT THE ISSUE immediately

**Test Coverage Requirements:**
- 80%+ minimum test coverage for new features (PROVEN with coverage report)
- Integration tests for ALL API endpoints (VERIFIED by running them)
- Unit tests for ALL services and models (EXECUTED with output captured)

**Learned from incidents:**
- Email service deployed untested (caused production issues)
- Showcase videos tests created but never executed (discovered infrastructure issues)
- **NEVER AGAIN** - Always test before committing

### 4. Code Quality Standards
- Type hints on all Python functions
- Docstrings on all public methods
- SQLAlchemy ORM (no raw SQL)
- Pydantic for validation
- Multi-tenant isolation (organization_id)
- Rate limiting on all endpoints
- Comprehensive error handling

---

## Architecture Patterns

### API Design
- **Public APIs**: `/v1/*` (user-facing, API key or Bearer auth)
- **Admin APIs**: `/admin/*` (superuser only)
- **Health**: `/health` (no auth)
- **Webhooks**: `/webhooks/*` (signature verification)

### Authentication
- JWT tokens (access + refresh)
- API keys (organization-scoped)
- Multi-tenant isolation via organization_id
- Role-based access control (user, admin, superuser)

### Database
- **PostgreSQL**: Primary database (Railway)
- **Redis**: Caching and rate limiting
- **Migrations**: Alembic (version controlled)
- **Indexes**: Required for all foreign keys and frequently queried fields

### Services
- **Email**: EnhancedEmailService (Resend, SMTP, SendGrid, SES)
- **Billing**: Stripe integration with Kong usage tracking
- **Notifications**: Multi-channel (email, Slack, PagerDuty, webhooks)
- **Queue**: Celery with Redis broker
- **Gateway**: Kong API Gateway for rate limiting and routing

---

## Common Tasks

### Adding a New API Endpoint
1. Create endpoint in `src/backend/app/api/v1/endpoints/{feature}.py`
2. Add Pydantic schemas in `src/backend/app/schemas/{feature}.py`
3. Add models if needed in `src/backend/app/models/{feature}.py`
4. Add business logic in `src/backend/app/services/{feature}_service.py`
5. Create migration if database changes: `alembic revision -m "description"`
6. Write tests in `src/backend/tests/test_{feature}.py`
7. Register router in `src/backend/app/api/v1/__init__.py`
8. Test locally, then commit (NO AI ATTRIBUTION!)

### Running Tests
```bash
cd src/backend
pytest tests/ -v --cov
pytest tests/test_specific.py -v
```

### Database Migrations
```bash
# Create migration
alembic revision -m "add_new_table"

# Apply migrations
alembic upgrade head

# Rollback one migration
alembic downgrade -1
```

### Starting Development Environment
```bash
# Backend API
cd src/backend
uvicorn app.main:app --reload --port 8000

# Celery worker
celery -A app.tasks.celery_app worker -l info

# Celery beat (scheduled tasks)
celery -A app.tasks.celery_app beat -l info
```

---

## Environment Variables

### Required for Development
```bash
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/ainative_dev

# Redis
REDIS_URL=redis://localhost:6379/0

# Email
RESEND_API_KEY=re_xxxxx

# Stripe
STRIPE_API_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# JWT
SECRET_KEY=your-secret-key-here

# Kong
KONG_ADMIN_URL=http://localhost:8001
KONG_PROXY_URL=http://localhost:8000
```

---

## Recent Major Work

### Email Service (Issues #138-141) ✅
- Multi-provider email service (Resend, SMTP, SendGrid, SES)
- Password reset, welcome, verification emails
- Professional HTML templates
- Rate limiting and retry logic

### Notification System (Issues #142-148, #157-158) ✅
- In-app notifications CRUD
- Slack webhook integration
- PagerDuty incident management
- Custom webhook support
- Admin monitoring and alerts
- 3,600+ lines of production code

### Latest Sprint (Issues #92, #164, #319, #156, #306, #160, #173) ✅
- Invoice email automation with Stripe integration
- Kong billing metrics collection and credit deduction
- Developer analytics and logs endpoints
- Python SDK table operations (v1.0.1)
- PostgreSQL MCP tools (7 new tools)
- Railway internal networking configuration

---

## Important File References

### Configuration
- **FastAPI App**: `src/backend/app/main.py` (main application)
- **Database**: `src/backend/app/db/base.py` (SQLAlchemy setup)
- **Settings**: `src/backend/app/core/config.py` (environment config)
- **Dependencies**: `src/backend/app/api/deps.py` (FastAPI dependencies)

### Core Services
- **Email**: `src/backend/app/services/email_service_enhanced.py`
- **Billing**: `src/backend/app/services/billing_service.py`
- **Stripe**: `src/backend/app/services/stripe_service.py`
- **Kong**: `src/backend/app/services/kong_metrics_collector.py`
- **Auth**: `src/backend/app/services/auth_service.py`

### Models
- **User**: `src/backend/app/models/user.py`
- **Organization**: `src/backend/app/models/organization.py`
- **Billing**: `src/backend/app/models/billing.py`
- **Notifications**: `src/backend/app/models/notification.py`

---

## Deployment Checklist

Before deploying to production:

- [ ] All tests passing (`pytest`)
- [ ] No AI attribution in commits (check with `git log`)
- [ ] Database migrations created and tested
- [ ] Environment variables configured in Railway
- [ ] API endpoints documented
- [ ] Error handling comprehensive
- [ ] Rate limiting configured
- [ ] Multi-tenant isolation verified
- [ ] Security review completed
- [ ] Documentation updated

---

## MCP Servers Available

- **ZeroDB MCP**: `zerodb-mcp-server` (76 operations)
  - Vector operations, memory, RLHF, tables, files, events
  - PostgreSQL management (provision, status, logs, usage)
  - Quantum operations

- **GitHub MCP**: `@modelcontextprotocol/server-github`
  - Repository management
  - Issues, PRs, commits

- **Strapi MCP**: `ainative-strapi-mcp-server`
  - CMS content management
  - Blog, tutorials, events

---

## Package Publishing & Registries

### Python SDK (PyPI)

**Package Name:** `zerodb-mcp`
**Registry:** https://pypi.org/project/zerodb-mcp/
**Current Live Version:** 1.0.0
**Next Version:** 1.0.1 (ready to publish)

**Credentials Location:**
- **File:** `~/.pypirc` (exists on local machine)
- **Format:** Uses `__token__` authentication
- **Username:** `__token__`
- **Password:** `pypi-[token]` (stored in ~/.pypirc)

**Publishing Workflow:**
```bash
# Location
cd /Users/aideveloper/core/sdks/python

# Run tests first (ALWAYS)
pytest tests/ -v --cov=zerodb_mcp
# Expected: 51/51 tests passing, 65% coverage

# Build distribution
python -m build
# Creates: dist/zerodb_mcp-1.0.1-py3-none-any.whl
#          dist/zerodb-mcp-1.0.1.tar.gz

# Upload to Test PyPI first (recommended)
twine upload --repository testpypi dist/*

# Upload to Production PyPI (LIVE - cannot undo)
twine upload dist/*

# Verify live package
pip install --upgrade zerodb-mcp==1.0.1
```

**Important Notes:**
- PyPI uploads are **PERMANENT** - cannot delete packages
- Always test on Test PyPI first: https://test.pypi.org
- Version numbers cannot be reused (1.0.1 can only be published once)
- All 51 tests must pass before publishing
- Credentials in `~/.pypirc` are automatically used by twine

### TypeScript SDK (NPM)

**Package Name:** `@zerodb/mcp-client`
**Registry:** https://npmjs.com/package/@zerodb/mcp-client
**Current Version:** 1.0.0
**Status:** Not yet configured for publishing

**Credentials Location:**
- **NPM Token:** Not yet configured
- **Required:** Run `npm login` or set NPM_TOKEN environment variable
- **Scope:** `@zerodb` (scoped package)

**Publishing Workflow:**
```bash
# Location
cd /Users/aideveloper/core/sdks/typescript/zerodb-mcp-client

# Run tests first
npm test

# Build distribution
npm run build
# Creates: dist/ folder with compiled TypeScript

# Login to NPM (first time only)
npm login

# Publish to NPM
npm publish --access public
# (--access public required for scoped packages)

# Verify live package
npm view @zerodb/mcp-client version
```

**Important Notes:**
- NPM requires authentication token or `npm login`
- Scoped packages (`@zerodb/`) require `--access public` flag
- Can unpublish within 72 hours (but discouraged)
- Version numbers should follow semantic versioning

---

## Key Contacts & Resources

- **Production API**: https://api.ainative.studio
- **Railway Dashboard**: https://railway.app
- **Stripe Dashboard**: https://dashboard.stripe.com
- **Kong Admin**: http://localhost:8001 (development)
- **Documentation**: `/docs` directory
- **PyPI Package**: https://pypi.org/project/zerodb-mcp/
- **NPM Package**: https://npmjs.com/package/@zerodb/mcp-client (future)

---

## 🚨 FINAL REMINDER 🚨

**BEFORE EVERY COMMIT:**
1. ❓ Does my commit message contain "Claude", "Anthropic", or AI tool references?
2. ❓ Does my commit message have attribution footers or emoji?
3. ❓ Did I test my changes locally?

**IF YES TO 1 OR 2:** ❌ **STOP! REMOVE FORBIDDEN TEXT!**
**IF NO TO 3:** ❌ **STOP! TEST FIRST!**

**Automated hook will block commits with forbidden text.**

---

**Last Updated**: 2025-12-18
**Status**: Active Development
**Version**: Production-ready backend with comprehensive features
