require('dotenv').config()

const { GraphQLServer } = require('graphql-yoga')
const { makeSchema, schema } = require('nexus')
// const { makeSchema } = require ('@nexus/schema')
const { PrismaClient } = require('@prisma/client')
const { nexusPrismaPlugin } = require('nexus-prisma')
const { objectType, enumType, intArg, stringArg, scalarType } = schema
const { GraphQLDate } = require('graphql-iso-date')

const Ask = objectType({
  name: 'Ask',
  definition(t) {
    t.string('comments', { nullable: true })
    t.field('createdAt', { type: DateTime })
    t.field('itemCategory', {
      type: ItemCategoryEnum,
      nullable: true,
    })
    t.id('id')
    t.int('quantity', { nullable: true })
    t.field('status', {
      type: AskStatusEnum,
      nullable: true,
    })
    t.field('transportMethod', {
      type: TransportMethodEnum,
      nullable: true,
    })
    t.field('userProfile', {
      type: UserProfile,
      nullable: true,
    })
  }
})
const Give = objectType({
  name: 'Give',
  definition(t) {
    t.string('comments', { nullable: true })
    t.field('createdAt', { type: DateTime })
    t.field('itemCategory', {
      type: ItemCategoryEnum,
      nullable: true,
    })
    t.id('id')
    t.string('image', { nullable: true })
    t.field('pickupLocation', {
      type: LocationType,
      nullable: true,
    })
    t.int('quantity', { nullable: true })
    t.field('status', {
      type: GiveStatusEnum,
      nullable: true,
    })
    t.field('transportMethod', {
      type: TransportMethodEnum,
      nullable: true,
    })
    t.field('userProfile', {
      type: UserProfile,
      nullable: true,
    })
  }
})
const Item = objectType({
  name: 'Item',
  definition(t) {
    t.string('comments', { nullable: true })
    t.field('createdAt', { type: DateTime })
    t.field('itemCategory', {
      type: ItemCategoryEnum,
      nullable: true,
    })
    t.string('description', { nullable: true })
    t.id('id')
    t.string('name', { nullable: true })
    t.field('itemType', { type: ItemType })
    t.field('userProfile', { type: UserProfile })
  }
})
const ItemType = objectType({
  name: 'ItemType',
  definition(t) {
    t.id('id')
    t.string('name', { nullable: true })
    t.field('variants', {
      type: Item,
      list: [false],
      nullable: true,
    })
  }
})
const LocationType = objectType({
  name: 'LocationType',
  definition(t) {
    t.string('address', { nullable: true })
    t.id('id')
    t.string('latitude', { nullable: true })
    t.string('longitude', { nullable: true })
  }
})
const Notification = objectType({
  name: 'Notification',
  definition(t) {
    t.field('createdAt', { type: DateTime })
    t.id('id')
    t.string('message', { nullable: true })
    t.boolean('readStatus', { nullable: true })
    t.string('title', { nullable: true })
    t.field('userProfile', { type: UserProfile })
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

const AskPriorityEnum = enumType({
  name: 'AskPriorityEnum',
  members: ['A','B','C','D','F'],
})
const AskStatusEnum = enumType({
  name: 'AskStatusEnum',
  members: ['Pending','Verified','Returned','Completed','Cancelled'],
})
const GiveStatusEnum = enumType({
  name: 'GiveStatusEnum',
  members: ['Pending','Verified','Returned','Completed','Cancelled'],
})
const ItemCategoryEnum = enumType({
  name: 'ItemCategoryEnum',
  members: ['Household','Meals','Medical'],
})
const TransportMethodEnum = enumType({
  name: 'TransportMethodEnum',
  members: ['Delivery','Pickup'],
})

const DateTime = GraphQLDate

const prisma = new PrismaClient()

// eslint-disable-next-line no-process-env
const ENDPOINT = `http://${process.env.HOST || 'localhost' }:${process.env.PORT || '4000' }`

new GraphQLServer({
  schema: makeSchema({
    types: [ Ask, Give, Item, LocationType, Notification, UserProfile ],
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
