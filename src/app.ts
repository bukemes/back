//config & init
import express, { Application } from 'express';
import dotenv from 'dotenv';
//middleware
import compression from 'compression';
//security
import helmet from 'helmet'; //import xss from 'xss'; -> helmet.xss(); takes care of that.
import cors from 'cors';
//documentation
import swaggerUI from 'swagger-ui-express';
import openapiSpecification from './utilities/swagger';
// import swaggerJSDoc from 'swagger-jsdoc';
// import { Tsoa } from 'tsoa';
// import swaggerOptions from './docs/openapi.json';
//db
import mongoose from 'mongoose';
//custom shit
import logger from './utilities/logger';
// routes
import toursRouter from './routers/toursRouter';

// setup
dotenv.config(); //get environment variables
const app: Application = express(); //create express app
const port = process.env.PORT || 9001; //create port variable

// middleware
app.use(compression()); // gzip
app.use(helmet()); // xss and other stuff
app.use(cors()); // cors
app.use(express.json()); // json
app.use('/docs', swaggerUI.serve, swaggerUI.setup(openapiSpecification));

//routes
app.use('/api/tours', toursRouter);

const DB_URI = 'mongodb://andrei:nHZtFji3qPejxVLyzGVJaejX@localhost:27017/testDB?authSource=admin';

mongoose.connect(DB_URI)
    .then(() => {
    // only start listening once connected to db
        app.listen(port, () => {
            logger.info(`⚡️[Bukemes]: Express backend is running at https://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });