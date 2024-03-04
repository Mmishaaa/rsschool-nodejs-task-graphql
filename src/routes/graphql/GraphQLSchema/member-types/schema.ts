import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLList,
} from 'graphql';
import { GraphQlPostType } from '../posts/schema.js';

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
