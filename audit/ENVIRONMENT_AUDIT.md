# ENVIRONMENT_AUDIT.md - Environment Configuration & Secrets Audit

**Phase:** 3.3 - Environment Configuration Audit
**Date:** 2025-10-31
**Status:** ✅ COMPLETE

---

## Executive Summary

| Category | Status | Finding |
|----------|--------|---------|
| **.env File** | ✗ MISSING | Not found in repository |
| **.env.example** | ✗ MISSING | Users don't know requirements |
| **.gitignore** | ✓ CORRECT | Properly excludes .env |
| **Hardcoded Credentials** | ✗ CRITICAL | 5 locations found |
| **Environment Loading** | ✗ MISSING | No .env file loading |
| **Secrets Management** | ✗ MISSING | No strategy implemented |

---

## .env File Status

### Current Situation

| File | Location | Exists? | In .gitignore? | Status |
|------|----------|---------|---|--------|
| `.env` | Root backend/ | ✗ NO | ✓ YES | MISSING (correct) |
| `.env.local` | Root backend/ | ✗ NO | ✓ YES | MISSING (expected) |
| `.env.example` | Root backend/ | ✗ NO | N/A | MISSING (REQUIRED) |
| `.env` | Root frontend/ | ✗ NO | ✓ YES | MISSING (correct) |
| `.env.local` | Root frontend/ | ✗ NO | ✓ YES | MISSING (expected) |
| `.env.example` | Root frontend/ | ✗ NO | N/A | MISSING (REQUIRED) |

### .gitignore Configuration ✓ CORRECT

**File:** `.gitignore` (properly configured)

**Relevant entries:**
```bash
.env
.env.local
.env.*.local
.env*.local
```

**Assessment:** ✓ Good - Environment files are excluded from version control

---

## Environment Variables Required

### Backend Environment Variables

