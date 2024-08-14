# Fully isolated containerized MERN app

This is a practice project I did to learn docker compose to containerize a fullstack application.

## Technologies used
 - MERN stack (MongoDB, Express, React, NodeJS)
 - Docker and Docker composer
 - nginx

## How to run locally

1. Clone the repo

```bash
git clone https://github.com/Chamal1120RE/docker-compose-practice.git
```

2. Start with docker compose
```bash
docker-compose up # To start and run with live logs
```
or if you don't need logs
```bash
docker-compose up -d # To start and run silently
```

Note: On some computers with Docker Desktop `docker-compose` might have aliased to `docker compose` instead.

3. Open up a browser and check the following ports

`localhost:80` - nginx server (frontend server) <br>
`localhost:5000/api/notes` - backend server


## The one challenge I faced during this

I got an issue with CORS (Cross Origin Resource Sharing) even though I have imported the CORS library in my backend and enabled access for the frontend's port. Then I tried enabling access for all and it didn't fix it either. Then I did a little research on the internet and found that this issue is in docker's side rather than my app. There might be a solution to this within docker compose it self but I settled to use another solution for this instead.

I added few more lines to my frontend's dockerfile to move the static build to a nginx image and serve the files from there. Then I added a configuration file to provide the instructions to nginx to trick the frontend to detect backend's port as in the same origin. This effectively fixed the problem and I didn't needed the CORS libray anymore.


### If you find this useful, star the repo

### and btw, Thanks N3RDS!
