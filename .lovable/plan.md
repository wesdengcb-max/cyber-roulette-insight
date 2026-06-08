Refactor and harden the application's security posture while maintaining high performance and the premium "JapaStore" aesthetic.

### Security Audit & Remediation Plan

#### 1. Implementation of Security Headers (Application Layer Hardening)
- Configure **Content Security Policy (CSP)** to mitigate XSS and unauthorized data injection.
- Enforce **HSTS (HTTP Strict Transport Security)** for secure connections.
- Set **X-Frame-Options** to prevent clickjacking and **X-Content-Type-Options** to prevent MIME-type sniffing.

#### 2. Input Validation & Sanitization (OWASP Top 10 Mitigation)
- Introduce a standardized validation layer using **Zod** for any user-facing inputs (e.g., search queries, support form entries).
- Sanitize dynamic values used in the DOM to prevent DOM-based XSS.

#### 3. Asset Security & Performance (Staff Engineer level optimizations)
- Implement `fetchpriority="high"` for the LCP image.
- Add `decoding="async"` and `loading="lazy"` where applicable to optimize CWV.
- Ensure all external links use `rel="noopener noreferrer"` to prevent tab-nabbing.

#### 4. Environment & Secrets Audit
- Audit the codebase for hardcoded keys or sensitive PII.
- Move any static configuration strings that might be sensitive to environment variables if detected.

#### 5. Dependency & Versioning
- Ensure all critical dependencies are pinned or within safe ranges (already verified with `dependency_scan`).

### Technical Implementation Details

- **CSP Configuration**: I will add a `head` meta tag in the main route to define a strict but functional CSP tailored for a React/Framer-Motion application.
- **Strict Typing**: Refactor any `any` types in `ReviewCard` and `ProductCard` to strongly typed interfaces to prevent runtime vulnerabilities and logic errors.
- **Sanitization**: Ensure that the `whatsappLink` and other dynamic strings are properly encoded.

### Validation Strategy
- Verify the `head` metadata reflects the new security headers.
- Check the browser console for CSP violations to ensure no breakage.
- Run a build to ensure type-safety remains intact.