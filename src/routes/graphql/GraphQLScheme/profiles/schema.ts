import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLInputObjectType,
} from 'graphql';
import { GraphQLMemberIdType, GraphQLMemberType } from '../member-types/schema.js';
import { UUIDType } from '../../types/uuid.js';
import { assert } from 'console';
import { GraphQlUserType } from '../user/schema.js';

export const GraphQlProfileType = new GraphQLObjectType({
  name: 'profileType',
  fields: () => ({
    id: {
      type: UUIDType,
    },
    isMale: {
      type: GraphQLBoolean,
    },
    yearOfBirth: {
      type: GraphQLInt,
    },
    userId: {
      type: UUIDType,
    },
    memberTypeId: {
      type: GraphQLMemberIdType,
    },
    memberType: {
      type: GraphQLMemberType,
      resolve: async (obj, _args, context) => {
        return await context.prisma.memberType.findUnique({
          where: {
            id: obj.memberTypeId,
          },
        });
      },
    },
    user: {
      type: GraphQlUserType,
      resolve: async (obj, _args, context) => {
        return await context.prisma.user.findUnique({
          where: {
            id: obj.userId,
          },
        });
      },
    },
  }),
});
