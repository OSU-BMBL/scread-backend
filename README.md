# scREAD-backend

This is the API server for [scREAD](https://bmbls.bmi.osumc.edu/scread/). Ther server builds on top of Koa.js and connects to a MYSQL database. The server is developed by [Bioinformatics and Mathematical Biosciences Lab (BMBL)](https://u.osu.edu/bmbl/)

## For new users

The SQL data are stored in the internal MySQL databse at OSUMC, we cannot provide sql files due to the security reasons, thus, building the back end server in your server can be challenging. However, you can still use the scREAD backend api service from a public URL: https://bmbls.bmi.osumc.edu/api/scread.

### Example APIs

```
# List all datasets
https://bmbls.bmi.osumc.edu/api/scread/dataset

# Search differentially expressed genes, e.g. GAD1 gene.
https://bmbls.bmi.osumc.edu/api/scread/de/gene/gad1

```

## Install

```
git clone https://github.com/OSU-BMBL/scread-backend.git
cd scread-backend
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
sequelize-auto -o "./schema/scread" -d scread -h 127.0.0.1 -u root -p 3306 -x YOUR_PASSWORD -e mysql
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
