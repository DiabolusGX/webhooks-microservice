# Webhooks Microservice

This repository contains source code for Webhooks microservice using Moleculer and a backend using Express and MongoDB (with mongoose ODM) that lets you create users (with or without admin privilages on new user), login and lets admin to create, read, update and delete webhooks service and allows every user to trigger webhooks that sends their IP and UNIX Timestamp in post request body.

### Index

* [Requirements](#Requirements)
* [Installation](#Installation)
* [Configuration](#Configuration)
* [Routes](#Routes)

### Getting Started

This reposetory only contains backend (with express) with webhooks service (with molecular) so using postman will he helpful for managing resuests and responses from backend.

#### Requirements

This module requires the following modules:

 * [Node.js](https://nodejs.org/en/download/)
 * [Yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable)
 * [Git](https://git-scm.com/downloads)

#### Installation

To clone the backend and serve it locally, where `MY-WEBHOOKS-MICROSERVICES` is the name of your new repository:

```shell
$ git clone https://github.com/DiabolusGX/webhooks-microservice.git MY-WEBHOOKS-MICROSERVICES
$ cd MY-WEBHOOKS-MICROSERVICES
```

This will take you to the clonned project directory and ready to configure the project.

---

#### Configuration

* You have to add `.env` in root directory of the project where you can store all secret keys (like `MONGO_URI` in our case)

  ```shell
  PORT=3000
  SESSION_SECRET=myBigSecretIsHere
  MONGO_URI=mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]
  ```
  `PORT` is set to `3000` by default but you MUST enter valid [`MONGO_URI`](https://docs.mongodb.com/manual/reference/connection-string/) (either mongo atlas cluster or localhost) for application to start and work properly.

  > If the username or password includes the `: / ? # [ ] @` characters, 
  > those characters must be converted using [percent encoding](https://datatracker.ietf.org/doc/html/rfc3986#section-2.1).

* After you've setup enviornment variables, you can continue with installing dependencies :
  
  - Run to install all rependencies.
    ```shell
    yarn install
    ```
  - Run to start the development server that'll run on `PORT` mentioned in `.env` file (or 3000 be default).
    ```shell
    yarn start
    ```
  - **OR** you an alternatively use `yarn serve` that'll install dependencies and run the server.

* If you're planning to deploy the backend, add 
  ```shell
  NODE_ENV=production
  ```
  to command OR in `.env` file, that'll add extra securty option and will only accept requests from secure sockets (https).

---

### Routes


Here is list of routes for reference and usability :

#### User
User routes has base `user/` path like login path will be `http://localhost:3000/user/login` with POST method containing credentials (username, password) in JSON format in request body.

| Route     	| Method   	| Data in   	| Requirement 	| Format                                          	|
|-----------	|----------	|-----------	|-------------	|-------------------------------------------------	|
| `/signup` 	| `POST`   	| JSON Body 	| -           	| ```{ username, password, isAdmin (Boolean) }``` 	|
| `/login`  	| `POST`   	| JSON Body 	| -           	| ```{ username, password }```                    	|
| `/logout` 	| `POST`   	| -         	| -           	| -                                               	|
| `/update` 	| `PATCH`  	| JSON Body 	| admin       	| ```{ username, newPassword, newIsAdmin }```     	|
| `/delete` 	| `DELETE` 	| JSON BODY 	| admin       	| ```{ username }```                              	|

#### Webhook

Similar to user routes, it has `/webhook` as base path and logged in user has to be admin to generate, list, update and delete webhook.

| Route       	| Method   	| Data in 	| Requirement 	| Format                                                 	|
|-------------	|----------	|---------	|-------------	|--------------------------------------------------------	|
| `/register` 	| `POST`   	| Query   	| admin       	| ```/webhook/register?targetUrl=<url>```                	|
| `/list`     	| `GET`    	| -       	| admin       	| ```/webhook/list```                                    	|
| `/update`   	| `PATCH`  	| Query   	| admin       	| ```webhook/update?id=<webhookId>&targetUrl=<newUrl>``` 	|
| `/delete`   	| `DELETE` 	| Query   	| admin       	| ```webhook/delete?id=<webhookId>```                    	|

---

### Additional help

Please reachout to me anytime on [discord](https://boosterbot.xyz/support) or by mail 🙏
