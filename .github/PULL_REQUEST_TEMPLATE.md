# 🧠 Profile Doctor — Pull Request Template

> This PR template ensures that all changes in **Profile Doctor** comply with security, stability, and architectural standards.
> Please complete all sections before requesting review.

---

## 📋 Summary

**Describe the purpose of this PR:**
- What issue or feature does it address?
- Which module(s) are affected (e.g., scanner, backup, repair, API, frontend)?
- Is it a fix, enhancement, or new feature?

---

## 🔗 Related Requirements / Issues

- Functional Requirement(s): `FR#___`
- Security Requirement(s): `SR#___`
- Related Issue / Ticket: `#___`

---

## 🧱 Type of Change

| Type | Description | Select |
|------|--------------|--------|
| 🔧 Bug Fix | Non-breaking fix for an issue | [ ] |
| 🚀 Feature | New functionality or endpoint | [ ] |
| 🧰 Refactor | Internal change (no API alteration) | [ ] |
| 🧩 Security | Improves encryption, auth, or validation | [ ] |
| 🧪 Tests | Adds/updates test coverage | [ ] |
| 📘 Docs | Updates documentation or PRD references | [ ] |

---

## 🧪 Testing Performed

| Test Type | Description | Status |
|------------|--------------|--------|
| Unit Tests | Core logic validation | ✅ / ⚠️ / ❌ |
| Integration Tests | API, DB, and service interaction | ✅ / ⚠️ / ❌ |
| Security Tests | Bandit, pip-audit, Trivy, OWASP ZAP | ✅ / ⚠️ / ❌ |
| Linting | Black, Flake8, Mypy | ✅ / ⚠️ / ❌ |
| Manual Verification | UX, UI, performance | ✅ / ⚠️ / ❌ |

> Attach logs or screenshots if applicable.

---

## 🔐 Security Review Checklist

Please confirm the following before requesting merge:

- [ ] Input validation added via Pydantic or frontend schema
- [ ] Secrets are NOT hardcoded
- [ ] JWT & encryption keys handled via Vault/KMS or env vars
- [ ] AES encryption implemented correctly (no reused nonces/IVs)
- [ ] ORM/parameterized queries used — no raw SQL
- [ ] Logs redact PII and error traces
- [ ] API endpoints secured with proper roles/scopes
- [ ] Rate limiting enforced for sensitive routes
- [ ] Bandit + pip-audit + Trivy scans passed
- [ ] Code references relevant FR# and SR#

---

## 🧾 Documentation Updates

- [ ] Updated `README.md` or `/docs/`
- [ ] Added new endpoint to API reference
- [ ] Added comments or docstrings referencing FR/SR

---

## 🧭 Reviewer Guidance

**Recommended reviewers:**
- Security lead (for crypto/auth logic)
- Backend architect (for DB/API changes)
- Frontend engineer (for UX flows)
- QA engineer (for regression testing)

---

## ✅ Final Notes

> ⚠️ Merging is blocked unless **all security and test checks** pass in CI/CD.
> PR will trigger automated scans for:
> - Static analysis (`bandit`)
> - Dependency checks (`pip-audit`)
> - Container scan (`trivy`)
> - Unit + integration tests

---

### 🧩 Signature

**Author:**
**Date:**
**Role:**
**Reviewer (Security):**
**Reviewer (Lead):**
