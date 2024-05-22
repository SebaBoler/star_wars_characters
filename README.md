# Project Title

Star Wars Characters API - RESTful - Serverless

## Description

This project is a backend API for managing Star Wars characters. It supports CRUD operations (Create, Read, Update, Delete) with proper validation. The API can be implemented using RESTful services, and it includes pagination for listing characters. The backend is built using AWS Serverless services and Node.js with TypeScript, following best practices such as TDD (Test-Driven Development) and SOLID principles.

## Features

CRUD Operations: Create, read, update, and delete characters.
Validation: Ensures data integrity and validity.
Pagination: Supports pagination for listing characters.
Serverless Architecture: Utilizes AWS Lambda and DynamoDB.
Unit and Integration Tests: Ensures reliability and correctness.
API Documentation: Uses OpenAPI/Swagger for RESTful API

## Technology Used

AWS: Lambda, API Gateway, DynamoDB
Node.js: JavaScript runtime
TypeScript: Superset of JavaScript for type safety
Frameworks: Express
Testing: Jest for unit and integration tests
API Documentation: Swagger for REST

## Future Plan

Add Graphql
Do some benchmarks with DrizzleORM and Postgresql or Aurora Postgresql

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

## Best Practices

TDD (Test-Driven Development)
Write tests before implementing functionality.
Ensure all tests pass before considering the feature complete.

## SOLID Principles

Single Responsibility Principle: Each class should have only one responsibility.
Open/Closed Principle: Classes should be open for extension but closed for modification.
Liskov Substitution Principle: Subtypes must be substitutable for their base types.
Interface Segregation Principle: Clients should not be forced to depend on interfaces they do not use.
Dependency Inversion Principle: Depend on abstractions, not on concretions.
```
