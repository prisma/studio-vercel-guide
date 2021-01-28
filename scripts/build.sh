#!/bin/bash

# This script will be run by Vercel when building your app

# This will make this script exit with a non-zero code if any commands in it fail
set -e

# This copies Studio's frontend assets from `node_modules` to `public/_internal`. You should change the destination to whatever URL you expect Studio to be available at.
rm -rf public/_internal
cp -R node_modules/@prisma/studio/build public/_internal