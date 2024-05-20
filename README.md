# Social Food Posting - Frontend

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Design](#design)
3.  [Technologies](#technologies)
4.  [Dependencies](#dependencies)
5.  [Setup and Installation](#setup-and-installation)
6.  [Testing](#Testing)
7.  [Deployment](#deployment)
8.  [Credits](#credits)

## Project Overview

The goal of the Social Food Posting platform is to allow users to share their culinary creations, interact with other food enthusiasts, and organize dinner events. Users can create posts, follow other users, like and comment on posts, and join dinner clubs to plan events.

## Design

### Color Palette

   [Coolors Color Palette](https://coolors.co/)
   - ![Coolors](<readmecontent/images/Screenshot 2024-04-20 103846.png>)


### Mockups

-   Created with Balsamiq
- ![Mockup](<readmecontent/images/Screenshot 2024-04-19 144513.png>)

## Technologies

-   **Vite**: For optimized frontend tooling.
-   **React**: For building dynamic user interfaces.

## Dependencies

-   `axios`
-   `bootstrap`
-   `react`
-   `react-dom`
-   `react-loader-spinner`
-   `react-icons`
-   `react-query`
-   `react-router-dom`

## Setup and Installation

1.  **Clone the Repository**
    
    
2.  **Install Dependencies**
    `npm install` 
    
3.  **Start the Development Server**
    `npm run dev` 
    

## Configuration File

### server.js

The `server.js` file sets up an Express server to serve the built React application. 
It uses the compression middleware to compress responses, improving load times. In production, 
it serves the static files from the `dist` directory and handles any requests by sending the `index.html` file,
enabling client-side routing to function correctly.


import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import compression from 'compression';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(compression());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 

## Deployment

### Heroku Deployment

1.  **Build the Project**
       `npm run build` 
    
2.  **Deploy to Heroku**

## Testing 

For detailed testing instructions, please refer to the Manual Testing.

    

## Credits

Special thanks to:

-   [Focus CSS card from CodePen](https://codepen.io/utilitybend/pen/bGvjLba)
-   The Moments Walkthrough Project for guidance and inspiration

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
Currently, two official plugins are available:  

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh