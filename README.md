# TaskFlow Lite

**TaskFlow Lite** is a lightweight task management web application built with **React, Redux Toolkit, and Vite**.
The project was developed as a **coursework assignment** and demonstrates modern frontend architecture, state management, and scalable project structure prepared for future backend integration.

The application allows users to create, manage, filter, and organize tasks with categories, priorities, and scheduling features.

---

# Demo

**Live Demo:**
https://task-flow-lite-two.vercel.app/

**GitHub Repository:**
https://github.com/kama04/TaskFlow-Lite

---

# Project Topic

**Task Management System (ToDo / Task Manager)**

This topic was chosen because it allows demonstrating:

* React component architecture
* Redux Toolkit state management
* modular project structure
* routing with React Router
* UI state logic
* scalability for future backend integration

The project can later evolve into a **full-stack application** by connecting it to an API.

---

# Features

The application includes the following functionality:

### Task Management

* create new tasks
* delete tasks
* mark tasks as completed
* update task status (in progress / done)

### Task Organization

* categories (Study, Work, Personal, Health)
* priority levels (Low, Medium, High)
* task start date and end date

### Filtering and Search

* search tasks by title or description
* filter by status
* filter by priority
* filter by category

### Task Visualization

* animated task cards
* progress bar showing completion status
* drag & drop task reordering

### Additional Pages

* **Schedule page** with calendar
* **Categories page**
* **Contacts page**
* **About page**

### Other Features

* dark / light theme switch
* language switch (Ukrainian / English)
* data persistence using `localStorage`
* responsive UI

---

# Technologies Used

* **React**
* **Vite**
* **Redux Toolkit**
* **React Redux**
* **React Router DOM**
* **Bootstrap**
* **Bootstrap Icons**
* **React Calendar**
* **CSS with theme variables**

---

# Project Structure

```
src/
│
├── app/
│   ├── store.js
│   └── hooks.js
│
├── components/
│   ├── Header.jsx
│   └── Footer.jsx
│
├── features/
│   └── tasks/
│       └── model/
│           ├── tasksSlice.js
│           └── preferencesSlice.js
│
├── layouts/
│   └── MainLayout.jsx
│
├── pages/
│   ├── HomePage.jsx
│   ├── AboutPage.jsx
│   ├── ContactPage.jsx
│   ├── SchedulePage.jsx
│   ├── CategoriesPage.jsx
│   └── CategoryDetailsPage.jsx
│
├── routes/
│   └── AppRoutes.jsx
│
├── shared/
│   └── config/
│       └── translations.js
│
├── App.jsx
├── main.jsx
└── index.css
```
# Architecture

TaskFlow Lite follows a **modular and scalable frontend architecture**, designed to keep business logic separated from UI components and to prepare the application for future backend integration.

The project is organized using a **feature-based structure**, where each feature contains its own logic, components, and state management.

## Architectural Principles

The application follows several key frontend architecture principles:

### 1. Separation of Concerns

The project separates different responsibilities:

* **UI components** are responsible only for rendering the interface.
* **Redux slices** manage application state and logic.
* **Pages** combine components into complete screens.
* **Routes** handle navigation between pages.
* **Services and utilities** contain reusable helper logic.

This makes the code easier to maintain, extend, and test.

---

### 2. Feature-Based Structure

Instead of grouping files only by type, the project groups them by **features**.

Example:

```
features/
   tasks/
      components/
      model/
      api/
```

This approach improves scalability because each feature becomes a self-contained module.

---

### 3. State Management with Redux Toolkit

Global state is managed using **Redux Toolkit**.

Redux is used for:

* storing the list of tasks
* managing filters
* handling UI preferences (theme and language)

Each logical part of the state is defined using **slices**.

Example:

```
tasksSlice.js
preferencesSlice.js
```

Slices contain:

* initial state
* reducers
* actions
* optional async logic

---

### 4. Prepared for API Integration

Although the current version works fully on the frontend, the architecture is prepared for backend integration.

Redux Toolkit allows easy integration with APIs using:

```
createAsyncThunk
```

This makes it possible to replace `localStorage` with real server requests in the future without major architectural changes.

---

### 5. Routing Architecture

Navigation is implemented using **React Router**.

The application uses a layout-based routing structure:

```
App
 └ Routes
     └ MainLayout
         ├ Header
         ├ Page Content
         └ Footer
```

This approach ensures that common layout components are reused across all pages.

---

### 6. Theming and Internationalization

The application includes:

* **Dark / Light theme switch**
* **Language switch (Ukrainian / English)**

Theme switching is implemented using **CSS variables**, while language switching uses a **translation configuration file**.

---

### 7. Client-Side Data Persistence

Task data is stored in the browser using:

```
localStorage
```

This allows the application to work without a backend while still preserving user data between sessions.

---

## Architectural Benefits

This architecture provides several advantages:

* scalable project structure
* clear separation of UI and logic
* easier debugging and maintenance
* preparation for full-stack development
* reusable components
* modular state management

---

# Installation

Clone the repository:

```
git clone https://github.com/kama04/TaskFlow-Lite.git
```

Navigate to the project directory:

```
cd TaskFlow-Lite
```

Install dependencies:

```
npm install
```

Run the development server:

```
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---

# Production Build

To create a production build:

```
npm run build
```

---

# Deployment

The project is deployed using **Vercel**.

Deployment steps:

1. Push the repository to GitHub.
2. Import the project into Vercel.
3. Vercel automatically installs dependencies and builds the project.

---

# Future Improvements

Possible improvements for the project:

* backend integration with REST API
* authentication system
* task deadlines and reminders
* drag & drop categories
* push notifications
* mobile-first UI optimization

---

# Author

Course project created as part of a **Frontend Development course**.

The goal of this project is to demonstrate:

* React component architecture
* Redux Toolkit state management
* modular project structure
* scalable frontend design prepared for backend integration
