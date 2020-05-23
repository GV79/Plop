Plop
=====

Plop is a web application that uses React.js as its frontend framework and Adonis.js (Node.js web framework) as the REST API. It is a simple project management tool targeted towards small teams (< 12) however, it can also be used by individuals who want a more complex to-do list.

A postgreSQL relational database is used which is managed using the Lucid ORM to take advantage of models, controllers, migrations, seeds and factories. This allows us to easily replicate common SQL queries, setup the database with ease, and create dummy data. Cloudinary is currently used to store images.

![Plop Dark Mode Preview](https://github.com/GV79/Plop/blob/master/readme-plop.png)

> [Current deployed on https://www.plop.team/ as version 0.8 via Netlify. Backend is deployed on https://plopwebapp.herokuapp.com/ using Heroku.](https://plop.team/)

# Getting Started

## Development

### Running Frontend

1. Go to web folder and install dependencies (requires Node.js and NPM).
```
$\web npm install
```
2. Run frontend application.
```
$\web npm start
```

### Running Server

1. Go to server folder, set up environment variables in your local .env file (see .env.example for attributes that you must fill in), and have working PostgresQL database you can connect to.

2. Set up database (requires Adonis CLI) with proper tables.
```
$\server adonis migration:run
```
3. Fill database with dummy test data (you can now login as a user called 'tester@gmail.com' with password 'test' with a prebuilt team.)
```
$\server adonis seed
```
4. Go to server folder and install dependencies (requires Node.js and NPM).
```
$\server npm install
```
5. Run server on localhost:3333.
```
$\server npm start
```

Note: For resetting the database (all your data will be deleted)
```
$\server adonis migration:rollback
```

### DB Resources

postgreSQL can be hosted locally via http://www.postgresqltutorial.com/install-postgresql/ and if you want to use mySQL, a mySQL remote database can be setup via http://remotemysql.com (will require some code changes for app to function properly though).

## Project To Dos

**Immediate**
- Refactoring all CSS and finishing dark theme
- More component modularization
- Refactoring all remaining class components to function components + hooks
- Real-time notifications and live dashboard changes
- JWT token refresh
- Encoding emails and data
- Complete landing and help pages
- SendGrid API instead of nodemailer for emails
- GitHub API to tie issues directly to commits
- Redesign team settings page
- Throttling request, reCAPTCHA for signup, team data limits
- Improving performance (audit through Google Lighthouse)
- More Node.js and React.js testing coverage
- Project Overview graph

**Long Term**
- More functionality for team settings (ie. admin approval)
- Password and email changing
- Mobile responsiveness (or app)
- Enable saving files as well and move to Amazon AWS S3 Bucket instead of Cloudinary
- Firebase Google Analytics
- Look at any accessibility problems (ie. contrast)
- Better server-side logging for analytics, debugging...
- More DB seeds for fast queries and factories for creating dummy data (which the tests can use)

## Testing

'adonis seed' must have been run and executed properly to fill DB with dummy data. The tests are designed using Jest and React Testing Library.

1. Execute unit tests on the React FE application.
```
$\web npm test
```

2. Analyze test coverage
```
$\web npm run coverage
```


## Practices

*Coding styles* enforced by Prettier config (found in .prettierrc files in root folders).
*Naming scheme:* Camel case for JS functions/variables, hyphen delimiters for URLs, server endpoints, and CSS class selectors, and finally snake case for DB column and table names (there may be code discrepancies in which I hope to fix sometime)
