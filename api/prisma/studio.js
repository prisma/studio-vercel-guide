const path = require("path");
const { default: StudioHandler } = require("@prisma/studio-vercel");

// Only needed for this example. This allows `@vercel/nft` to determine that this file is in use (and so does not need to be pruned).
// If you use Postgres / MySQL, you will instead use a connection string, and will not have a DB file, and so this can be removed.
path.join(process.cwd(), "prisma/dev.db");

// Forward the Request & Response objects to `StudioHandler`. You should configure YOUR `schemaPath` here.
module.exports = StudioHandler({
  schemaPath: path.resolve(__dirname, "../../prisma/schema.prisma"),
});
