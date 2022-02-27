import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import resolvers from './resolvers';
import typeDefs from './typeDefs';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';
import { isAuth } from './isAuth';
import { ExtendedRequest } from './types';
dotenv.config();

// Initiating express server
const app = express();
app.use(isAuth as any);

// Creataing apollo server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }: {req: ExtendedRequest}) => ({
        username: req.username
    })
})

// Connecting to MySQL database
export const connection = mysql2.createConnection({
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

// Starting server
(async () => {
    await server.start();
    server.applyMiddleware({ app });

    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}`);
    });
})();