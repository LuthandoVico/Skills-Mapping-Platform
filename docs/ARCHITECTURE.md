

## Purpose

This document describes the high-level architecture of the Skills Mapping Platform.

It explains how the frontend, backend, databases, AI services, forecasting engine, and external data sources interact to deliver labour market intelligence and career guidance.

This document serves as the architectural reference for all developers working on the project.

## Sysytem overview 

Users

↓

Frontend (Next.js)

↓

FastAPI Backend (python)



↓

PostgreSQL (relational db)
Neo4j (graph db)
Vector Database (for semantic search and AI)

↓

AI Layer Service (python)

↓

Forecasting Engine (python)



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







## Security Architecture
-JWT authentication
-Role-based authorization
-Password hashing





## Architectural Decisions
| Decision   | Reason                                       |
| ---------- | -------------------------------------------- |
| FastAPI    | High performance and strong Python ecosystem |
| PostgreSQL | Reliable transactional database              |
| Neo4j      | Efficient relationship traversal             |
| Next.js    | Server-side rendering and scalability        |
| LangChain  | Structured AI workflows                      |
| Llama      | Self-hosting flexibility                     |




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
