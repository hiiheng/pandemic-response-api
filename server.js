require('dotenv').config();
const { GraphQLServer } = require('graphql-yoga')
const { makeSchema, schema  } = require('nexus')
const { PrismaClient } = require('@prisma/client')
const { nexusPrismaPlugin } = require('nexus-prisma')

const { objectType, enumType, intArg, stringArg } = schema;

const Ask = objectType({
  name: 'Ask',
  definition(t) {
    t.id('id')
    t.field('itemType', {
      type: ItemTypeEnum,
      nullable: true,
    })
    t.int('quantity', { nullable: true })
    t.string('comments', { nullable: true })
    t.id('userID')
  }
})
const Give = objectType({
  name: 'Give',
  definition(t) {
    t.id('id')
    t.field('itemType', {
      type: ItemTypeEnum,
      nullable: true,
    })
    t.int('quantity', { nullable: true })
    t.string('comments', { nullable: true })
    t.field('transportMethod', {
      type: TransportMethodEnum,
      nullable: true,
    })
    t.field('pickupLocation', {
      type: LocationType,
      nullable: true,
    })
    t.string('image', { nullable: true })
    t.id('userId')
  }
})
const Item = objectType({
  name: 'Item',
  definition(t) {
    t.id('id')
    t.string('name', { nullable: true })
    t.field('itemType', {
      type: ItemTypeEnum,
      nullable: true,
    })
    t.string('description', { nullable: true })
    t.string('comments', { nullable: true })
    t.id('userId')
  }
})
const LocationType = objectType({
  name: 'LocationType',
  definition(t) {
    t.id('id')
    t.string('address', { nullable: true })
    t.string('latitude', { nullable: true })
    t.string('longitude', { nullable: true })
  }
})
const Notification = objectType({
  name: 'Notification',
  definition(t) {
    t.string('message', { nullable: true })
    t.string('title', { nullable: true })
    t.field("createdAt", {
      type: DateTime,
      nullable: true,
    })
    t.id('id')
    t.id('userId')
    t.boolean('readStatus', { nullable: true })
  }
})
const Query = objectType({
  name: 'Query',
  definition(t) {
    t.field('user', { type: UserProfile })
    t.field('item', { type: Item })
    t.field('ask', { type: Ask })
    t.field('give', { type: Give })
  }
})
const UserProfile = objectType({
  name: 'UserProfile',
  definition(t) {
    t.id('id')
    t.string('name', { nullable: true })
    t.field('notifications', {
      type: Notification,
      list: [false],
      nullable: true,
    })
  }
})

const ItemTypeEnum = enumType({
  name: 'ItemTypeEnum',
  members: ['Medical','Household','Meals'],
});
const TransportMethodEnum = enumType({
  name: 'TransportMethodEnum',
  members: ['Pickup','Delivery'],
});

const DateTime = scalarType({
  name: "DateTime",
  serialize() { /* Todo */ },
  parseValue() { /* Todo */ },
  parseLiteral() { /* Todo */ }
})

const ENDPOINT = `http://${process.env.HOST || 'localhost' }:${process.env.PORT || '4000' }`
const prisma = new PrismaClient()

new GraphQLServer({
  schema: makeSchema({
    types: [Query, Mutation, Ask, Give, Item, LocationType, Notification, UserProfile ],
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

module.exports = { Ask, Give, Item, LocationType, Notification, UserProfile }
