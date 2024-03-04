import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLString,
} from 'graphql';
import { GraphQlPostType } from '../posts/schema.js';
import { UUIDType } from '../../types/uuid.js';

export const GraphQLMemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: {
      type: GraphQLMemberIdType,
    },
    discount: {
      type: GraphQLFloat,
    },
    postsLimitPerMonth: {
      type: GraphQLInt,
    },
    profiles: {
      type: new GraphQLList(GraphQlPostType),
      resolve: async (obj, _args, context) => {
        return await context.prisma.profile.findMany({
          where: {
            memberTypeId: obj.id,
          },
        });
      },
    },
  }),
});

export const GraphQLMemberIdType = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    business: {
      value: 'business',
    },
    basic: {
      value: 'basic',
    },
  },
});

export const CreatePostInput = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: () => ({
    title: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
    authorId: {
      type: UUIDType,
    },
  }),
});

export const ChangePostInput = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: () => ({
    title: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
    authorId: {
      type: UUIDType,
    },
  }),
});
