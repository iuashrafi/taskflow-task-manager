# Task Management Application

This is a task management application built with React for the frontend and FastAPI for the backend.

## Table of Contents

- [Screenshots](#screenshots)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)

## Screenshots

![ss1](https://github.com/iuashrafi/taskflow-task-manager/blob/main/screenshots/ss1.png)

![ss2](https://github.com/iuashrafi/taskflow-task-manager/blob/main/screenshots/ss2.png)

## Features

- Create, update, delete tasks
- Mark tasks as complete/todo/progress by `Custom Drag and Drop` Feature
- Sort tasks based on title
- Create Workspaces(as an auth)

## Technologies

- **Frontend:** React, TailwindCss
- **Backend:** FastAPI, SQLAlchemy
- **Database:** SQLite (or any other database of your choice)

## Installation

### Prerequisites

- Node.js and npm installed on your machine
- Python 3.11+ installed on your machine
- Virtual environment tool (e.g., `venv` or `virtualenv`)

### Clone the Repository

```bash
git clone https://github.com/iuashrafi/taskflow-task-manager.git
cd taskflow-task-manager
```

### Client Setup

1. Navigate to `/client` folder from `taskflow-task-manager` folder
   ```bash
   cd client
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Start the development server
   ```bash
   npm run dev
   ```

### Server side setup

1. On the seperate terminal window navigate to `/server` folder from `taskflow-task-manager` root folder
   ```bash
   cd server
   ```
2. Create virtual environment
   ```bash
   py -m venv venv
   ```
3. Activate the venv
   - On windows :
     ```bash
     venv\Scripts\activate.bat
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```
4. Install the dependencies
   ```bash
   pip install -r requirements.txt
   ```
5. Start the server
   ```bash
   uvicorn main:app --reload
   ```

## Usage

- Open your browser and navigate to `http://localhost:5173` to access the Client side.
- The FastAPI backend can be accessed at `http://localhost:8000`.
