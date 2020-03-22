# :warning: THIS IS A TEMPLATE

### This template contains working examples of the following:

- Initial database migration (see [`/db`](https://github.com/mihaichiritescu/crm-service/tree/master/db/migration))
- Examples of a simple `GET` and `POST` API (see [`/src/instances/`](https://github.com/mihaichiritescu/crm-service/tree/master/src/instances))
- Runnable working tests (see `.spec.ts` files)
- Examples of type, enum and test data definitions (see [`types.d.ts`](https://github.com/mihaichiritescu/crm-service/tree/master/src/types/types.d.ts), [`enums.ts`](https://github.com/mihaichiritescu/crm-service/tree/master/src/enum.ts), [`data.ts`](https://github.com/mihaichiritescu/crm-service/tree/master/src/test-support/data.ts))
- Standard server and logger setup (see [`/src/index.ts`](https://github.com/mihaichiritescu/crm-service/tree/master/src/index.ts))

### To use this template:

- Find and replace all references to `crm-service` with the name of your service using the 'Match Case' option
- Find and replace all references to `crm-service` with the name of your service using the 'Match Case' option
- Find and replace all references to port `880X` with the next unused port number (see other services for latest)
- Update the [`swagger/api.yaml`](https://github.com/mihaichiritescu/crm-service/tree/master/swagger/api.yaml) to match your new API
- Update the database migration file [`V0_1__initial.sql`](https://github.com/mihaichiritescu/crm-service/tree/master/db/migration/V0_1__initial.sql) to create your desired database initial migration
- The entire [`/src/instances`](https://github.com/mihaichiritescu/crm-service/tree/master/src/instances)  folder should be removed or edited to work with your desired model
- Data in [`types.d.ts`](https://github.com/mihaichiritescu/crm-service/tree/master/src/types/types.d.ts), [`enums.ts`](https://github.com/mihaichiritescu/crm-service/tree/master/src/enum.ts) and [`data.ts`](https://github.com/mihaichiritescu/crm-service/tree/master/src/test-support/data.ts) should be removed or updated
- Delete everything from the top of this document to the next `***` and update the rest of the `README` accordingly
- Follow [the documentation to create a new service](https://github.com/mihaichiritescu/crm-service) to get fully setup

***

# crm-service

CRM service

## Purpose

Simple CRM service

## Definition

### Endpoint Definitions

This repository has an updated [Swagger definition](https://github.com/mihaichiritescu/crm-service/blob/master/swagger/api.yaml) of all the endpoints it provides. Drop the contents of the file in the [Swagger editor](https://editor.swagger.io/) for easy review.

### Environment Variables

| Name                    | Description                                                               | Example Value           | Required
|-------------------------|---------------------------------------------------------------------------|-------------------------|----------
| `APPLICATION_NAME`      | Application name used in New Relic.                                       |           `crm-service` |     ✔️
| `BASE_URL`              | Base URL where the service is run.                                        | `http://localhost:880X` |     ✔️
| `DATABASE_USER`         | Database username.                                                        |              `postgres` |     ✔️
| `DATABASE_PASSWORD`     | Database password.                                                        |              `postgres` |     ✔️
| `DATABASE_HOST`         | Database hostname.                                                        |             `localhost` |     ✔️
| `DATABASE_NAME`         | Database name.                                                            |                   `crm` |     ✔️
| `DATABASE_PORT`         | Database port.                                                            |                  `5432` |     ✔️
| `ENVIRONMENT`           | Current environment (`local`, `dev`, `accept`, `stage`, `prod`).          |                 `local` |     ✔️
| `LOG_ALL_REQUESTS`      | Log all requests / responses handled by the service (flag).               |                  `true` |
| `LOG_LEVEL`             | The maximum level of messages that will log.                              |                 `debug` |
| `NEW_RELIC_LICENSE_KEY` | New Relic license key.                                                    |                `ABC123` |
| `POSTGRES_MAX`          | Maximum number of database connections allowed.                           |                   `800` |
| `PRODUCT`               | Product target for this application (`llc`, `shared`).                    |                `shared` |     ✔️

```
export APPLICATION_NAME=crm-service
export BASE_URL=http://localhost:880X
export DATABASE_USER=postgres
export DATABASE_PASSWORD=postgres
export DATABASE_HOST=localhost
export DATABASE_NAME=crm
export DATABASE_PORT=5432
export ENVIRONMENT=local
export PRODUCT=shared
```

## Development

For a full description of available commands:

```
yarn describe
```

Try to follow the [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0-beta.3) when committing code, as it is use to generate the [CHANGELOG.md](https://github.com/mihaichiritescu/crm-service/blob/master/CHANGELOG.md).

### Install

1. Node.js

You need to install node.js 12+, you can find it [here](https://nodejs.org/en/).

2. Flyway

You also need Flyway to run database commands, you can find it [here](https://flywaydb.org/getstarted/firststeps/commandline) or use `brew`:

```
brew install flyway
```

3. Dependencies

We recommend using `yarn` to install the project dependencies:

```
yarn
```

### Build

Building the project in the `/build` directory:

```
yarn build
```

### Run

Start the database and run the migrations:

```
yarn db:start
source bin/db-env
```

Actually run the service:

```
yarn start
```

You can then send requests to the service using cURL or the tool of your choice:

```
curl -H "Content-Type: application/json" -X POST http://localhost:880X/v1/my-endpoint -d '{"foo":"bar"}'
```

#### Docker

```
docker run \
  -e APPLICATION_NAME=crm-service \
  -e BASE_URL="http://localhost:880X" \
  -e DATABASE_HOST=$(ifconfig | grep -E "([0-9]{1,3}\.){3}[0-9]{1,3}" | grep -v 127.0.0.1 | awk '{ print $2 }' | cut -f2 -d: | head -n1) \
  -e DATABASE_PORT=5432 \
  -e DATABASE_USER=postgres \
  -e DATABASE_PASSWORD=postgres \
  -e DATABASE_NAME=crm \
  -e ENVIRONMENT=local \
  -e PRODUCT=shared \
  -p 880X:880X \
  crm-service:latest
```

### Test

Testing this project can be done as a single task using:

```
yarn test
```

or it can be automatically re-run on code changes by running:

```
yarn watch
```

#### Linter

If the linting tests fail, you can fix the issues automatically by running:

```
yarn fix
```

### Release

```
yarn release
git push --follow-tags upstream master
```

***

#### Note

The base of this project was built using [typescript-starter](https://github.com/bitjson/typescript-starter), if you need further information on how to use the tooling available for this repository, please visit its [README](https://github.com/bitjson/typescript-starter/blob/master/README.md).
