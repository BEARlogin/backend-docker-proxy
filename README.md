<!-- ABOUT THE PROJECT -->
## About The Project

Frontend developers often face with case, where they should use remote API development server.
And if it uses https protocol and some sort cookie-based authorization and/or CORS, you should run https dev environment,
that not so often easy to run.

Special case - development under Windows with Docker... It's some sort of BDSM :)
And it's a right decision to use remote API in that case.

Having faced these problems more than once, I've made an image and compose for frontend developers that make it easy to proxy a remote backend locally.


### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* docker
* docker-compose (or docker with compose plugin)


### Installation and usage

1. Clone repo


2. Copy .env.example to .env
    ```sh
    cp .env.example .env
   ```

3. Build and run docker-compose or use NodeJS
   ```sh
   docker-compose up -d --build
   ```
   Or with NodeJS   
   ```sh
   npm install & npm run start
   ```
4. Open [http://localhost:3001/todos/](http://localhost:3001/todos/) and see response from [https://jsonplaceholder.typicode.com/todos/](https://jsonplaceholder.typicode.com/todos/)


5. Replace environments for your purposes and repeat step 2

| **Env**         | **Description**                                    |
|-----------------|----------------------------------------------------|
| PROXY_TO        | Target                                             |
| HOST_PORT       | Where service should listen                        |
| REPLACED_ORIGIN | What origin we should use to replace Origin header |

5. PROFIT!


<!-- LICENSE -->
## License

Distributed under the MIT License.

