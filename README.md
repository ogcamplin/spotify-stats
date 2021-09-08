# Spotify Statistics

This web application interfaces with the spotify API to allow users to see their top artists and tracks they have listened to.

## Background 

At the end of every year, spotify gives a breakdown of listening history and statistics which is called "spotify wrapped". I developed this application because I thought
it would be a cool idea to be able to see top tracks and artists whenever I felt like it. Combined with my interest in full-stack development, I decided to run with this idea and make it a personal project

I started this project at the start of 2020 summer in between full-time work, and have slowly continued development in my spare time after completing university work. 

## Why?

The primary goal of this project was to challenge myself and explore full stack development. 
I chose to use React and Express to expose myself to popular frameworks in this space. Not only did I want to learn these frameworks, but I also wanted to learn the best practices, and architectural design patterns for these technologies.
After some reasearch, I decided I would learn React Context to implement a React flux esque pattern within the front-end.

Although the tech world seems to be converging on the use of the cloud to host their software and data, I saw my sad looking and unused Rasberry PI collecting dust on my shelf, and decided I would challenge myself to use it as a mini-server and host the web application myself.
To host my own server, I decided I would try to learn and use docker and NGINX.

## Technologies

Originally I developed the project using React on the front end, Express on the backend, and NGINX using a reverse proxy to host the dockerized front end and backend stored on my raspberry PI.

I connected the server to certbot so that the site would have an SSL certificate and set up a domain name for my home network's public IP, and forwarded all port 80 and 443 requests to the raspberry PI so that the web application was public facing.

After hosting the application for a month or two, I took the application down due to security concerns (as it was connected to my home network).
After realising that the web application setup was too complex for the purposes of what I was trying to achieve, I decided instead to disconnect the backend, and change the front end so that it directly communicates with the spotify API. 
I am now using netlify to host and continuosly deploy the application from this github repository, while the old version remains archived.

The application is hosted here: https://spotifystats.netlify.app/

**In summary, these are the notable technologies / frameworks / libraries / languages I was exposed to during development:**
* React
  * React router
  * React context
  * Flux
  * Framer motion
* Express
* Node.js
* RESTful APIs
* Certbot
* Javascript
* CSS
* Bootstrap
* HTML
* NGINX
* Docker

(And there are probably more I have forgotten)

At the end of the day, the technologies I learnt and how the application was implemented was well beyond the needs of this project, however I really enjoyed the process of learning and I felt it gave myself more exposure to the world of full stack development. 
While I realised that I could have made this much  more simple, In my mind I kept asking myself one all important question - how am I going to learn if I dont challenge myself, and try to do something ambitious? 
