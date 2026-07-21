1. Purpose

## Purpose

This document describes the high-level architecture of the Skills Mapping Platform.

It explains how the frontend, backend, databases, AI services, forecasting engine, and external data sources interact to deliver labour market intelligence and career guidance.

This document serves as the architectural reference for all developers working on the project.

## Sysytem overview 

Users

↓

Frontend

↓

FastAPI Backend

↓

Business Services

↓

PostgreSQL
Neo4j
Vector Database

↓

AI Layer

↓

Forecasting Engine



3. Design Principles
## Principles

- Modular architecture
- Separation of concerns
- Single responsibility
- API-first development
- Database abstraction
- AI as a service layer
- Scalable and maintainable codebase
- Secure by default

## Technology Stack

| Layer          | Technology | Purpose              |
| -------------- | ---------- | -------------------- |
| Frontend       | Next.js    | Web application      |
| Backend        | FastAPI    | REST API             |
| ORM            | SQLAlchemy | Database access      |
| Database       | PostgreSQL | Relational data      |
| Graph          | Neo4j      | Skill relationships  |
| AI             | Llama      | Reasoning            |
| Orchestration  | LangChain  | AI pipelines         |
| Authentication | JWT        | User security        |
| Cache          | Redis      | Performance (future) |


## High-Level Architecture

Then describe each step.

Browser

↓

Next.js

↓

FastAPI

↓

Services

↓

Repositories

↓

Databases


6. Frontend Architecture
## Backend Architecture
Explain what each module is responsible for.
-Authentication

-Occupations

-Users

-Experts

-Discussion

-Forecasting

-AI

-Administration
## Database Architecture

PostgreSQL

Stores:

Users
Roles
Occupations
Reviews
Discussions
Neo4j

Stores:

Skills
Relationships
Career pathways
Emerging occupations

Explain why each database is used.

## AI Architecture
User

↓

Backend

↓

AI Service

↓

Llama

↓

Response

and we have to describe where will intergrate AI in our systsem  eg,

Then explain:

Occupation summaries
Skill recommendations
Career guidance
CV analysis (Phase 2)
Trend explanations

Also clarify that the AI does not modify the database directly.


10. Graph Database Architecture
## Forecasting Architecture

we need to explain how our system forcasting works

Labour Market Data

↓

Skill Extraction

↓

Time Series Models

↓

Predictions

↓

Llama Explanation

Explain that machine learning produces forecasts, while the LLM explains them.

## Security Architecture
-JWT authentication
-Role-based authorization
-Password hashing
## Scalability
Explain how the system can grow. list what you think we can add for it to grow
##  Deployment
Explain development, staging, and production.

Developer

↓

GitHub

↓

CI/CD

↓

Server

↓

Database

↓

Users


## Future Architecture

Phase 2
CV uploads
Job scraping
Semantic search
Skill matching

Phase 3
Forecasting
Recommendation engine
Knowledge graph
AI assistant

## Architectural Decisions
| Decision   | Reason                                       |
| ---------- | -------------------------------------------- |
| FastAPI    | High performance and strong Python ecosystem |
| PostgreSQL | Reliable transactional database              |
| Neo4j      | Efficient relationship traversal             |
| Next.js    | Server-side rendering and scalability        |
| LangChain  | Structured AI workflows                      |
| Llama      | Self-hosting flexibility                     |

17. Glossary


# Skills Mapping Platform Architecture

## Purpose
Defines the high-level architecture for the Skills Mapping Platform.

## Technology Stack
- Next.js
- FastAPI
- PostgreSQL
- Neo4j
- LangChain
- Llama

## Layers
1. Frontend
2. API
3. Services
4. Repositories
5. Databases
6. AI

## Backend Modules
- Authentication
- Users
- Occupations
- Expert Reviews
- Discussions
- Admin
- AI
- Forecasting

## Database Strategy
### PostgreSQL
Users, occupations, discussions, reviews, audit logs.

### Neo4j
Skills, occupations, relationships, career paths.

## AI
AI generates summaries and recommendations only. It never writes directly to the production database.

## Security
- JWT
- RBAC
- Password hashing
- Validation

## Scalability
- Docker
- Redis
- Celery
- Kubernetes

## Roadmap
Phase 1: Core platform
Phase 2: CV matching & scraping
Phase 3: Forecasting
