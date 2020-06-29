# api-server-koa

This is the API server for [Bioinformatics and Mathematical Biosciences Lab (BMBL)](https://u.osu.edu/bmbl/). Ther server builds on top of Koa.js, MYSQL, providing REST API and GraphQL for bioinformatics web servers and databases in the lab.

## Todos

- Implement GraphQL
- Add installation tutorial from loading all DESSO sql files

## Install

```
git clone git@github.com:Wang-Cankun/api-server-koajs.git
cd api-server-koajs
npm install
```

### Add configuration file

create a `.env` file and set the koa.js port, database username & password:

```env
DB_USER=XXXX
DB_PASSWORD=YYYY
DB_URL=ZZZZ
PORT=8889
```

We use `Sequelize` to connect out MYSQL database, first export MYSQL table structure using [`sequelize-auto`](https://github.com/sequelize/sequelize-auto):

```env
npm install -g sequelize-auto
npm install -g mysql
```

After installed [`sequelize-auto`] and [`mysql`],enter [`./server`] folder, run the following command:

```env
sequelize-auto -o "./schema/desso" -d desso -h 127.0.0.1 -u root -p 3306 -x YOUR_PASSWORD -e mysql
```

### Start the server

### Node.js

Beacuse of using Koa2, `Node.js >= v7.6.0` is needed.

#### Development:

`npm run dev` && `npm run server`

open browser: `localhost:8889`

#### Production:

Prerequisite: install [PM2](https://www.npmjs.com/package/pm2)

Start the production server in PM2:

`npm run serve`

open browser: `localhost:8890`
