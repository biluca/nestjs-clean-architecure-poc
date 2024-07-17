# Event Tracker API - Nest.js
### Clean Architecture - Proof of Concept


<p align="center">
  <a href="http://nestjs.com/" target="blank">
  <img src="https://nestjs.com/logo-small-gradient.76616405.svg" height="150" alt="Nest Logo" />
  </a>
</p>

## Description

This repository showcases a Proof of Concept (POC) for Project Organization using Clean Architecture principles. The main objectives of this project include:

- Structuring files and folders;
- Standardizing component nomenclature;
- Exploring Clean Architecture principles;

The project features a CRUD API, called as the Event Tracker API, which enables users to create and manage events. This POC illustrates the implementation of a solid core of business rules, referred to as the Application Domain, along with Flow Control and Service Providers layers.

This API is composed by two versions: one integrated with a self-contained [SQLite](https://www.sqlite.org/) database and the other with a self-contained [DuckDB](https://duckdb.org/) database. This dual approach demonstrates the ease of adaptability and resilience provided by a Clean Architecture, ensuring the Application Domain remains unaffected by external (and quite common) changes.

## Clean Architecture

<p align="center">
  <img src="src\resources\img\cleanarchitecture.png" height="300" alt="Clean Architecture" />
</p>

In his book, Clean Architecture,  Robert C. Martin (Uncle Bob) outlines principles for designing software systems that are flexible, maintainable, and scalable. It advocates for separating the system into layers with clear responsibilities, promoting decoupling between high-level and low-level components. The core idea is to structure the system such that the business logic is independent of frameworks, user interfaces, databases, and external agencies. 

**Key concepts include:**

- **Dependency Rule:** Source code dependencies can only point inward, towards higher-level policies.
- **Entities:** Represent the business objects and encapsulate the core business rules.
- **Use Cases:** Contain the application-specific business rules and orchestrate the flow of data to and from the entities.
- **Interface Adapters:** Convert data from the format most convenient for the entities and use cases to the format most convenient for external agencies such as the web, database, etc.
- **Frameworks and Drivers:** Contain details like the database, web framework, etc., and are at the outermost layer, changing easily without affecting the business rules.

The architecture emphasizes keeping the system's core business logic unaffected by external changes, promoting longevity and adaptability.

## The Project's Proposal

Inspired by Uncle Bob's principles, my experience in building back-end projects and engaging in architectural discussions with peers, I've proposed an organization for projects, from files and folders structure to the naming of main components. The concept is illustrated in the diagram below:

<p align="center">
  <img src="src\resources\img\archproposal.png" height="300" alt="Proposal" />
</p>

**Key concepts:**

- **Application Domain:** Consists of Models, Processors, and Interfaces.
  - **Models:** Represent the business model and structure the data processed by the application.
  - **Processors:** Execute processes and encapsulate the core business rules, serving as the fundamental purpose of the application.
  - **Interfaces:** Serve as a bridge between the Application Domain and Application Service Providers, detailing requirements based on Models and Processors.
- **Application Flow Control:** Comprised of Controllers, this layer manages the application's internal flow. It exposes application resources to the external world and ensures proper connections between the Application Domain and Application Service Providers layers.
- **Application Service Providers:** Divided into Providers and Services.
  - **Providers:** Meet the Application Domain Interfaces' requirements, integrating with Services and fulfilling their needs.
  - **Services:** Act as a bridge between the Providers and the external world.
- **Dependency Direction:** According to Clean Architecture principles, dependencies must point inward towards the Application Domain Layer, a key aspect of maintaining a Clean Architecture.

To illustrate the behavior and relationships between these components, the following diagram is provided, focusing on the Event Tracker Project:

<p align="center">
  <img src="src\resources\img\appproposal1.png" alt="Project Diagram" />
</p>

To demonstrate the Application Domain's resilience to external changes, another version of the API was implemented, simulating a possible change of Tech Stack for any given reason. The diagram below shows two API versions: one integrated with the SQLite Database Service and the other with the DuckDB Database Service. Notice that the Application Domain remains unchanged:

<p align="center">
  <img src="src\resources\img\appproposal2.png" alt="Project Diagram" />
  </a>
</p>


## Installation

```bash

$ npm install

```

## Running the app

```bash

$ npm run start

# or

$ npm run start:dev # for watch mode purposes

```

## Stay in touch

- [Vincios L. Biluca](https://github.com/biluca)
- [Instagram](https://www.instagram.com/viniciosbiluca.dev/)
- [Linkedin](https://www.linkedin.com/in/vinicios-biluca/)

