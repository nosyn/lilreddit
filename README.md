# Reddit Clone Full Stack

- NextJS
- Apollo GraphQL
- Prisma
- PostgresQL

# Debug

# How to run dev env

- Run `yarn dev` from the root level directory

## PostgresQL

- Update and install PostgreSQL `<version>`:  
  `sudo apt-get update`  
  `sudo apt-get install postgresql-<version>`

- By default, the postgres user has no password and can hence only connect if ran by the postgres system user. The following command will assign it:  
  `sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"`  
  `sudo -u postgres psql -c "CREATE DATABASE testdb;"`

- Start the PostgreSQL server:  
  `sudo service postgresql start`

- Stop the PostgreSQL server:  
  `sudo service postgresql stop`
