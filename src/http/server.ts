import fastify from "fastify";
import fastifyWebsocket from "@fastify/websocket";
import cookie from "@fastify/cookie";

import { createPoll } from "./routes/create-poll";
import { getPoll } from "./routes/get-poll";
import { voteOnPoll } from "./routes/vote-on-poll";
import { pollResults } from "./ws/poll-results";

const app = fastify();

app.register(fastifyWebsocket);

app.register(cookie, {
  secret: "polls-node-application-secret-key",
  hook: "onRequest",
});

app.register(createPoll);
app.register(getPoll);
app.register(voteOnPoll);
app.register(pollResults);

app.listen({ port: 3333 }).then((res) => {
  console.log("HTTP server running");
});
