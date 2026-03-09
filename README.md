# TaskFlow Lite

TaskFlow Lite — це легкий курсовий проєкт на **React + Redux Toolkit**, створений за структурою, яка готова до подальшої інтеграції з бекендом.

## Обрана тема

**Система управління завданнями (ToDo / Task Manager)**

Чому ця тема хороша для курсової:
- легка для реалізації;
- показує знання React, Redux Toolkit, slices і thunks;
- легко масштабується до повноцінного fullstack-проєкту;
- добре підходить для інтеграції з API у майбутньому.

## Функціонал

- додавання нових задач;
- видалення задач;
- зміна статусу задачі (виконано / в роботі);
- фільтрація за статусом;
- фільтрація за пріоритетом;
- пошук по задачах;
- статистика по задачах;
- збереження задач у `localStorage`;
- асинхронні `thunks` для імітації API-запитів.

## Технології

- React
- Vite
- Redux Toolkit
- React Redux
- React Router DOM
- CSS

## Структура проєкту

```bash
src/
├── app/
├── components/
├── features/
│   └── tasks/
├── layouts/
├── pages/
├── routes/
├── services/
└── utils/
```

## Встановлення та запуск

1. Створити проєкт через Vite:

```bash
npm create vite@latest my-react-app -- --template react
cd my-react-app
```

2. Замінити файли на код із цього проєкту.

3. Встановити залежності:

```bash
npm install
```

4. Запустити локально:

```bash
npm run dev
```

## Деплой

Для деплою можна використати:
- Vercel
- Netlify

### Приклад деплою на Vercel

```bash
npm install -g vercel
vercel
```

## Демо

Після деплою додай сюди своє посилання:

```md
Demo: https://your-project-name.vercel.app
```

## Репозиторій

Після завантаження на GitHub додай сюди посилання:

```md
Repository: https://github.com/your-username/your-repo-name
```

## Що показує цей проєкт викладачу

- вміння працювати з React;
- використання Redux Toolkit;
- організацію коду по модулях;
- роботу зі станом через `slice`;
- асинхронну логіку через `createAsyncThunk`;
- готовність фронтенду до інтеграції з бекендом.
