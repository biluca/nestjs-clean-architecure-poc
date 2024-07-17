# A Nest.js Project as a Clean Architecture Proof of Concept

<p align="center">
  <a href="http://nestjs.com/" target="blank">
  <img src="src\resources\img\nestjs.png" height="300" alt="Nest Logo" />
  </a>
</p>


## Description

This is a simple POC (Proof of Concept) Project Organization using the Clean Architecure Principles. The main idea is to propose some ideas regarding:

- Files & Folders Structure;
- Nomenclature of Components;
- Exploration of Clean Architecture Principles;

For this project, it was chosen a CRUD API, which allows the user to create and manage events for track purposes (Event Tracker API). The code shows the possibilities of using a single and solid core of business rules, which was called the Application Domain, alongside the Flow Control and Service Providers Layers.

This project was separated in two versions, the first was based on a integration with the Self-Contained SQLite Database, the other version was based on a integration with the also Self-Contained DuckDB Database. This approach was used to show the easiness of changes and adaptability that the Clean Archicture provides, protecting the Application Domain from external (and quite commmon) changes.

## Clean Architecture

<p align="center">
  <a href="http://nestjs.com/" target="blank">
  <img src="src\resources\img\cleanarchitecture.png" height="300" alt="Clean Architecture" />
  </a>
</p>

In his book, Clean Architecture,  Robert C. Martin (Uncle Bob) outlines principles for designing software systems that are flexible, maintainable, and scalable. It advocates for separating the system into layers with clear responsibilities, promoting decoupling between high-level and low-level components. The core idea is to structure the system such that the business logic is independent of frameworks, user interfaces, databases, and external agencies. 

Key concepts include:

- **Dependency Rule:** Source code dependencies can only point inward, towards higher-level policies.
- **Entities:** Represent the business objects and encapsulate the core business rules.
- **Use Cases:** Contain the application-specific business rules and orchestrate the flow of data to and from the entities.
- **Interface Adapters:** Convert data from the format most convenient for the entities and use cases to the format most convenient for external agencies such as the web, database, etc.
- **Frameworks and Drivers:** Contain details like the database, web framework, etc., and are at the outermost layer, changing easily without affecting the business rules.

The architecture emphasizes keeping the system's core business logic unaffected by external changes, promoting longevity and adaptability.

## The Project's Proposal

Highly inspired by the principles of Uncle Bob, alongside a mix of experience building back-end projects and Architectural discussions with peers, I have proposed and idea on how organize a project, since the organization of files and folders, until the naming the main components. You can see the concept in the diagram below:

<p align="center">
  <a href="http://nestjs.com/" target="blank">
  <img src="src\resources\img\archproposal.png" height="300" alt="Proposal" />
  </a>
</p>

The key concepts of this idea are:

- **Application Domain:** This layer is composed by Models, Processors and Interfaces.
  - **Models:** Represent the business model and gives structure to the data that the application is processing.
  - **Processors:** As the name sugests, this components has the responsability of execute processes. That being said, it encapsulates the core business rules. The processor are the whole reason that the application existes.
  - **Interfaces:** This components serve as a bridge between the Application Domain to the Application Service Providers. It describes all the requirements having the Models and Processor as sole base.
- **Application Flow Control:** This layer is composed by Controllers, it controls the flow inside the application. This layer is responsible for exposing the Application resources to the external world, alongside providing the right connections between the Application Domain and Application Service Providers layers.
- **Application Service Providers:** This layer can be separated into two components: Providers and Services.
  - **Providers:** This components are design to met the requirments of the Application Domain Interfaces, integrating with the Services and attending to its requirements.
  - **Services:** This components serve as a bridge between the Application Domain and the External World.
- **Dependency Direction:** As the Clean Architecture Principles explain, the dependency direction can only point inward towards the Application Domain Layer. Obeying this principle is a key point to have a Clean Architecure.

To make it clear the behavior and relations between this components I have designed the diagram below, take into consideration the presented Event Tracker Project:

<p align="center">
  <a href="http://nestjs.com/" target="blank">
  <img src="src\resources\img\appproposal1.png" alt="Project Diagram" />
  </a>
</p>

To evidence that it possible to keep the Application Domain unaffected by external changes, I decided to implement another version of the API. In the diagram below you will see the two versions of the API, one integration with the SQLite Database Service and the other integrating with the DuckDB Database Service, you will notice that the Application Domaing remained the same without any changes:

<p align="center">
  <a href="http://nestjs.com/" target="blank">
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

