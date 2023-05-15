import { GraphQLError } from "graphql";

export const customError = (
  errorCode: number,
  errorMessage: string,
  errorCodeMessage: string
): GraphQLError => {
  return new GraphQLError(errorMessage, {
    extensions: {
      code: errorCodeMessage,
      http: { status: errorCode },
    },
  });
};
