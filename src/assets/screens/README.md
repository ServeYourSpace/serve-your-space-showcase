# App captures per language and theme

Drop captures of the app here; the site picks the right one automatically
when the visitor changes language or theme. No code change needed.

Name: `<screen>.<lang>.<theme>.webp` (png/jpg also work)

- `<screen>`: welcome, home, dashboard, servibot, profile, signup, otp, settings, menu
- `<lang>`: en, fr, ar
- `<theme>`: light, dark

Examples: `home.ar.dark.webp`, `dashboard.fr.light.webp`.
`home.ar.webp` (any theme) and `home.dark.webp` (any language) also work.

Order used: language + theme → language → theme → the default captures in `public/screenshots/`.
Tip: portrait capture, about 720 px wide, WebP.
