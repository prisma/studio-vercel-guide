# This Project is no longer maintained

We have released a hosted version of Studio which you can use instead: https://cloud.prisma.io/

If you are still interested in hosting Studio yourself you can consult the remaining of this readme but we will not be maintaining this guide any more.

---

# (Old guide) Studio x Vercel

This guide shows you how to deploy Studio alongside your app on Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fprisma%2Fstudio-vercel-guide%2Ftree%2Fmain)

### Disclaimers

Since Studio is built to be used locally and with the Prisma CLI, there are a few pitfalls:

1. Studio does not make any guarantees with security measures that come with exposing your database on the internet. It is recommended that you only deploy Studio on an internal network or behind a authentication server, as it is trivial make destructive changes to your database from Studio.
2. Studio's bundle size is substantial. This might make initial loads slower on some connections.
3. Studio's version does not match Prisma CLI's versions exactly. The latest release on [Studio's releases page](https://github.com/prisma/studio/releases) is always considered compatible with the [latest Prisma CLI](https://github.com/prisma/prisma/releases) version. For sake of stability, manual version updates are recommended. Using the `latest` tag from NPM might result in issues.

### Background information

Studio, just like most web apps, has a frontend and a backend. Studio's frontend communicates with the backend via HTTP POST calls.

- The frontend is essentially only a shell, and does not communicate with your database directly. The frontend can be deployed to be accessible on any URL of your choice.
- The backend sends Prisma Client requests to your database, and relays the response back to the frontend. The backend _must_ be available at `yoursite.com/api/prisma/studio`, since the frontend is hard-coded to communicate on this URL.

### Steps

This guide assumes you want Studio('s frontend) to be accessible at `yoursite.com/_internal/studio`. You can change this to any URL you want, and adjust the following steps accordingly.

1. _Preparing Studio's frontend_:

- Install the `@prisma/studio` package.
- Use a Vercel build script to copy Studio's client side assets to a `public/_internal` directory during builds. You may reference the script in `scripts/build.sh` to do this.
- Note that since file paths within Studio's frontend code are relative, you would put Studio's client side assets in `public/_internal`, and NOT in `public/_internal/studio` (One level higher that what you expect)

2. _Preparing Studio's backend_:

   - Install the `@prisma/studio-vercel`, `@prisma/cli` & `@prisma/client` packages. Prisma CLI may / should be a `devDependency`
   - Create an `api/prisma/studio.js` file, and populate it with this repo's `api/prisma/studio.js`s contents, replacing `schemaPath` with your schema's path. You will likely also remove SQLite specific code.

3. _Deploying to Vercel_
   - At this point, if you deploy your app to Vercel, Studio should be accessible at `yoursite.com/_internal/vercel.html`
   - In order to make this URL prettier, you can use Vercel's `routes` config to rewrite routes. `vercel.json` in this repo shows you how.
   - Once URL modifications are made, Studio will be accesible at `yoursite.com/_internal/studio`.

If you encounter issues / have questions, please open issues on this repo!
