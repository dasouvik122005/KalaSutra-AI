# Security Policy

## Supported Versions

Currently, only the latest version on the `main` branch is actively supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| `main`  | :white_check_mark: |
| Older   | :x:                |

## Reporting a Vulnerability

Security is a priority for KalaSutra AI. If you discover a security vulnerability within this project, please **do not open a public issue**. 

Instead, please report the vulnerability privately by contacting the maintainers directly or utilizing GitHub's private vulnerability reporting feature (if enabled on the repository).

Please include the following details in your report:
* A description of the vulnerability.
* Steps to reproduce the issue.
* Any potential impact or risk associated with the vulnerability.

We will endeavor to respond to your report within 48 hours and work with you to resolve the issue as quickly as possible.

### Dependency Security

We regularly update our dependencies to patch known vulnerabilities. If you notice an outdated dependency with a known CVE, feel free to open a Pull Request bumping the version in `requirements.txt` or `package.json`.
