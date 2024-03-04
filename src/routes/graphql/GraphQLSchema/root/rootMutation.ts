import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLNonNull,
  graphql,
  GraphQLID,
} from 'graphql';
import { CreatePostInput, ChangePostInput, GraphQlPostType } from '../posts/schema.js';
import {
  GraphQlProfileType,
  CreateProfileInput,
  ChangeProfileInput,
} from '../profiles/schema.js';
import { UUIDType } from '../../types/uuid.js';
import { CreateUserInput, GraphQlUserType, ChangeUserInput } from '../user/schema.js';

export const rootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createPost: {
      type: GraphQlPostType,
      args: {
        dto: {
          type: CreatePostInput,
        },
      },
      resolve: async (_obj, args, context) => {
        return await context.prisma.post.create({ data: args.dto });
      },
    },
    createUser: {
      type: GraphQlUserType,
      args: {
        dto: {
          type: CreateUserInput,
        },
      },
      resolve: async (source: any, args, context) => {
        return await context.prisma.user.create({
          data: args.dto,
        });
      },
    },
    createProfile: {
      type: GraphQlProfileType,
      args: {
        dto: {
          type: CreateProfileInput,
        },
      },
      resolve: async (_obj, args, context) => {
        return await context.prisma.profile.create({ data: args.dto });
      },
    },
    deletePost: {
      type: GraphQLString,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      resolve: async (_obj, args, context) => {
        await context.prisma.post.delete({
          where: {
            id: args.id,
          },
        });
        return 'Post was successfully deleted';
      },
    },
    deleteProfile: {
      type: GraphQLString,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      resolve: async (_obj, args, context) => {
        await context.prisma.profile.delete({
          where: {
            id: args.id,
          },
        });
        return 'Profile was successfully deleted';
      },
    },
    deleteUser: {
      type: GraphQLString,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      resolve: async (obj, args, context) => {
        await context.prisma.user.delete({
          where: {
            id: args.id,
          },
        });
        return 'User was successfully deleted';
      },
    },
    changePost: {
      type: GraphQlPostType,
      args: {
        id: {
          type: UUIDType,
        },
        dto: {
          type: ChangePostInput,
        },
      },
      resolve: async (_obj, args, context) => {
        return await context.prisma.post.update({
          where: { id: args.id },
          data: args.dto,
        });
      },
    },
    changeProfile: {
      type: GraphQlProfileType,
      args: {
        id: {
          type: UUIDType,
        },
        dto: {
          type: ChangeProfileInput,
        },
      },
      resolve: async (_obj, args, context) => {
        return await context.prisma.profile.update({
          where: { id: args.id },
          data: args.dto,
        });
      },
    },
    changeUser: {
      type: GraphQlUserType,
      args: {
        id: {
          type: UUIDType,
        },
        dto: {
          type: ChangeUserInput,
        },
      },
      resolve: async (_obj, args, context) => {
        return await context.prisma.user.update({
          where: { id: args.id },
          data: args.dto,
        });
      },
    },
    subscribeTo: {
      type: GraphQlUserType,
      args: {
        userId: {
          type: UUIDType,
        },
        authorId: {
          type: UUIDType,
        },
      },
      resolve: async (_obj, args, context) => {
        return await context.prisma.user.update({
          where: {
            id: args.userId,
          },
          data: {
            userSubscribedTo: {
              create: {
                authorId: args.authorId,
              },
            },
          },
        });
      },
    },
    unsubscribeFrom: {
      type: GraphQLString,
      args: {
        userId: {
          type: UUIDType,
        },
        authorId: {
          type: UUIDType,
        },
      },
      resolve: async (_obj, args, context) => {
        await context.prisma.subscribersOnAuthors.delete({
          where: {
            subscriberId_authorId: {
              subscriberId: args.userId,
              authorId: args.authorId,
            },
          },
        });
        return 'User successfully unsubscribed';
      },
    },
  },
});
