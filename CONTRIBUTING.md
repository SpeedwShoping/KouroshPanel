# Contributing to Kourosh Panel — مشارکت در پنل کوروش

Thanks for your interest in improving Kourosh Panel! 👑

از علاقه شما به بهبود پنل کوروش متشکریم!

## How to contribute

1. **Fork** the repository and create a feature branch from `main`
2. Make your changes (see build instructions below)
3. Run the checks before opening a PR:
   ```bash
   cd frontend
   npm run typecheck && npm run test && npm run build
   ```
4. Open a **Pull Request** with a clear description of what and why

## Development setup

- **Backend:** Go 1.26+ — `go run main.go`
- **Frontend:** Node 24+ — `cd frontend && npm install && npm run dev`
- The frontend build output is embedded into the Go binary from `internal/web/dist`

## Reporting bugs / گزارش باگ

Use the [issue templates](https://github.com/SpeedwShoping/KouroshPanel/issues/new/choose). Include your panel version, OS, and reproduction steps.

برای گزارش باگ از قالب‌های Issue استفاده کنید و نسخه پنل، سیستم‌عامل و مراحل بازتولید مشکل را ذکر کنید.

## Contact / ارتباط

- Admin: [@SpeedwShop](https://t.me/SpeedwShop)
- Channel: [@SpeedShopw](https://t.me/SpeedShopw)
