# Share YouTube Video

The Share YouTube Video project is a web application that enables users to securely share YouTube URLs using JSON Web Tokens (JWT) for authorization. The application also provides notifications to users when the shared videos become available for viewing.

## Introduction

- Share YouTube Video is a platform that allows users to securely share YouTube URLs with others. The application utilizes JSON Web Tokens (JWT) for authentication and authorization, ensuring that only authorized users can share URLs.

- Key Features:
  - User authentication using JWT.
  - Secure sharing of YouTube URLs.
  - Authorization checks to ensure only authorized users can share URLs.
  - Notifications to users when shared videos are available for viewing.

## Prerequisites

- Before you begin, make sure you have the following software and tools installed:
  - [Node 18](https://nodejs.org/en/)
  - [Pnpm 8](https://pnpm.io/)
  - [PostgreSQL 13](https://www.postgresql.org/)
  - [Docker](https://www.docker.com/)
  - [Docker Compose](https://docs.docker.com/compose/)

## Installation & Configuration

1. With Docker

   Execute commands below:

   ```bash
   docker-compose up -d
   ```

   Then, open <http://localhost> in your browser.

2. Without Docker

    Execute commands below:

    ```bash
    pnpm install
    pnpm dev
    ```

    Then, open <http://localhost:3000> in your browser.

## Database Setup

1. If you are using Docker, docker-compose will automatically create the database and run the migrations and seeds.

2. If you are not using Docker, you will need to create the database manually and run the migrations and seeds by executing the commands below from the root of the project:

   ```bash
   pnpm migrate:dev

   pnpm prisma:seed
   ```

## Running the Application

1. If you are using Docker, the application will be running at <http://localhost>.

2. If you are not using Docker, the application will be running at <http://localhost:3000> by run the command below from the root of the project:

   ```bash
   pnpm dev
   ```

3. Run the command below from the root of the project to run the tests:

   ```bash
   pnpm test
   ```

## Docker Deployment

- ### Without Docker Compose

    1. Pull latest postgres image

        ```bash
        docker pull postgres
        ```

    2. Run postgres container

        ```bash
        docker run --name postgres -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 postgres
        ```

    3. Create database

        ```bash
        docker exec -it postgres psql -U postgres -c "CREATE DATABASE share_youtube_video"
        ```

    4. Create .env file

        ```bash
        touch .env
        ```

    5. Add the following to the .env file

        ```bash
        DATABASE_URL="postgresql://postgres:postgres@localhost:5432/share_youtube_video?schema=public"
        ```

    6. Run migrations

        from the root of the project, cd into the `apps/backend` folder and run the command below:

        ```bash
        pnpm migrate:dev
        ```

    7. Run seeds

        from the root of the project, cd into the `apps/backend` folder and run the command below:

        ```bash
        pnpm prisma:seed
        ```

    8. Build and run backend container

        ```bash
        docker build -t share_youtube_video_backend -f apps/backend/Dockerfile .

        docker run --name share_youtube_video_backend -d -p 3001:3001 share_youtube_video_backend
        ```

    9. Build and run frontend container

        ```bash
        docker build -t share_youtube_video_frontend -f apps/frontend/Dockerfile .

        docker run --name share_youtube_video_frontend -d -p 3000:3000 share_youtube_video_frontend
            ```

    10. Open <http://localhost> in your browser.

- ### With Docker Compose

    1. Run the command below from the root of the project:

        ```bash
        docker-compose up -d
        ```

    2. Then, open <http://localhost> in your browser.

## Usage

- With Docker Compose or after seeding the database, It auto generates the database schema and seeds the database with sample data. this is ten accounts auto generated:

    ```txt
    | Username              | Password  |

    | <dev@developer.dev>   | 123456    |

    | <dev1@developer.dev>  | 123456    |

    | <dev2@developer.dev>  | 123456    |

    | <dev3@developer.dev>  | 123456    |

    | <dev4@developer.dev>  | 123456    |

    | <dev5@developer.dev>  | 123456    |

    | <dev6@developer.dev>  | 123456    |

    | <dev7@developer.dev>  | 123456    |

    | <dev8@developer.dev>  | 123456    |

    | <dev9@developer.dev>  | 123456    |
    ```

- After deploying the application using Docker, you can access it at <http://localhost> or <http://localhost:3000> (when running locally). The application provides a secure platform for users to share YouTube URLs, ensuring that only authorized users can share them. Users will receive notifications when the shared videos become available for viewing.

## Troubleshooting

- If you encounter any issues during setup or usage, refer to the following troubleshooting tips:

    1. Docker Compose
        - If you encounter any issues with Docker Compose, try the following:
            - Check that you have Docker Compose installed.
            - Check that you have Docker installed.
            - Check that you have Docker running.
            - Check that you have Docker Compose running.

        - If docker run successfully, but you can't access the application, try the following:
            - Open [`docker-compose.yml`](./docker-compose.yaml) file and check that the ports are not in use.

            - Try to change port of frontend application in [`docker-compose.yml`](./docker-compose.yaml) file then change to another.

                ```yaml
                ports:
                    - 80:80
                ```

                to

                ```yaml
                ports:
                    - 8080:80
                ```

                then open <http://localhost:8080> in your browser.

            - If application run but no data, try to run migration and seed manually.

                ```bash
                docker-compose exec migration pnpm migrate:dev

                docker-compose exec seed pnpm seed
                ```

    2. Without Docker
        - If you encounter any issues with Local Development, try the following:
            - Check that you have Node installed.
            - Check that you have PostgreSQL installed.
            - Check that you have Pnpm installed.
            - Check dependencies is installed.

        - If run application successfully, but have no data, try the following:
            - Run migration and seed manually.

                ```bash
                pnpm migrate:dev

                pnpm seed
                ```
