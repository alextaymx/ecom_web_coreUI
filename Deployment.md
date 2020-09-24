# Heroku

## The structure

### Local environment

- frontend run on Port `3000`, server run on Port `3001`
- create react environment variables begin with `REACT_APP_` in .env file
- the api url for frontend is decleared in **.env** file
- to start react only, run command `npm run start-client`
- to start server only, run command `npm run run-build`
- to start both, run command `npm run dev`
- in **production** env, react code will be build into pure js & html in **build** folder, server will join path with build folder and render the contents of files in **build** folder
- react will auto declare `NODE_ENV` to `production` when the code is build into build folder
- to run in production built:
  1. `npm run build`
  2. `npm run run-build`

### Production environment (Heroku)

- declare env variables for `NODE_ENV`, set it to `production`
