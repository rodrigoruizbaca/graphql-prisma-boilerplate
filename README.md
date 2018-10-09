# graphql-prisma-boilerplate
Make sure prisma is up an running for dev and test environment.
Change the endpoints to the app name and env.
prisma deploy -e ../config/dev.env
prisma deploy -e ../config/test.env
yarn install
change .grapgqlconfig to the correct endpoint
yarn get-schema
get a dev token
prisma token -e ../config/dev.env