import {
  GraphQLFloat,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInputObjectType,
} from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { GraphQlProfileType } from '../profiles/schems.js';
import { GraphQlPostType } from '../posts/schema.js';

export const GraphQlUserType = new GraphQLObjectType({
  name: 'userType',
  fields: () => ({
    id: {
      type: UUIDType,
    },
    name: {
      type: GraphQLString,
    },
    balance: {
      type: GraphQLFloat,
    },
    profile: {
      type: GraphQlProfileType,
      resolve: async (obj, _args, context) => {
        return await context.prisma.profile.findUnique({
          where: {
            userId: obj.id,
          },
        });
      },
    },
    posts: {
      type: new GraphQLList(GraphQlPostType),
      resolve: async (obj, _args, context) => {
        return await context.prisma.post.findMany({
          where: {
            authorId: obj.id,
          },
        });
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(GraphQlUserType),
      resolve: async (obj, _args, context) => {
        return await context.prisma.user.findMany({
          where: {
            subscribedToUser: {
              some: {
                subscriberId: obj.id,
              },
            },
          },
        });
      },
    },
    subscribedToUser: {
      type: new GraphQLList(GraphQlUserType),
      resolve: async (obj, _args, context) => {
        return await context.prisma.user.findMany({
          where: {
            userSubscribedTo: {
              some: {
                authorId: obj.id,
              },
            },
          },
        });
      },
    },
  }),
});
