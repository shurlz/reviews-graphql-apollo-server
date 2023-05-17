import { server } from "./index.js";

import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda';


export const graphqlHandler = startServerAndCreateLambdaHandler(
    server,
    handlers.createAPIGatewayProxyEventV2RequestHandler(), 
);