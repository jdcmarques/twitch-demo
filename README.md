# Twitch Demo Blip Challenge

App was created with [Create React App](https://github.com/facebook/create-react-app).

  
 
## Running the app for the first time

    git clone https://github.com/jdcmarques/twitch-demo.git twitch-demo-jdmarques
    cd twitch-demo-jdmarques
    npm install
    npm start

or in a single line

    git clone https://github.com/jdcmarques/twitch-demo.git twitch-demo-jdmarques && cd twitch-demo-jdmarques && npm install && npm start
    
## Running the app normally

    cd project-folder
    npm start
   Open browser on [localhost:3000/](http://localhost:3000/)
    
## Deploying production mode

    cd project-folder
    npm run deploy
This will will run CRA build process and deploy it to [gh-pages](https://jdcmarques.github.io/twitch-demo/)

  ## Testing production mode
  Edit package.json file and remove following line
  

    "homepage": "https://jdcmarques.github.io/twitch-demo/",
  Run `npm run build`
Open build folder with a local Server
  