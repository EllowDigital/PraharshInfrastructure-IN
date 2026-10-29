# Praharsh Infrastructure Website

A public-facing website for Praharsh Infrastructure, presenting the company's infrastructure and supply-service portfolio, business information, and contact pathways.

## Project overview

The site is built as a responsive frontend intended to communicate the company’s services clearly across desktop and mobile browsers. Business claims, project credentials, service areas, and contact information should be checked by the company before each release.

## Technology stack

- React and TypeScript
- Vite
- Tailwind CSS and reusable UI components
- ESLint and TypeScript checks
- Netlify-compatible deployment configuration

See `package.json` for the exact dependency and script list.

## Local development

Requirements: Node.js and npm.

```bash
git clone https://github.com/EllowDigital/PraharshInfrastructure-IN.git
cd PraharshInfrastructure-IN
npm ci
npm run dev
```

## Build and checks

```bash
npm run check
npm run build
npm run preview
```

The `check` script runs the configured type, lint, and build steps. Verify all commands against `package.json` if the project scripts change.

## Environment configuration

A sample environment file is available at `.env.example`. Use only values required for your own local environment, and keep local overrides out of source control.

- Never put SMTP passwords, mail-provider API keys, private database URLs, or other server-side secrets into variables exposed to the browser.
- If mail or contact forms use a backend function, keep credentials server-side and validate requests.
- Use synthetic data while developing.

## Deployment checklist

Before release, verify:

- Business details, telephone/email links, and project information
- Canonical domain, page titles, descriptions, and social metadata
- Mobile layout, keyboard navigation, forms, and external links
- Hosting environment variables and build output directory
- No test configuration or private credentials are included in the client bundle

## Security and privacy

Do not publish customer information, internal documents, or production logs. Report suspected vulnerabilities privately to the maintainer rather than adding exploit details to public issues.

## License

See [LICENSE](LICENSE). This repository does not grant open-source reuse of its code, branding, content, or assets unless the applicable rights holder explicitly authorizes it. Third-party dependencies retain their own licenses.
