# Dev Portfolio (Курсовая)

**Тема курсовой работы:**  
Разработка многостраничного веб-портфолио программиста с использованием HTML5, CSS3, JavaScript и Node.js

Многостраничный веб-сайт портфолио разработчика с локальным сервером для разработки и тестирования.

## Запуск локально

```bash
npm start
```

Для меня `http://localhost:3000`.

## Docker

### Для учителя (запуск из Docker Hub)

```bash
docker pull humalog/sdm-portfolio:latest
docker run --rm -p 3000:3000 humalog/sdm-portfolio:latest
```

Откройте `http://localhost:3000`.

### Для разработки (сборка из исходников)

```bash
docker build -t humalog/sdm-portfolio:latest .
docker run --rm -p 3000:3000 humalog/sdm-portfolio:latest
```

## Страницы
- Главная: `/index.html`
- Проекты: `/projects.html`
- Обо мне: `/about.html`

## Технологии
- **HTML5** — семантическая разметка
- **CSS3** — современные возможности (Grid, Flexbox, CSS Variables, transitions)
- **JavaScript (ES2023)** — интерактивность без фреймворков
- **Node.js** — локальный сервер для разработки

## Структура проекта
```
portfolio/
├── public/              # Статические файлы сайта
│   ├── assets/
│   │   ├── css/        # Стили
│   │   ├── js/         # JavaScript
│   │   └── img/        # Изображения
│   ├── *.html          # Страницы сайта
│   └── sitemap.xml     # Карта сайта
├── server.js           # Node.js сервер для разработки
├── package.json        # Конфигурация проекта
└── README.md           # Документация
```

