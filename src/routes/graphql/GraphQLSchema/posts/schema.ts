import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLNonNull,
} from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { GraphQlUserType } from '../user/schema.js';

export const GraphQlPostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: {
      type: UUIDType,
    },
    title: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
    authorId: {
      type: UUIDType,
    },
    author: {
      type: GraphQlUserType,
      resolve: async (obj, _args, context) => {
        await context.user.findUnique({
          where: {
            id: obj.authorId,
          },
        });
      },
    },
  }),
});
