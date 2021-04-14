// // import { ApolloServer, gql } from "apollo-server-cloud-functions"
// import { ApolloServer, gql } from 'apollo-server-express'
// import * as functions from "firebase-functions"
// import admin from 'firebase-admin'
// import express from 'express'

// admin.initializeApp()
// const db = admin.firestore()
// const app = express();

// const typeDefs = gql`
//     # Comments in GraphQL strings (such as this one) start with the hash(#) symbol.
//     # type Book {
//     #     title: String
//     #     author: String
//     # }

//     # type Query {
//     #     books: [Book]
//     # }
//    type User {
//         firstName: String
//         lastName: String 
//         email: String
//    }
//    type Query {
//         users : [User]
//    }
// `

// const resolvers = {
//     Query: {
//        users: () => {
//           return new Promise((resolve, reject) => {
//               // とりあえずany
//                fetchAllUsers((data: any) => {
//                    resolve(data);
//               });
//           });
//        }
//     }
// }
// // Function to fetch all users from database
// // とりあえずany
// const fetchAllUsers = (callback: any) => {
//     db.collection('users')
//       .get()
//       .then((item) => {
//           // とりあえずanyで
//            const items: any = [];
//            item.docs.forEach(item => {
//                items.push(item.data())
//            });
//       return callback(items);
//     })
//     .catch(e => console.log(e));
// }

// const server = new ApolloServer({ typeDefs, resolvers });
// server.applyMiddleware({ app, path: '/' })
// exports.graphql = functions.https.onRequest(app);

import * as functions from 'firebase-functions'
// const functions = require('firebase-functions');
import admin from 'firebase-admin'
// const admin = require('firebase-admin');
// const express = require('express');
import express from 'express'
// const { ApolloServer, gql } = require('apollo-server-express');
import { ApolloServer, gql } from 'apollo-server-express'
// import log4js from 'log4js'

// const logger = log4js.getLogger();

// Will initialize with default settings and database
admin.initializeApp()
const db = admin.firestore()
const UsersCollection = db.collection('users');

UsersCollection.doc('SF').set({
  firstName: 'San Francisco', lastName: 'CA', email: 'USA'
});
const app = express();

const typeDefs = gql`
    type User {
        firstName: String
        lastName: String
        email: String
    }
    type Query {
        users : [User]
    }
`

const users = [
    {
        firstName: '名前',
        lastName: '下の名前',
        email: 'email'
    },
    {
        firstName: '2ばんめ',
        lastName: '下の名前',
        email: 'email'
    }
]

const resolvers = {
    Query: {
        users: () => users
    }
}

// const resolvers = {
//     Query: {
//         users: () => {
//             return new Promise((resolve, reject) => {
//                 fetchAllUsers((data: any) => {
//                     resolve(data);
//                 });
//             });
//         }
//     }
// }

// const fetchAllUsers = (callback: any) => {
//     console.log('test')
//     db.collection('users')
//         .get()
//         .then((item) => {
//             const items: any = [];
//             item.forEach(item => {
//                 console.log('Adding...')
//                 items.push(item.data())
//             });
//             return callback(items);
//         })
//         .catch(e => console.log(e));
// }
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: '/' })

exports.graphql = functions.https.onRequest(app);
