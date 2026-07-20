# Security Policy — سیاست امنیتی

## Supported Versions

| Version | Supported |
| ------- | --------- |
| 1.x     | ✅        |

## Reporting a Vulnerability — گزارش آسیب‌پذیری

If you discover a security vulnerability in Kourosh Panel, please report it privately:

- **Telegram (Admin):** [@SpeedwIT](https://t.me/SpeedwIT)
- Or open a private [Security Advisory](https://github.com/SpeedwiT/KouroshPanel/security/advisories/new) on GitHub

Please do **not** open a public issue for security problems.

اگر آسیب‌پذیری امنیتی در پنل کوروش پیدا کردید، لطفاً به‌صورت خصوصی از طریق تلگرام [@SpeedwIT](https://t.me/SpeedwIT) گزارش دهید و آن را به‌صورت عمومی در Issues منتشر نکنید.

## Hardening Tips — نکات امنیتی

- Always run the panel behind **TLS** (menu option 20: SSL Certificate Management)
- Change the default web base path and port after install
- Enable **Two-Factor Authentication** in Settings → Security
- Use the **IP Limit** feature (menu option 22) with Fail2ban
- Keep the panel updated: `kourosh` → Update
