# Project Title

Star Wars Characters API - RESTful - Serverless

## Description

This project is a backend API for managing Star Wars characters. It supports CRUD operations (Create, Read, Update, Delete) with proper validation. The API can be implemented using RESTful services, and it includes pagination for listing characters. The backend is built using AWS Serverless services and Node.js with TypeScript, following best practices such as TDD (Test-Driven Development) and SOLID principles.

## Features

- CRUD Operations: Create, read, update, and delete characters.
- Validation: Ensures data integrity and validity.
- Pagination: Supports pagination for listing characters.
- Serverless Architecture: Utilizes AWS Lambda and DynamoDB.
- Unit and Integration Tests: Ensures reliability and correctness.
- API Documentation: Uses OpenAPI/Swagger for RESTful API

## Technology Used

- AWS: Lambda, API Gateway, DynamoDB
- Node.js: JavaScript runtime
- TypeScript: Superset of JavaScript for type safety
- Frameworks: Express
- Testing: Jest for unit and integration tests
- API Documentation: Swagger for REST

## Future Plan

- [ ] Add Terraform script
- [ ] Add Graphql
- [ ] Do some benchmarks with DrizzleORM and Postgresql or Aurora Postgresql

### Clone

```
git clone https://github.com/SebaBoler/star_wars_characters
cd star_wars_characters
```

### Installing

`yarn`

### Testing

`yarn test`

### Environment

Create a `.env` file and configure the necessary environment variables:

```
AWS_REGION=eu-central-1
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
```

### Run

`yarn dev`

### Usage Addresses

```
Server Restful: http://localhost:3000
Swagger:        http://localhost:3000/api-docs/#/
```

## Best Practices

**TDD** (Test-Driven Development)
Write tests before implementing functionality.
Ensure all tests pass before considering the feature complete.

## **SOLID** **Principles**

Single Responsibility Principle: Each class should have only one responsibility.
Open/Closed Principle: Classes should be open for extension but closed for modification.
Liskov Substitution Principle: Subtypes must be substitutable for their base types.
Interface Segregation Principle: Clients should not be forced to depend on interfaces they do not use.
Dependency Inversion Principle: Depend on abstractions, not on concretions.

## **Conclusion** and **Benchmark**

This project provides a robust backend for managing Star Wars characters, following industry best practices and leveraging modern technologies. With a well-documented API, thorough testing, and a scalable architecture, it ensures reliable and efficient character management.

I did some benchmark with NestJs on Serverless with TypeORM and Prism but finally score was not within my acceptance criteria.

- Clear Typescript: score in few operations CRUD ~ 0.0338
- NestJs with TypeORM: score in few operation CRUD ~ 0.996
- NestJs with Prisma: score in fee operation CRUD - 0.881
- **SOON** NestJs with DrizzleORM

## Why not **serverless** **framework** with plugins ?

[Serverless Framework](https://www.serverless.com/) is a powerful tool for developing serverless applications, but it is not always the best choice. Here are a few reasons why you might be better off writing code without Serverless Framework:

**Control**: Writing code without Serverless Framework gives you full control over what happens. You don't have to rely on the abstractions provided by the framework, which can be limiting or unclear.

**Understanding**: Writing code from scratch helps you understand how everything works. This can be especially important when you are working with complex systems like AWS.

**Dependencies**: Serverless Framework is an additional dependency that you need to manage. This may mean keeping track of updates, dealing with compatibility issues, etc.

**Implementation**: Serverless Framework adds an extra step to the implementation process, which can slow down the process.

**Complexity**: In some cases, Serverless Framework can add unnecessary complexity to a project, especially if your needs are simple.

However, remember that Serverless Framework has many advantages and can make it much easier to develop serverless applications, especially for large and complex projects. The choice between using Serverless Framework or writing code from scratch depends on a number of factors, including the complexity of your project, the experience of your team, your preferences, etc.

## **Extra**

Ye, you will find some hardcode value. However, they will disappear.
