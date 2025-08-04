# Mod18 CAPSTONE PROJECT: Pro-Tasker Frontend Develpoment

Pro-Tasker is a RESTful API for managing users, projects, and tasks. It uses JWT-based authentication and enforces ownership-based authorization to ensure data privacy and integrity. The Frontend was developed utilizing solutions from REACT, AXIOS, and TAILWINDS.

## Table of contents

- [Overview](#overview)
  - [Links](#links)
  - [Screenshot](#screenshot)
- [Deployment Steps](#my-process)
  - [Requirements](#requirements)
  - [Creat Account](#create-account-if-necessary)
  - [Configure Netlify](#configure-netlify)
  - [Netlify](#netlfiy-configuration-and-deployment-process)
  - [Troubleshooting](#troubleshooting)
  - [Local Development](#local-deployment)
- [Directory](#directory)
- [Project Setup](#project-setup)
- [Features](#features)
- [Useful resources](#useful-resources)
- [Acknowledgments](#acknowledgments)

## Overview

This is a capstone project designed to synthesize the skills learned across multiple **Per Scholas** _Software Engineer_ modules. It is designed to plan and execute the development of a real-world, secure, and functional RESTful API from the ground up. Success will require careful planning, clean code, and a solid understanding of authentication and authorization principles.

### Links

- Solution URL: [GitHub: ProTasker Backend](https://github.com/DblRH600/pro-tasker-backend)
- Live Site URL: [Pro Tasker](https://protaskmanaging.netlify.app/)

### Screenshots

![](./src/assets/images/Deployed_Desktop/Desktop_Proj_Create_Form.jpg)

![](./src/assets/images/Deployed_Desktop/Desktop_Proj_Display.jpg)

![](./src/assets/images/Deployed_Mobile/Mobile_Proj_Create_Form.jpg)

![](./src/assets/images/Deployed_Mobile/Mobile_Proj_Display.jpg)

## Deployment Steps

### Requirements

- React
- Vite
- Axios
- Tailwinds
- React-Router-DOM
- DOTENV
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Git
- GitHub Acc
- Netlify Acc

### Create Account (if necessary)

1. Create a GitHub Acc
   1 - Create a Repopository (Repo)

2. Create Netlify Acc

### Netlfiy Configuration and Deployment Process

1. Log in to Netlify Dasboard
2. Click on Projects
3. Click "Add New Project" and select "Import an Existing Project"
4. Connect the GitHub Repo
5. Configure Services:
  Project Name: Repo-Name (if not taken)
  Add Environment Variables: VITE_BACKEND_URL
  Click Deploy "repo-name"

### Troubleshooting

- Check Netlify logs for deployment errors
- Ensure all environment variables are set correctly
- Check if the build process completes successfully

### Local Deployment

## Directory
```
pro-tasker/
└── frontend/
    ├── public/
    │   └── _redirects
    ├── src/
    │   ├── components/
    │   │   ├── Carousel.jsx
    │   │   ├── Footer.jsx
    │   │   ├── InviteButton.jsx
    │   │   └── Navbar.jsx
    │   ├── context/
    │   │   └── UserContext
    │   ├── css/
    │   │   └── carousel.css
    │   ├── data/
    │   │   └── carouselData.json
    │   └── pages/
    │       ├── About.jsx
    │       ├── Home.jsx
    │       ├── NotFound.jsx
    │       ├── Project.jsx
    │       └── Registration.jsx
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── .env
    ├── .env.production
    ├── .gitignorre
    ├── index.html
    └── package.json
```

## Project Setup

1. Initialize Project
```bash
npm create vite@latest

>npx
>create-vite

◆  Project name:
│  vite-project
└

◆  Select a framework:
│  ○ Vanilla
│  ○ Vue
│  ● React
│  ○ Preact
│  ○ Lit
│  ○ Svelte
│  ○ Solid
│  ○ Qwik
│  ○ Angular
│  ○ Marko
│  ○ Others
└

◆  Select a variant:
│  ○ TypeScript
│  ○ TypeScript + SWC
│  ○ JavaScript
│  ● JavaScript + SWC
│  ○ React Router v7 ↗
│  ○ TanStack Router ↗
│  ○ RedwoodSDK ↗
│  ○ RSC ↗
└
```
2. CD Into Project Directory and Initialize
```bash
cd c:\...\viteproj
npm i axios dotenv react-router-dom
npm i tailwindcss @tailwindcss/vite
``` 
  [] *Note*: Any additional depedencies (e.g.: heroicons)installed are developer discretion based 

## Features

- **User Authentication**
  - Login and registration utilizing _hashed_ passwords
  - JWT-based secure sessions



## Useful resources

- [Documentation: React](https://react.dev/reference/react) - ***React.dev*** provides useful documentation and examples for how to use **useState** and **useCallback** hooks.

- [Documentation: tailwindcss](https://tailwindcss.com/docs/installation/using-vite) - ***tailwindscss*** was useful in helping to style the project.

- [Blog: How to use React Context effectively](https://kentcdodds.com/blog/how-to-use-react-context-effectively) - A blog by Kent Dodds on how to create and use React Context effectively

- [YouTube: Code Complete: Make an Image Carousel](https://www.youtube.com/watch?app=desktop&v=QpsGo8kZiTo)

## Acknowledgments

Abraham Tavarez
Colton Wright
Yusuf Bolden
John Alves
Code Complete

