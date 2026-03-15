# Деплой на GitHub Pages

Сайт настроен на хостинг через GitHub Actions.

## После первого пуша

1. Открой репозиторий: https://github.com/crowyy03/vilins
2. **Settings** → **Pages**
3. В блоке **Build and deployment** выбери **Source: GitHub Actions**
4. Сохрани. После успешного запуска workflow сайт будет доступен по адресу:
   **https://crowyy03.github.io/vilins/**

## Локальная разработка

- Без basePath: `npm run dev` — сайт как обычно на http://localhost:3000
- С basePath (как на GitHub): `NEXT_PUBLIC_BASE_PATH=/vilins npm run dev` — тогда ссылки и ассеты с префиксом `/vilins`

## Что загружается в репозиторий

- Исходный код (src, public, конфиги)
- Вся папка **public/** (hero.mp4, scene/*.mp4, scene/*.jpeg, placeholders/*.svg, .nojekyll)
- **.github/workflows/deploy.yml** — сборка и деплой при пуше в `main`

Папки `node_modules`, `.next`, `out` в репозиторий не попадают (см. .gitignore).
