import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { GraphQLSchema, graphql, parse } from 'graphql';
import { validate } from 'graphql/validation/validate.js';
import depthLimit from 'graphql-depth-limit';

import { rootQuery } from './GraphQLScheme/root/rootQuery.js';
import { rootMutation } from './GraphQLScheme/root/rootMutation.js';

const DEPTH_LIMIT = 5;

export const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req, reply) {
      const { query, variables } = req.body;

      try {
        const errors = validate(schema, parse(query), [depthLimit(DEPTH_LIMIT)]);
        if (errors.length > 0) {
          console.log(errors);
          return { errors };
        }
      } catch (err) {
        if (
          err &&
          typeof err === 'object' &&
          'message' in err &&
          typeof err.message === 'string'
        ) {
          throw fastify.httpErrors.badRequest(`Invaid GQL query: ${err.message}`);
        }
        throw new Error();
      }

      console.log(query);
      console.log(variables);

      return await graphql({
        schema,
        source: query,
        contextValue: {
          prisma,
        },
        variableValues: variables,
      });
    },
  });
};
export default plugin;
