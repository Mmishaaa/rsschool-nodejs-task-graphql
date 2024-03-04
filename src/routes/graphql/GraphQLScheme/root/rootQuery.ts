import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { GraphQlUserType } from '../user/schema.ts';
import { GraphQlProfileType } from '../profiles/schems.js';
import { GraphQlPostType } from '../posts/schema.js';
import { GraphQLMemberType, GraphQLMemberIdType } from '../member-types/schema.js';
import { UUIDType } from '../../types/uuid.js';

export const rootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    users: {
      type: new GraphQLList(GraphQlUserType),
      resolve: async (_obj, _args, context) => {
        console.log('USERS');
        return await context.prisma.user.findMany();
      },
    },
    user: {
      type: GraphQlUserType,
      args: {
        id: {
          type: UUIDType,
        },
      },
      resolve: async (_obj, args, context) => {
        return await context.prisma.user.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    },
    profiles: {
      type: new GraphQLList(GraphQlProfileType),
      resolve: async (_obj, _args, context) => {
        return await context.prisma.profile.findMany();
      },
    },
    profile: {
      type: GraphQlProfileType,
      args: {
        id: {
          type: UUIDType,
        },
      },
      resolve: async (_obj, args, context) => {
        return await context.prisma.profile.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    },
    posts: {
      type: new GraphQLList(GraphQlPostType),
      resolve: async (_obj, _args, context) => {
        return await context.prisma.post.findMany();
      },
    },
    post: {
      type: GraphQlPostType,
      args: {
        id: {
          type: UUIDType,
        },
      },
      resolve: async (_obj, args, context) => {
        return await await context.prisma.post.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    },
    memberTypes: {
      type: new GraphQLList(GraphQLMemberType),
      resolve: async (_obj, _args, context) => {
        console.log('MEMEBERTYPEEEE');
        console.log(context.prisma.memberType.findMany());
        return context.prisma.memberType.findMany();
      },
    },
    memberType: {
      type: GraphQLMemberType,
      args: {
        id: {
          type: GraphQLMemberIdType,
        },
      },
      resolve: async (_obj, args, context) => {
        console.log('MEMEBERTYPEEEEIIIIIIIIIIIIIDDDDDDDDDDDDDDDD');
        return context.prisma.memberType.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    },
  }),
});
