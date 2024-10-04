# NodeJS + ExpressJS Backend API Template

This is a sample boilerplate for creating an API using NodeJS and ExpressJS.

## Structure

- All routers are defined in `src/modules` folder, as per the `user` example, in this template.
- Each module consists of three files, seperating the functionality:
  - _moduleRouter.ts_ : Includes the definition of the router and its routes.
  - _moduleModel.ts_ : Includes all the required Zod schemas for request validation and displaying the response object in the Swagger docs.
  - _moduleService.ts_ : Includes the implementation of the various methods that are called from the router to perform any operation. All these methods should return a `Promise<ServiceResponse>`.
  - _moduleRepository.ts_: Includes all the related Database calls for the current module. If using an ORM (Prisma, Sequelize, etc... ), all the calls should be here for the model related to the module developed.

## Environment Configuration

- The template includes three `.env` files:
  - `.env` Holds common vars for all environments
  - `.env.development` Overrides variables for dev environment
  - `.env.production` Overrides variables for production environment
- Uses the [dotenv-flow](https://www.npmjs.com/package/dotenv-flow) package to create multiple environments for the app.
- > **_Note:_** When using Prisma, or any other command that connects to a DB, the required env variable should be in the `.env` file (like the `DATABASE_URL` seen in the template example). Watch out when running a migration or any action that affects the DB to have the correct connection URL defined in the `.env` file.
