require('dotenv').config();
const { GraphQLServer } = require('graphql-yoga')
const { makeSchema, objectType, intArg, stringArg } = require('nexus')
const { PrismaClient } = require('@prisma/client')
const { nexusPrismaPlugin } = require('nexus-prisma')

const Query = objectType({
  name: 'Query',
  definition(t) {
  },
})

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
  },
})

const ENDPOINT = `http://${process.env.HOST || 'localhost' }:${process.env.PORT || '4000' }`
const prisma = new PrismaClient()

new GraphQLServer({
  schema: makeSchema({
    types: [Query, Mutation],
    plugins: [nexusPrismaPlugin()],
    outputs: {
      schema: __dirname + '/../schema.graphql',
      typegen: __dirname + '/generated/nexus.ts',
    },
  }),
  context: { prisma },
}).start(() =>
  console.log(
    `🚀 Server ready at: ${ENDPOINT}\n⭐️ See sample queries: http://pris.ly/e/js/graphql#using-the-graphql-api`,
  ),
)

module.exports = { User, Post }
