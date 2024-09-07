# Introduction - how to read this doc

- This exercise is designed to test basic skills in 3 core areas:

1. [SQL databases](#1-database)
2. [React SPA development](#2-react-spa)
3. [Backend API development on Node](#3-backend-api-development-on-node)

- for each section you'll find that it has **problem**, **task**, **solution** sections:

- **problem** :
  - explains the core problem we're trying to solve, and maybe some context

- **task** :
  - gives a list of tasks that MUST be accomplished by you
  - also tells you what are the must-have features in your solution
  - tasks marked with [<ins>**extra**</ins>] are not necessary, consider them as bonus problems

- **techstack instructions**:
  - subsection under task, this tells you what techstack you're expected to use

> [!IMPORTANT]
> please stick to the techstack mentioned; it's a very basic project and does not require an arsenal of libraries, so do not use any other libraries, frameworks, etc.. unless explicitly mentioned

  - however you can use simple libraries that are not mentioned, granted they don't significantly alter the task or do the work for you and that you document the decision-making properly as explained below

- **solution** :
  - once you're done solving the exercise or a part of it, you **MUST** document your solution in this section under the appropriate part of the exercise you solved, so the for the database problem you should edit the solution section under [database](#1-database) only

  - the idea is to document mainly 2 things:

    - key problem solving points: that provide a high level overview of how you solved that problem
      - eg: for the DB problem, what tables you created / altered, how does that accomplish the tasks (if it's not obvious)
    - instructions: you must include all instructions (including code) that will allow us to run and review your solution

## 0. Setup

- fork this repository, you'll be committing all your changes to the forked repo
- clone the fork locally to develop

```bash
git clone https://github.com/<username>/full_stack_assessment_skeleton.git
```

> [!NOTE]
> throughout the readme, we'll be working from within the root directory (full_stack_assessment_skeleton/) of the repo, unless otherwise stated

- use docker to spin up **MySql** db container
- this db instance has some data that will be needed for the exercise, included in it

```bash
docker-compose -f docker-compose.initial.yml up --build -d
```

- the containerized db listens on `localhost:3306`
- the docker compose file has the credentials you will need

> [!WARNING]
> do not change credentials, db name and any configuration, this just adds unnecessary complexity

> [!TIP]
> [mysql docker image docs](https://hub.docker.com/_/mysql)

![mysql creds](images/mysql_creds.png)

- the database is `home_db`, user `db_user` has full read-write access to it
- `home_db.user_home` table has some data populated in it

## 1. Database

<details>
<summary>preview of data in `home_db.user_home` table</summary>

| **username** | **email**          | **street_address**       | **state**     | **zip** | **sqft** | **beds** | **baths** | **list_price** |
|--------------|--------------------|--------------------------|---------------|---------|----------|----------|-----------|----------------|
| user7        | user7@example.org  | 72242 Jacobson Square    | Arizona       | 05378   | 2945.89  | 1        | 3         | 791204.0       |
| user7        | user7@example.org  | 75246 Cumberland Street  | Arizona       | 08229   | 2278.71  | 2        | 1         | 182092.0       |
| user10       | user10@example.org | 72242 Jacobson Square    | Arizona       | 05378   | 2945.89  | 1        | 3         | 791204.0       |
| user3        | user3@example.org  | 811 Walker-Bogan Terrace | Rhode Island  | 19219   | 3648.42  | 1        | 2         | 964995.0       |
| user3        | user3@example.org  | 947 Allen Motorway       | Massachusetts | 65353   | 1375.37  | 3        | 3         | 578532.0       |
| user10       | user10@example.org | 7976 W Division Street   | New Mexico    | 99460   | 2510.57  | 1        | 3         | 842529.0       |
| user6        | user6@example.org  | 4679 Horacio Plains      | Texas         | 62631   | 1679.69  | 6        | 3         | 303195.0       |
| user2        | user2@example.org  | 78089 Prospect Avenue    | Nebraska      | 95406   | 4718.9   | 1        | 2         | 358752.0       |
| user2        | user2@example.org  | 5788 Mallie Gateway      | Nebraska      | 37697   | 2236.85  | 3        | 2         | 632165.0       |
| user6        | user6@example.org  | 975 Marty Ridges         | New Jersey    | 28721   | 1310.08  | 6        | 3         | 467656.0       |

</details>

### problem

- as you can see we have data relating users and homes
  - each user is identified by its username, i.e., if two rows have the same username, they're talking about the same user
  - similarly each home is identified by its street_address

- this data relates users on our website and which homes they are interested in

- upon basic inspection you can observe the following:
  - one user may be related to multiple homes
  - also the same home may be related to multiple users

- we gave this data to an [**intern**](https://www.urbandictionary.com/define.php?term=intern), who just threw it into the database, and now it's come to you!

- the intern did not know about relational databases and data normalization, but we expect you do

### task

- refactor the data into a _reasonably_ normalized set of tables
- ensure that the relationship between tables is represented properly using foreign keys -> primary keys  references (as they are usually in relational DBs)
  - you'll need to create _atleast_ 2 tables:

    - `user` : to store `user` attributes: `username`, `email`
    - `home` : to store `home` attributes: all attributes in `user_home` table except for the above `user` attributes

  - you _may_ need to create more tables, alter existing tables to solve the exercise
  - please try to use the names "user" and "home" for "user" and "home" tables, so it's easier for us to understand

- create a **SQL script** `99_final_db_dump.sql` containing all the changes made by you to the DB
- put it inside the `sql` directory under the root directory

- make sure that:
  - the SQL script you have created, takes the DB from its initial state (as it was when you started the docker container for the first time) to the "solved" state, when it's executed

- **techstack instructions**

  - you can use whatever GUI / CLI you want, to interact with database
  - but all the changes you make should be using SQL / MySQL dialect of SQL and should be in the SQL script that you provide
  - so you must **NOT** use Entity first development, where you write your ORM entities and generate SQL migration scripts
  - instead you directly write SQL script, that makes all the changes you want to the DB

### solution

## Database Normalization

The database was normalized to improve data integrity and optimize query performance. The following changes were made to the `home_db` database:

### Initial State

Initially `home_db` database had a single table `user_home` with the following columns:

- ( `username`, `email`, `street_address`, `state`, `zip`, `sqft`, `beds`, `baths`, `list_price`)

-To use home_db database
```sql
USE home_db;
```

### Refactored Schema

To normalise it I created three more tables:

1. **`user` Table**
   - To Store user information (username and email).
   - **Columns**:
     - `username` (Primary Key)
     - `email`
    ```sql
    CREATE TABLE user (
    username VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) NOT NULL
    );
    ```
    

2. **`home` Table**
   - To Store home details.
   - **Columns**:
     - (`street_address` (Primary Key), `state`, `zip`, `sqft`, `beds`, `baths`, `list_price`)
     
     ```sql
      CREATE TABLE home (
          street_address VARCHAR(255) PRIMARY KEY,
          state VARCHAR(255) NOT NULL,
          zip VARCHAR(10) NOT NULL,
          sqft DECIMAL(10,2) NOT NULL,
          beds INT NOT NULL,
          baths INT NOT NULL,
          list_price DECIMAL(15,2) NOT NULL
      );
     ```

3. **`user_home` Table**
   - To establish a many-to-many relationship between users and homes.
   - **Columns**:
     - `username` (Foreign Key referencing `user.username`)
     - `street_address` (Foreign Key referencing `home.street_address`)
     ```sql
     CREATE TABLE user_home_tb (
          username VARCHAR(255),
          street_address VARCHAR(255),
          PRIMARY KEY (username, street_address),
          FOREIGN KEY (username) REFERENCES user(username),
          FOREIGN KEY (street_address) REFERENCES home(street_address)
      );
     ```

### SQL Script

The SQL script `99_final_db_dump.sql` contains the following:

1. **Table Creation**:
   - Dropped existing tables to ensure a clean slate.
   - Created new `user`, `home` tables with appropriate primary and foreign keys.

2. **Data Insertion**:
   - Inserted data into `user` and `home` tables from the original `user_home` table.
   - Populated the `user_home_tb` table to reflect the relationships between users and homes.

### Execution

To apply these changes we have made in the instance.

```bash
docker exec -i 1f00b6716ed8 mysql -u db_user -p home_db < sql/99_final_db_dump.sql
```
- `1f00b6716ed8 --> container_id` .

- use docker to spin up **MySql** db container
- this db instance has some data that will be needed for the exercise, included in it

```bash
docker-compose -f docker-compose.final.yml up --build -d
```

## 2. React SPA

- this is a simple SPA, the idea is to show case your state management and some frontend-dev skills

### the problem

- we want to see:
  - for each user what homes they are interested in
  - for each home we also want a way to see what different users are interested in it
- also we want to change / update the users that are associated with a given home

### task

- **homes for user page**
  - create a page to show all homes related to a particular user
  - there should be a single-select dropdown at top, to pick the user for whom we want to view the related homes
  - and below that the related homes should populate in cards

  - [watch the video demo for reference](https://drive.google.com/file/d/1D9Jzzuw38cgL-PVYF8YDE1FEBHcjBpig/view?usp=sharing)

  - make sure that:
    - page is responsive as shown
    - we don't expect any fancy UI, barebones is just fine, but it should be functional
  
- **edit user functionality**

  - each home card has an `Edit User` button attached, this should show a modal on click, this is the `Edit User Modal`:

  - initially all users related to the home should be checked
  - we can edit the related users by toggling the checkboxes
  - if we click `Cancel` then modal should just close without any effect
  - however if we edit the users, and then click `Save`:

    - the users related to that home must be updated in the DB
    - the modal should close and the changes should reflect on the `homes for user page`
    - so for eg: if we had picked `user1` on `homes for user page` then clicked on `Edit User` for any home there and **unchecked** `user1` in the modal and saved, then upon closing of the modal, the home we clicked on previously, should NO longer be visible for `user1`, but should be visible for any other user for whom the checkbox was checked on `Save`
  
  ![edit user modal](images/edit_user_modal.png)

  - make sure:

    - UI is not buggy
    - checkboxes are controlled
    - there is atleast 1 user related to a home

      - if the modal has no users selected, it should show an error and disable `Save` button

- **handle data-fetching properly**

  - to create the above components / pages, you'll fetch data from [backend APIs](#3-backend-api-development-on-node)

  - make sure you're handling data-fetching properly by _preferrably_ using a data-fetching-library:
    - show a loading spinner/skeleton while an API request is progress
    - gracefully handle errors if the API calls error out
    - [<ins>**extra**</ins>] cache API responses, to improve performance 

  - as discussed below it's preferred to use a data fetching library to handle these problems properly

- **techstack instructions**
  - JS frameworks:

    - [Vite (recommended)](https://vitejs.dev/guide/) or [Create React App](https://github.com/facebook/create-react-app)
    - use no other framework, libraries

  - CSS:

    - vanilla CSS or [Tailwind CSS](https://tailwindcss.com/docs/installation)
    - use no other css frameworks, component libs, etc..

  - State Management
    - use [Redux Toolkit](https://redux-toolkit.js.org/) where appropriate for state-management

  - Data Fetching
    - **preferred approach** is to use one of the following data-fetching libraries:
      - [RTK Query](https://redux-toolkit.js.org/tutorials/rtk-query)
      - [TanStack Query](https://tanstack.com/query/latest)

    - otherwise, you can use some other data-fetching library, just make sure to document that in README
    - as a last resort, `useEffect()` maybe used, but make sure you're handling data-fetching properly (loading, errors, etc..)

    - for skeletons / spinners - you can use a simple library:
      - eg: [react-loading-skeleton](https://www.npmjs.com/package/react-loading-skeleton)
      - remember to keep it simple and readable

> [!IMPORTANT]
> even if you can do state-management without Redux, you still must use Redux for the solution, (remember the idea is to showcase the skills)

### solution

I used the following **Techstack**

- **Vite-React**: Lightweight and fast React-based framework for building the frontend.
- **Redux Toolkit (RTK Query)**: For state management, data fetching, caching, and quick UI updates.
- **Tailwind CSS**: Utility-first CSS framework for responsive and maintainable styles.
- **React Loading Skeleton**: Simple and effective loading states during data fetching.


## To run this frontend vite-react app

1. Clone the repository:
    ```bash
    git clone https://github.com/MVKarthikReddy/full_stack_assessment_skeleton.git
    cd frontend
    ```

2. Install the dependencies: (It will install all the dependencies from the package.json file which is in the frontend folder)
   
     ## Dependencies

    The following dependencies were used to develop this project:
    
    | Dependency                   | Version  |
    |-------------------------------|----------|
    | @reduxjs/toolkit               | ^2.2.7   |
    | react                          | ^18.3.1  |
    | react-dom                      | ^18.3.1  |
    | react-loading-skeleton         | ^3.4.0   |
    | react-redux                    | ^9.1.2   |
    | react-router-dom               | ^6.26.1  |
    
    ### Dev Dependencies
    
    These tools and configurations were used during development:
    
    | Dev Dependency                 | Version  |
    |---------------------------------|----------|
    | @eslint/js                      | ^9.9.0   |
    | @types/react                    | ^18.3.3  |
    | @types/react-dom                | ^18.3.0  |
    | @vitejs/plugin-react            | ^4.3.1   |
    | autoprefixer                    | ^10.4.20 |
    | eslint                          | ^9.9.0   |
    | eslint-plugin-react             | ^7.35.0  |
    | eslint-plugin-react-hooks       | ^5.1.0-rc.0 |
    | eslint-plugin-react-refresh     | ^0.4.9   |
    | globals                         | ^15.9.0  |
    | postcss                         | ^8.4.45  |
    | tailwindcss                     | ^3.4.10  |
    | vite                            | ^5.4.1   |
    
    To install these dependencies, simply run the following command:

    ```bash
    npm install
    ```

4. Start the development server: (It will run the server locally on port 5173)
    ```bash
    npm run dev
    ```

5. Access the app in your browser at `http://localhost:5173`.

## API Integration

This frontend interacts with the following REST APIs from the backend:

- **/user/find-all**: Fetches all users from the database.
- **/home/find-by-user**: Fetches all homes related to a specific user.
- **/user/find-by-home**: Fetches all users related to a particular home.
- **/home/update-users**: Updates the users related to a home.

## State Management & Data Fetching

**RTK Query** is used to fetch and cache API data efficiently. Here’s how it works:
- **Data Caching**: Improves performance by storing previously fetched data.
- **Optimistic Updates**: Updates the UI instantly before the API request completes, making the app feel faster.
- **Error Handling**: Gracefully handles API errors with appropriate error messages and fallback UI.
  
  location : frontend/src/utils/api/apiSlice.jsx
  ```javascript
    import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

    export const apiSlice = createApi({
      reducerPath: 'api', 
      baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_API_URL}` }), // Setting base url where your backend runs
    
      tagTypes: ['Users', 'Homes'], // To manage cache invalidation and data refetching efficiently
      endpoints: (builder) => ({ 
    
        // GET : user/find-all
        // To Retrieve all the users
        getUsers: builder.query({ 
          query: () => 'user/find-all',
          providesTags: ['Users'],
        }),
    
        // GET : home/find-by-user/${username}
        // To Retrieve all the homes corresponding to a user
        getHomesByUser: builder.query({
          query: ({ username }) => `home/find-by-user/${username}`,
          providesTags:  ['Homes'],
        }),
    
        // GET : user/find-by-home/${streetName}
        // To Retrieve all the users corresponding to a home
        getUsersByHome: builder.query({
          query: (streetName) => `user/find-by-home/${encodeURIComponent(streetName)}`,
          providesTags:['Users'],
        }),
    
        // PUT : home/update-users
        // To Update users corresponding to home
        updateUsersForHome: builder.mutation({
          query: ({ street_name, users }) => (
            {
            url: 'home/update-users',
            method: 'PUT',
            body: { street_name, users },
          }),
          // For caching and refetching the data for realtime updates
          invalidatesTags: (result, error, arg) => [
           'Homes',
           'Users'
          ],
        }),
      }),
    });
    
    export const {
      useGetUsersQuery,
      useGetHomesByUserQuery,
      useGetUsersByHomeQuery,
      useUpdateUsersForHomeMutation,
    } = apiSlice;
  ```


## Tailwind CSS for Styling

Tailwind CSS is used for styling the UI.

To configure tailwing in our application : 
1. Installing tailwind and generating tailwind.config.js and postcss.config.js
  ```bash
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
  ```
2. adding the paths to all of our template files in tailwind.config.js file.
   ```javascript
      export default {
        content: [
          "./index.html",
          "./src/**/*.{js,ts,jsx,tsx}",
        ],
        theme: {
          extend: {},
        },
        plugins: [],
      }
   ```
3. Adding tailwind directives to our index.css file
   ```css
      @tailwind base;
      @tailwind components;
      @tailwind utilities;
   ```
   
## Pagination

Pagination has been implemented to improve performance.
By default no.of records per page are 50. But we can set our required number of records per page dynamically and this number must be 50 or more than 50.

## Error Handling

Error handling is implemented for all API requests:
- **Loading States**: A loading spinner or skeleton is shown while data is being fetched.
- **Error Messages**: Clear error messages are displayed if API calls fail.
- **Retry Mechanism**: Users can retry failed API requests.

  It will return all the homes data corresponding to a user
  ```javascript
    const { data, isLoading, isError } = useGetHomesByUserQuery(
      { username: selectedUser }
    );
  ```
  When we send a request **isLoading** will be set as true (as the Promise is pending), when ever request got success, the response will be stored in **data** field and **isLoading**, **isError** will be set to false.


## 3. Backend API development on Node

### problem

- we want the web app to interact with the [DB](#1-database)

### task

- create **REST APIs**, we'll need the following APIs:

  - **/user/find-all**
    - should return all users from DB

  - **/home/find-by-user**
    - should return all homes related to a user
    - this is consumed in UI to show home cards

  - **/user/find-by-home**
    - should return all users related to a home
    - this is consumed in UI, in the `Edit Users` modal

  - **/home/update-users**
    - this API should take in the new bunch of users (from the modal after `Save`) and the home for which the `Edit Users` button was clicked
    - this API should mutate the DB, to reflect the new set of users related to the home

  - make sure:

    - you use suitable HTTP methods for the REST APIs
    - should only use JSON as the interface
    - if possible, sanitize the data sent in the request
    - the `/home/update-users` API is idempotent
  
- **[<ins>extra</ins>] add pagination**

  - for `/home/find-by-user` API add pagination support:

    - page size should be 50
    - add _very_ basic pagination UI to `homes for user page` in [frontend](#2-react-spa)

- **techstack instructions**

  - Backend node frameworks:

    - [NestJS (recommended, if you know it)](https://docs.nestjs.com/) or [Express](https://expressjs.com/en/starter/installing.html)
    - use no other frameworks

  - Interacting with DB:

    - use one of these ORMs, this the **preferred approach**:
      - [TypeORM (recommended)](https://typeorm.io/)
      - [Prisma](https://www.prisma.io/docs/getting-started)
      - [Sequelize](https://sequelize.org/docs/v6/getting-started/)

    - otherwise, you can use [Knex query builder](https://knexjs.org/guide/)

    - we do NOT want raw SQL, if none of above works, you can use any ORM you know, but please mention and link to it in the README

### solution

## Technologies

- **Nest.js** - A progressive Node.js framework for building efficient and scalable server-side applications.
- **TypeORM** - An ORM tool used to manage database operations with MySQL.
- **MySQL** - A relational database management system used for storing user and home data.


## Installation

### Prerequisites

Before running this backend, ensure that you have the following installed:

- **Node.js**: >= 16.x
- **MySQL**: Ensure you have a running MySQL instance.

### Steps to Install

1. Clone the repository:
   ```bash
   git clone https://github.com/MVKarthikReddy/full_stack_assessment_skeleton.git
   ```

2. Navigate to the backend directory:
   ```bash
   cd backend
   ```

3. Install dependencies:
   It will install all the dependencies that are present in the package.json file.
   
   ```bash
   npm install
   ```

## Environment Variables

`.env` file in the root directory:

```plaintext
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=db_user
DB_PASSWORD=6equj5_db_user
DB_DATABASE=home_db
```

 With the help of `@nestjs/config` package we can access these variables in Nest.js

## Database Configuration

We use **TypeORM** for database operations. The database connection is configured through the `TypeOrmModule` in `app.module.ts`. The MySQL connection is established using the environment variables provided in the `.env` file.

To connect with mysql using TyptORM
```javascript
  TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USER_NAME,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [User, Home], // Entities are the classes that represent the Tables in the database
      synchronize: true,
    }),
```

## API Endpoints

The backend exposes the following REST APIs:

### User Endpoints

- **GET /user/find-all**
  Returns all users in the database.

    Request:
      ```bash
        GET /user/find-all
      ```
    
    Response:
      ```json
        [
          {
            "username": "user1",
            "email": "user1@example.com"
          },
          {
            "username": "user2",
            "email": "user2@example.com"
          }
        ]
      ```

- **GET /user/find-by-home**  
  Retrieves all users associated with a given home.

    Request:
      ```bash
        GET /user/find-by-home/:street_name
      ```
    
    Response:
      ```json
        [
          {
            "username": "user1",
            "email": "user1@example.com"
          },
          {
            "username": "user2",
            "email": "user2@example.com"
          }
        ]
      ```


### Home Endpoints

- **GET /home/find-by-user**  
  Retrieves all homes associated with a given user.
  
   Request:
      ```bash
        GET /home/find-by-user/:username
      ```
    
   Response:
      ```json
          [
            {
              "street_name": "10008 Shanel Fields",
              "state": "Mississippi",
              "zip": "",
              "sqft": "1404.19",
              "beds": 2,
              "baths": 2,
              "list_price": "984358.00"
            },
            {
              "street_name": "10270 Gusikowski Hill",
              "state": "Oregon",
              "zip": "",
              "sqft": "2115.21",
              "beds": 5,
              "baths": 1,
              "list_price": "412051.00"
            },
            ..
            ..
            ..
          ]
      ```
        
       

- **POST /home/update-users**  
  Updates the users associated with a home (idempotent).

   Request:
      ```bash
        GET /home/update-users
      ```
      Request Body:
      ```json
          {
              "street_name": "99949 Kerluke Corners",
              "users": [
                "user1",
                "user2",
                "user7",
                "user5",
                "user6",
                "user9"
                ]
          }
      ```
    
   Response:
      ```json
          {
            "street_name": "99949 Kerluke Corners",
            "state": "Arizona",
            "zip": "",
            "sqft": "889.56",
            "beds": 5,
            "baths": 2,
            "list_price": "684658.00",
            "users": [
              {
                "username": "user1",
                "email": "user1@example.org"
              },
              {
                "username": "user2",
                "email": "user2@example.org"
              },
              {
                "username": "user5",
                "email": "user5@example.org"
              },
              {
                "username": "user6",
                "email": "user6@example.org"
              },
              {
                "username": "user7",
                "email": "user7@example.org"
              },
              {
                "username": "user9",
                "email": "user9@example.org"
              }
            ]
          }
      ```


## Running the Application

1. To start this Nest.js application, run the following command:

It will run on watch mode
```bash
  npm run start:dev 
```

This will start the application on `http://localhost:3000`.

2. Make sure to have MySQL running and the database properly configured before running the server.

   If not, run this docker command:
   - To spin up **MySql** db container
       
    ```bash
      docker-compose -f docker-compose.final.yml up --build -d
    ```

### Testing

You can run unit tests using:

```bash
  npm run test
```


## Submission Guidelines

- once you're done with [DB](#1-database), [frontend](#2-react-spa), [backend](#3-backend-api-development-on-node) it's time to submit your solution :smiley:

### README

- this is the most important part of the submission, without a proper README no submission will be considered

- you must edit this README file in your fork of the repo, and for each problem section, document your solution properly in its **solution** section

### frontend & backend

- all frontend / backend code should go entirely in the `./frontend` / `./backend` directories
- we are fine with testing your solution in either `dev` or `production` mode, just make sure the instructions are properly documented

> [!CAUTION]
> make sure to **commit the .env files** for both backend & frontend, if they are needed to run your solutions

### database

> [!CAUTION]
> The database changes you make while developing the solution, by default will not be visible to us or committed in the repo, so make sure to read and understand this section carefully!

- the database is inside a container, and all it's data (the tables you added, altered, etc..) are only saved inside a docker volume that's on your local system, invisible to us

- to make sure we can run your solution, you have to provide your **SQL script** to us
- write all the DB changes to `99_final_db_dump.sql` in `sql` directory under root folder of repo
- this script should take the DB from its initial state to the solved state

- you can test that easily by following below steps:

- first stop the already running db container, else there will be conflicts!

```bash
docker-compose -f docker-compose.initial.yml down
```

- now fire up the new one

```bash
 docker-compose -f docker-compose.final.yml up --build -d
```

- this is the new db container with your SQL script applied, now test your app, it should work exactly the same with this new replica database, this is how we will be runnning your app

### submit the fork url

- when you've committed everything needed to your github fork, please share the url with us, so we can review your submission
  
