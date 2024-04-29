# Secret Santa App
A simple app to shuffle and assign secret santas in your family

**Visit live version:**
https://secret-santa-test.vercel.app/

Or clone this repo and run it locally. You need Node 18.17+.
Once you have the code in your computer run it with
```
npm install
npm run dev
```

## Project Structure
This is a Next.js app using the app router.
Inside the `/app` folder there is all the logic to our app.
It can be divided into *server* and *client*

### Server
Everything inside the `/api` folder can be consider our server.
There are four folders:
1. model -> contains mock database data and classes that emulate our entities and help with the logic to interact with the database
2. services -> logic necessary to respond the requests, connects model and route handlers
3. users -> route handler -controller- for requests
4. utils -> helper functions, here are the functions that shuffle and assign secret santas

### Client
Everything **NOT** in the `/api` folder can be consider our client.
There are three main elements:
1. page.js file -> our home screen, the view that is render when an user visit the path `/`
2. components folder -> contains all the React components the app uses
3. utils folder -> helper functions
