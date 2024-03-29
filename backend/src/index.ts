import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import resolvers from './resolvers';
import typeDefs from './typeDefs';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';
import { isAuth } from './isAuth';
import { ExtendedRequest } from './types';
import { graphqlUploadExpress } from 'graphql-upload';
dotenv.config({ path: '../.env' });

// Initiating express server
const app = express();
app.use(isAuth as any);

// Creataing apollo server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }: {req: ExtendedRequest}) => ({
        userId: req.userId
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

    // Allowing uploads
    app.use(graphqlUploadExpress({
        maxFiles: 10,
        maxFileSize: 10000000000
    }))

    server.applyMiddleware({ app });

    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}`);
    });
})();