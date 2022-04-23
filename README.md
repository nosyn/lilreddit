# Reddit Clone Full Stack

- NextJS
- Apollo GraphQL
- Prisma
- PostgresQL

# Debug

# How to run dev env

- Run `yarn dev` from the root level directory

## Debug PostgresQL (Only if you're trying to run with PostgresQL on your local machine)

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

# Running with minikube and kubectl

- Prerequisites: Having `minikube` and `kubectl` installed on your machine
- From root direc
- `minikube delete` to clean up your machine
- `minikube start`
- `minikube addons enable ingress` - Using the NGINX Ingress Controller
- `kubectl apply -f deploy`
- `minikube service nginx-tcp`
