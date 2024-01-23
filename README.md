# Gilded Rose + Node task

This is the Gilded Rose kata in TypeScript. In this repo there are two tasks that I worked on. The first one - implementation of unit tests and refactoring of the application. The other task was to create a way for the user to provide the amount of times the shop should be refreshed, and how many times the yesno.wtf/api should be called.

## Getting started

Install dependencies

```sh
npm install
```

## Run the unit tests from the Command-Line

```sh
npm run test:jest
```


## Run the node task to refresh shop and call API

User must provide the number of times shop should be updated, and how many times to call the API for every iteration as args:
```sh
npx ts-node app/NodeTask/task.ts 5 6
```

The API will be called as long as there is atleast a single 'yes' received as a response. The amount of times it will be called depend on the user input and the previous api responses. The positive responses are logged in a Log.txt file.

