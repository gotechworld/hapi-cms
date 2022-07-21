import Glue from "@hapi/glue";
import Minimist from "minimist";
import { isUndefined } from "lodash";

const KEEP_ALIVE_TIMEOUT = process.env.KEEP_ALIVE_TIMEOUT || (65 * 1000);
const HEADERS_TIMEOUT = process.env.HEADERS_TIMEOUT || (70 * 1000);

const CatboxRedis = require("@hapi/catbox-redis");
const loadManifest = () => {
  const args = Minimist(process.argv.slice(2));
  const configPath = isUndefined(args.CONFIG_FILE)
    ? "./config/manifest.json"
    : args.CONFIG_FILE;
  return require(configPath); // eslint-disable-line
};

const startApp = async (manifest, options) => {
  manifest.server.cache[0].provider.constructor = CatboxRedis;

  const server = await Glue.compose(manifest, options);
  await server.start();
  server.listener.keepAliveTimeout = parseInt(KEEP_ALIVE_TIMEOUT);
  server.listener.headersTimeout = parseInt(HEADERS_TIMEOUT);

  server.log(["info"], `Server started at: ${server.info.uri}`);
};

const options = { relativeTo: __dirname };
startApp(loadManifest(), options);

process
  .on("unhandledRejection", (reason, p) => {
    console.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", err => {
    console.error(err, "Uncaught Exception thrown");
    process.exit(1);
  });
