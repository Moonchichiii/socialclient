# Social Food Posting - Frontend

<img src="readmecontent/responsive.png" alt="LandingPage">

## 👉 [Link to Live Project](https://socialclient-eaf34c2355da.herokuapp.com/) 

## Table of Contents

1. [Project Overview](#project-overview)
   - [Objective](#objective)
   - [User Interaction](#user-interaction)   
   - [Administrative Features](#administrative-features)
   - [Future Enhancements](#future-enhancements)
2. [Design & Planning](#design-and-planning)
   - [Kanban Board](#kanban-board)
   - [Mockups](#mockups)
   - [Mobile View](#mobile-view)
   - [Color Palette](#color-palette)
3. [Technologies](#technologies)
4. [Dependencies](#dependencies)
   - [Axios](#axios)
   - [Bootstrap](#bootstrap)
   - [React Loader Spinner](#react-loader-spinner)
   - [React Query](#react-query)
   - [Lodash](#lodash)
   - [JS Cookie](#js-cookie)
   - [FontAwesome](#fortawesome)
   - [Express](#express)
   - [Compression](#compression)
5. [Reusable Components](#reusable-components)
   - [Modal](#modal)
   - [PostCard](#postcard)
   - [Searchbar](#searchbar)
6. [Setup and Installation](#setup-and-installation)
   - [Clone the Repository](#clone-the-repository)
   - [Install Dependencies](#install-dependencies)
   - [Start the Development Server](#start-the-development-server)
7. [Testing](#testing)
   - [React Testing Library](#react-testing-library)
8. [Deployment](#deployment)
   - [Heroku Deployment](#heroku-deployment)
     - [Create a Heroku App](#create-a-heroku-app)
     - [Add Node.js Buildpack](#add-nodejs-buildpack)
     - [Build the Project](#build-the-project)
       - [Option 1: Build Locally](#option-1-build-locally)
       - [Option 2: Let Heroku Build](#option-2-let-heroku-build)
     - [Prepare the Project for Heroku Deployment](#prepare-the-project-for-heroku-deployment)
       - [Add a Procfile](#add-a-procfile)
       - [Configure package.json](#configure-packagejson)
     - [Deploy The Project](#deploy-the-project)
     - [Configure Environment Variables](#configure-environment-variables)
     - [Post-Deployment](#post-deployment)
9. [Credits](#credits)

## Project Overview

### Objective

The aim of the **Social Food Posting platform** is to provide a dynamic and simple space where users can:

- **Share their culinary creations:** Users can post photos, recipes, and descriptions of the dishes they created.
- **Connect with other food lovers:** Share ideas, inspire one another, and comment on their creations.

#### User Interaction

- **User Registration and Authentication:**
  - **Sign Up:** New users can register on the platform with a username, email, and password.
  - **Login/Logout:** Registered users can log in and out securely.
  - **Profile Management:** Users can create and manage their profiles, including uploading profile pictures and adding a bio.

- **Create Posts:**
  - **Post Creation:** Users can create posts with photos of their culinary creations, along with detailed descriptions, recipes, and ingredients.
  - **Edit and Delete Posts:** Users can edit or delete their posts as needed.

- **Follow Users:**
  - **Following and Followers:** Users can follow others to stay updated with their latest posts and activities.
  - **Follower Notifications:** Users receive notifications when they gain new followers.

- **Likes and Comments:**
  - **Liking Posts:** Users can like posts they find interesting or inspiring.
  - **Commenting on Posts:** Users can leave comments on posts to provide feedback, ask questions, or share thoughts.
  - **Comment Management:** Users can edit or delete their comments.

- **Explore and Discover:**
  - **Search Functionality:** Users can search for posts and users based on keywords.  

### Administrative Features

- **User Management:**
  - **Profile Update:** Able to update profile name (will not change the login username), update profile image, and add a bio.
  - **Content Moderation:** Super-users can review and moderate user-generated content to ensure it is valid to be published.

- **Analytics Insights:**
  - **Likes Tracking:** On the Popular Profiles page, users can follow other profiles and see a list of the most popular profiles based on likes on their posts.

### Future Enhancements

- **Dinner Clubs:** Host and invite other profiles for dinners at your home. (Ran out of time to add this feature.)

[Back to top](#table-of-contents)  

## Design and Planning

### Kanban Board

- **Development Process:** While working on this project, an agile development approach was followed as much as possible.
- **Development Preparation:** The initial steps involved thorough planning of the website, creating a class diagram for the models, and wireframes for the UI.
- **Feature Tracking & Task Management:** Features were categorized and moved through different columns (Todo, In Progress, Done) as they were worked on and completed.

👉 [Project Board link](https://github.com/users/Moonchichiii/projects/36/views/)

### Mockups
**Created with Balsamiq**
<p>
 <img src="readmecontent/images/landingpagefullscreen.png" alt="LandingPage" width="400" height="300"/>
 <img src="readmecontent/images/signup_full_screen.png" alt="Signup" width="400" height="300"/>
 <img src="readmecontent/images/Dashboard_dinnerClub.png" alt="Dashboard" width="400" height="300"/>
 <img src="readmecontent/images/Dashboardchange.png" alt="Dashboardchange" width="400" height="300"/>
 <img src="readmecontent/images/feedpagefullscreen.png" alt="Feedpage" width="400" height="300"/>
 <img src="readmecontent/images/likedfullscreen.png" alt="Likedpage" width="400" height="300"/>
 <img src="readmecontent/images/likedfullscreen.png" alt="LikedPosts" width="400" height="300"/>
 <img src="readmecontent/images/popularAndFollowersfullscreen.png" alt="popularProfiles" width="400" height="300"/>
 <img src="readmecontent/images/createpostfullscreen.png" alt="CreatePost" width="400" height="300"/>
 <img src="readmecontent/images/profileupdatefullscreen.png" alt="ProfileUpdate" width="400" height="300"/>
</p>

## Mobile View
<p>
 <img src="readmecontent/images/landingpagemobile.png" alt="" width="210"/>
 <img src="readmecontent/images/landingpage2mobile.png" alt="" width="220" height="320"/>
 <img src="readmecontent/images/dashboardmobile.png" alt="dashboardfirstplan" width="220"/>
 <img src="readmecontent/images/newdashbord.png" alt="seconddashboard" width="250" height="390"/> <img src="readmecontent/images/navigationmobile.png" alt="mobileOffcanvas" width="330" height="390"/>
</p>

**Had to skip the dinner club idea, due to time constraint**

[Back to top](#table-of-contents)  

### Color Palette

[Coolors Color Palette](https://coolors.co/)
<br>
![Coolors](readmecontent/images/Screenshot%202024-04-20%20103846.png)

- **_Fonts Used_**: 'Montserrat' for headings and 'Barlow Condensed' for text.

## Technologies

- Vite + React

### Or if you want to start from a clean sheet : 
- How install and get started with Vite + React : 

Install Node.js

- https://nodejs.org/en


2. Create a Vite + React Project
Open your terminal and run the following command to create a new Vite project with React:
```
npm create vite@latest . 
```

## Dependencies

2. **Install Dependencies**

- **Axios**  - Axios is a promise-based HTTP client compatible with node.jsand across browsers.
- **Bootstrap**  - For responsive design and pre-styled components. https://react-bootstrap.github.io/
- **React Loader Spinner** - Provides simple React.js spinner component which can be implemented
  for async wait operation before data load to the view

- **React Query** - Is a hook library for handling asynchronous and
  remote data in React applications.
  It provides features such as caching, syncing, querying, mutations.

- **Lodash** - For utility functions, debounce in search functionality.

- **JS Cookie**  - For managing cookies,for authentication.

- **FontAwesome** - To use the icons.

- **Express** - Express is a fast, unopinionated, minimalist web framework for Node.js
It is used for developing servers and provides small, robust tooling for HTTP servers

- **Compression** - https://www.npmjs.com/package/compression

```
npm install axios@latest 
bootstrap@latest 
react-loader-spinner@latest 
@tanstack/react-query@latest 
lodash@latest 
js-cookie@latest 
@fortawesome/react-fontawesome@latest 
express@latest 
compression@latest
```


[Back to top](#table-of-contents)


## Reusable Components

- **Modal**
- **PostCard**
- **Searchbar**

## Testing

### React Testing Library

- https://dev.to/mbarzeev/testing-a-simple-component-with-react-testing-library-5bc6
- https://jestjs.io/docs/tutorial-react

[Back to top](#table-of-contents)

## Setup and Installation

1. **Clone the Repository**

    ![alt text](readmecontent/images/clone-2.png)
    ![alt text](readmecontent/images/clone-3.png)

2.  **Install Dependencies**
    `npm install`
3.  **Start the Development Server**
    `npm run dev`

## Configuration for deployment 

### server.js

The `server.js` file sets up an Express server to serve the built React application.
It uses the compression middleware to compress responses, improving load times. In production,
it serves the static files from the `dist` directory and handles any requests by sending the `index.html` file,
enabling client-side routing to function correctly.

```javascript
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import compression from 'compression';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(compression());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(dirname, 'dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(dirname, 'dist', 'index.html'));
    });
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 
```

### Vite.config.js 

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    minify: 'terser'
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_BASE_URL,
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
});
```
## Deployment

### Heroku Deployment
Heroku Deployment

### Create a Heroku App

Login to the Heroku website and create a new app. 

Select your region and name your app as you want.


### Add Node.js Buildpack

In the Heroku dashboard, go to the "Settings" tab and 

click on "Add buildpack". Select "Node.js" and add it. 

This tells Heroku to use Node.js to run your application.

### Build the Project

You can either build the project before deploying or let Heroku handle the build process. 

If you want to keep the project size smaller during deployment, let Heroku run the build during deployment.

### Option 1: Build Locally

Build the project locally,:

`npm run build`
This will generate a dist folder containing the built files.

You can then move this to your backend and deploy it as one app on Heroku.

### Option 2: Let Heroku Build

If you prefer to let Heroku handle the build, no need to run the build command locally.

This approach reduces the project size during deployment.

Heroku will use the build script specified in your `package.json` to build the project during deployment.

### Prepare the Project for Heroku Deployment

**Add a Procfile**

Create a Procfile in the root of your project. 

This file tells Heroku how to run your application. Add the following line to your Procfile:

`web: node server.js `

### Configure package.json

This configuration allows Heroku to run the build script during deployment.

Ensure that your package.json includes the necessary scripts for building and running your application. 
```Javascript

  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "engines": {
    "node": "20.x",  // This can change 
    "npm": "10.8.0"  // This can change - has changed a few times keep the up to date version. 
  },
```

### Deploy The project.

Use the Heroku GitHub integration to automatically deploy from a GitHub repository.

### Configure Environment Variables

In the Heroku dashboard, navigate to the "Settings" tab and click on "Reveal Config Vars". 

Add the necessary environment variables required to communicate with the backend and other settings. 

### Post-Deployment

After deploying, Heroku will automatically run the build script defined in package.json.

This will compile your frontend code. Your server will start according to the command defined in Procfile.

You can monitor the deployment process and application logs using the Heroku dashboard or the Heroku 


## Credits

Special thanks to:

- The Moments Walkthrough Project for guidance and inspiration

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