**Location:** `backend/.env` (should exist but doesn't)

**Required Variables (for production):**

| Variable | Current Value | Type | Required | Purpose |
|----------|---|------|----------|---------|
| `DATABASE_URL` | `postgresql+asyncpg://user:password@db/profile_doctor` | Hardcoded | ✓ YES | PostgreSQL connection |
| `REDIS_URL` | Not defined | Missing | ✓ YES | Redis connection (for Celery) |
| `SECRET_KEY` | Not defined | Missing | ✓ YES | JWT signing key |
| `API_KEY` | Not defined | Missing | ⚠️ Optional | Third-party API access |
| `ENVIRONMENT` | Not defined | Missing | ✓ YES | dev/prod/test |
| `DEBUG` | Not defined | Missing | ✓ YES | FastAPI debug mode |
| `LOG_LEVEL` | Not defined | Missing | ⚠️ Optional | Logging level |

### Frontend Environment Variables

**Location:** `frontend/.env` (should exist but doesn't)

**Required Variables (for production):**

| Variable | Current Value | Type | Required | Purpose |
|----------|---|------|----------|---------|
| `VITE_API_URL` | Not defined | Missing | ✓ YES | Backend API endpoint |
| `VITE_APP_NAME` | Not defined | Missing | ⚠️ Optional | Application name |
| `VITE_ENVIRONMENT` | Not defined | Missing | ⚠️ Optional | dev/prod/test |

---

## Backend Configuration Analysis

### File: `backend/app/config.py`

**Current Implementation:**
```python
from pydantic import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Profile Doctor"
    API_V1_STR: str = "/api/v1"
    DATABASE_URL: str = "postgresql+asyncpg://user:password@db/profile_doctor"

    class Config:
        case_sensitive = True

settings = Settings()
```

**Issues Found:**

1. ✗ **Hardcoded DATABASE_URL** (CRITICAL)
   - Credentials visible in source code
   - Line 6: `DATABASE_URL: str = "postgresql+asyncpg://user:password@db/profile_doctor"`
   - Username: `user` (hardcoded)
   - Password: `password` (hardcoded)

2. ✗ **No .env Loading** (CRITICAL)
   - Pydantic not configured to read .env file
   - No `env_file` parameter
   - Environment variables ignored

3. ✗ **Deprecated Pydantic Syntax** (HIGH)
   - Uses `from pydantic import BaseSettings` (v1 syntax)
   - Should use `from pydantic_settings import BaseSettings` (v2)
   - `class Config:` is deprecated
   - Should use `model_config = ConfigDict(env_file=".env")`

### Correct Implementation (Pydantic v2):

```python
from pydantic_settings import BaseSettings
from pydantic import ConfigDict

class Settings(BaseSettings):
    model_config = ConfigDict(env_file=".env")

    PROJECT_NAME: str = "Profile Doctor"
    API_V1_STR: str = "/api/v1"
    DATABASE_URL: str  # No default - must come from .env
    REDIS_URL: str = "redis://localhost:6379"
    SECRET_KEY: str  # Must be set in .env
    DEBUG: bool = False
    ENVIRONMENT: str = "development"

settings = Settings()
```

---

## Hardcoded Credentials Inventory

### 🔴 CRITICAL SECURITY ISSUE

**Total locations with hardcoded credentials: 5**

#### Location 1: docker-compose.yml:11
**Severity:** CRITICAL
```yaml
environment:
  - POSTGRES_USER=user
```
**Exposure:** Version control, Docker images, deployment logs
**Risk:** Anyone with access to repo can access database

#### Location 2: docker-compose.yml:19
**Severity:** CRITICAL
```yaml
environment:
  - POSTGRES_PASSWORD=password
```
**Exposure:** Version control, Docker images, deployment logs
**Risk:** Default credentials used across all environments

#### Location 3: docker-compose.yml:20
**Severity:** CRITICAL
```yaml
environment:
  - DATABASE_URL=postgresql+asyncpg://user:password@db/profile_doctor
```
**Exposure:** Version control, Docker images, deployment logs
**Risk:** Full database credentials exposed

#### Location 4: backend/app/config.py:6
**Severity:** CRITICAL
```python
DATABASE_URL: str = "postgresql+asyncpg://user:password@db/profile_doctor"
```
**Exposure:** Version control, Python module imports
**Risk:** Loaded into memory every time app starts

#### Location 5: backend/alembic.ini:87
**Severity:** CRITICAL
```ini
sqlalchemy.url = postgresql+asyncpg://user:password@db/profile_doctor
```
**Exposure:** Version control, Alembic migrations
**Risk:** Database credentials in migration configuration

### Remediation Required

```bash
# Step 1: Create .env files with environment variables
cat > backend/.env << EOF
DATABASE_URL=postgresql+asyncpg://user:password@db/profile_doctor
REDIS_URL=redis://redis:6379
SECRET_KEY=$(openssl rand -hex 32)
DEBUG=False
ENVIRONMENT=development
EOF

# Step 2: Update app/config.py to read from .env
# Step 3: Update docker-compose.yml to use ${VAR_NAME}
# Step 4: Remove hardcoded values from source
# Step 5: Rotate all exposed credentials in production
```

---

## Docker Compose Configuration

### File: `docker-compose.yml`

**Issues Found:**

#### Issue 1: Hardcoded Secrets
```yaml
backend:
  environment:
    - DATABASE_URL=postgresql+asyncpg://user:password@db/profile_doctor  # ✗ HARDCODED

db:
  environment:
    - POSTGRES_USER=user        # ✗ HARDCODED
    - POSTGRES_PASSWORD=password  # ✗ HARDCODED
```

#### Issue 2: No Environment File Integration
```yaml
# CURRENT (WRONG):
- DATABASE_URL=postgresql+asyncpg://user:password@db/profile_doctor

# CORRECT:
- DATABASE_URL=${DATABASE_URL}  # Read from .env
```

#### Issue 3: Missing Environment File
No `.env` file provided:
```bash
docker-compose --env-file .env up  # Works if .env exists
```

### Correct Docker Compose Pattern:

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "${BACKEND_PORT:-8000}:8000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
      - SECRET_KEY=${SECRET_KEY}
      - DEBUG=${DEBUG:-false}
      - ENVIRONMENT=${ENVIRONMENT:-development}
    depends_on:
      - db
      - redis

  db:
    image: postgres:15
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
    volumes:
      - postgres_data:/var/lib/postgresql/data/

  redis:
    image: redis:7
```

---

## Alembic Configuration

### File: `backend/alembic.ini:87`

**Current (WRONG):**
```ini
sqlalchemy.url = postgresql+asyncpg://user:password@db/profile_doctor
```

**Assessment:** ✗ CRITICAL
- Hardcoded credentials visible in config file
- Not reading from environment

**Correct Approach (env.py):**

```python
# backend/alembic/env.py
from app.config import settings

# Use settings from app/config.py
sqlalchemy_url = settings.DATABASE_URL
config.set_main_option("sqlalchemy.url", sqlalchemy_url)
```

**alembic.ini should use:**
```ini
# Leave empty or use environment variable
sqlalchemy.url =
```

---

## .env.example Files (MISSING)

### Backend: `backend/.env.example`

**Status:** ✗ MISSING (REQUIRED)

**Should contain:**
```bash
# Database Configuration
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/profile_doctor

# Redis Configuration
REDIS_URL=redis://localhost:6379

# Security
SECRET_KEY=your-secret-key-here-minimum-32-characters

# Application Configuration
DEBUG=false
ENVIRONMENT=development
LOG_LEVEL=INFO

# Optional
API_KEY=
SENTRY_DSN=
```

### Frontend: `frontend/.env.example`

**Status:** ✗ MISSING (REQUIRED)

**Should contain:**
```bash
# API Configuration
VITE_API_URL=http://localhost:8000

# Application Configuration
VITE_ENVIRONMENT=development
VITE_APP_NAME=Profile Doctor

# Optional
VITE_SENTRY_DSN=
```

---

## Secrets Management Strategy

### Current State: ✗ NO STRATEGY

**Missing Components:**

1. ✗ **Secrets Manager**
   - No use of AWS Secrets Manager, Vault, etc.
   - No encryption at rest
   - Hardcoded in source code

2. ✗ **Environment Separation**
   - No dev/prod separation
   - Same credentials everywhere
   - No ability to rotate without code change

3. ✗ **Access Control**
   - No secret access logging
   - No audit trail
   - No rotation policy

### Recommended Secrets Management

**Development (Local):**
```bash
# .env file (not in git)
DATABASE_URL=...
SECRET_KEY=...
```

**Staging/Production (Docker):**
```bash
# Pass secrets via Docker secrets
docker run -e DATABASE_URL="$DATABASE_URL" ...

# Or use Docker secrets
docker secret create db_url -
docker service create --secret db_url backend_image
```

**Production (Cloud):**
```bash
# AWS Secrets Manager
aws secretsmanager get-secret-value --secret-id profile-doctor/db-url

# Kubernetes
kubectl create secret generic db-credentials --from-literal=url=...

# HashiCorp Vault
vault kv get secret/profile-doctor/database
```

---

## Security Checklist

| Item | Current | Required | Status |
|------|---------|----------|--------|
| Environment separation | ✗ None | Dev/Prod | ✗ FAILED |
| .env files in .gitignore | ✓ Yes | Yes | ✓ PASS |
| .env.example template | ✗ No | Yes | ✗ FAILED |
| Credentials in code | ✓ 5 locations | 0 | ✗ CRITICAL |
| Secrets manager | ✗ None | Yes | ✗ FAILED |
| Credential rotation policy | ✗ None | Yes | ✗ FAILED |
| Secret access logging | ✗ None | Yes | ✗ FAILED |
| Environment variables loading | ✗ No | Yes | ✗ FAILED |

---

## Configuration by Environment

### Development
```bash
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/profile_doctor
DEBUG=true
ENVIRONMENT=development
LOG_LEVEL=DEBUG
```

### Testing
```bash
DATABASE_URL=postgresql+asyncpg://test:test@localhost:5432/test_profile_doctor
DEBUG=false
ENVIRONMENT=testing
LOG_LEVEL=WARNING
```

### Production
```bash
DATABASE_URL=${AWS_SECRETS_MANAGER_DB_URL}  # From secrets manager
DEBUG=false
ENVIRONMENT=production
LOG_LEVEL=ERROR
SECRET_KEY=${AWS_SECRETS_MANAGER_SECRET_KEY}
```

---

## Recommendations

### Phase 1: IMMEDIATE (Before any deployment)
- [ ] Create `.env.example` files
- [ ] Create `.env` files for local development
- [ ] Update `app/config.py` to read from .env
- [ ] Update `docker-compose.yml` to use environment variables
- [ ] Remove hardcoded credentials from source code
- [ ] Rotate all exposed credentials

### Phase 2: SHORT TERM (Week 1-2)
- [ ] Implement environment-specific configurations
- [ ] Set up CI/CD secret injection
- [ ] Add secret detection to pre-commit hooks
- [ ] Document environment setup procedure

### Phase 3: MEDIUM TERM (Week 2-4)
- [ ] Implement secrets manager (AWS/Vault)
- [ ] Set up credential rotation automation
- [ ] Add audit logging for secret access
- [ ] Implement secret scanning in CI/CD

---

## Current Risk Assessment

| Risk | Severity | Impact | Timeline |
|------|----------|--------|----------|
| Hardcoded credentials in repo | 🔴 CRITICAL | Data breach if repo compromised | IMMEDIATE |
| Hardcoded credentials in Docker | 🔴 CRITICAL | Exposed in images, logs | IMMEDIATE |
| No environment separation | 🔴 CRITICAL | Same creds for dev/prod | IMMEDIATE |
| No .env template | 🟡 HIGH | Operator confusion | WEEK 1 |
| No secrets manager | 🟡 HIGH | Difficult to rotate secrets | WEEK 1-2 |

---

**Report Generated:** 2025-10-31
**Audit Phase:** 3.3 Complete

---

## Action Items Summary

✓ **Create backend/.env.example** with all required variables
✓ **Create frontend/.env.example** with all required variables
✓ **Fix Pydantic configuration** to read from .env
✓ **Remove hardcoded credentials** from all files
✓ **Update docker-compose.yml** to use environment variables
✓ **Rotate credentials** in production

**Security Priority:** CRITICAL - These are blocking issues for any environment
