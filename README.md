# Mod18 CAPSTONE PROJECT: Pro-Tasker Frontend Develpoment

This is a solution using Express, MongoDB, Mongoose, bcryot, jsonwebtoken, and dotenv to build out [Module 14 SBA](https://ps-lms.vercel.app/curriculum/se/419).

TaskMaster is a RESTful API for managing users, projects, and tasks. It uses JWT-based authentication and enforces ownership-based authorization to ensure data privacy and integrity.

## Table of contents

- [Overview](#overview)
  - [Key Concepts](#key-concepts)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Reflections](#reflections)
  - [Useful resources](#useful-resources)
- [Acknowledgments](#acknowledgments)

## Overview

This is a capstone project designed to synthesize the skills learned across multiple modules. It is designed to plan and execute the development of a real-world, secure, and functional RESTful API from the ground up. Success will require careful planning, clean code, and a solid understanding of authentication and authorization principles.

This project emphasizes the DRY (Don’t Repeat Yourself) principle. You are strongly encouraged to reference, reuse, and adapt the code and patterns you have developed in the labs and lessons from previous modules.

### Key Concepts

- Client-Server Separation: The frontend and backend operate independently. Clients interact with the server via clearly defined endpoints (URIs).

- Stateless Requests: Each request includes all necessary information. The server does not remember previous interactions.

- Uniform Interface:

  - Resource-Based URLs: Use nouns to represent resources (e.g., /api/products).

  - HTTP Methods (Full CRUD Implementation):

    - GET: Retrieve data
    - POST: Create new data
    - PUT / PATCH: Update data
    - DELETE: Remove data
    - QUERY: Search and Filter data based on search criteria

  - Standard Format: Data is exchanged in JSON.

- Authentication and Authorization

Understanding these REST principles is essential before working with or extending this API.

### Links

- Solution URL: [GitHub: taskmaster-api](https://github.com/DblRH600/taskmaster-api)
- Live Site URL: [Render: taskmaster-api](https://taskmaster-api-h91d.onrender.com)

## My process

### Built with

- NPM
- Node.js
- Express
- DOTENV
- MongoDB
- Mongoose
- JSONWEBTOKEN
- BCRYPT

### What I learned

Building the _TaskMaster-API_ tested my understanding of **_Express_**, **_Mongoose_**, and how to set up the **_Project Structure & Configuration_** correctly. Additionally, the project further tested my understanding of how to setup **_express.Router()_** routes as well as futher practice with utilizing **try** / **catch** blocks for **error** handling using **_async_** / **_await_** functions and implementing full **CRUD** functions.

```js Project Schema
import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
```

```js projects route
import express from 'express'
import { authMiddleware as protect } from '../utils/auth.js'
import Project from '../models/Project.js'

const router = express.Router()
router.use(protect)

/**
 * POST api/projects
 * @description route for project creation
 */
router.post('/', async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      user: req.user._id
    })
    res.status(201).json(project)
  } catch (err) {
    console.error(err)
    res.status(400).json({ message: err.message })
  }
})

/**
 * PUT api/projects/:id
 * @description route for updating project data
 */
router.put('/:id', async (req, res) => {
  try {
    const projectUpdate = await Project.findById(req.params.id)

    if (!projectUpdate) {
      return res
        .status(404)
        .json({ message: 'Project not found under this id' })
    }

    if (!projectUpdate.user.equals(req.user._id)) {
      return res
        .status(403)
        .json({ message: 'Updates to this project are authorized by the user' })
    }

    await projectUpdate.set(req.body).save()

    res.json(projectUpdate)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
})
```

### Continued development

There is still a _well_ of _informaiton_ to learn and _apply_ regarding the use of **Express**, **MongoDB**, **Mongoose**, **JSON WEB Token** and the many functions and performances that can be used in setting up a **server**. Gaining a deeper understanding of full **CRUD** implementation will help with the next phases of **_Full-Stack_** Development; establishing the **Front-End** to **Server** to **DataBase** connection.

### Reflections

### Useful resources

- [EXPRESSJS.COM](https://expressjs.com/en/5x/api.html#res.sendFile) - **_expressjs.com_** contains well documented information details about **routes**.

- [MONGOOSE](https://mongoosejs.com/docs/index.html) - **_mongoosejs.com_** can be used to deepen one's understanding about the functionality **mongoose** is capable of performing that can be incorporated into a **server**.

- [REST API Tutorial](https://restfulapi.net/) - **_restfulapi.net_** provides background information and tutroials on how to build web-based **APIs** (_Application Programming Interfaces_).

- [Blog: How to Build a RESTful API Using Node, Express, and MongoDB](https://www.freecodecamp.org/news/build-a-restful-api-using-node-express-and-mongodb/)

## Acknowledgments

