# syntax = docker/dockerfile:1

# Adjust BUN as desired
FROM imbios/bun-node as base

# Install bun
RUN curl https://bun.sh/install | bash

LABEL fly_launch_runtime="Bun/Prisma"

# Bun/Prisma app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Set Postgres environment
ENV POSTGRES_URL="postgresql://Lucas-Eduardo-Goncalves:PIJF9DZoyCi2@ep-yellow-shadow-a5c4q2k9.us-east-2.aws.neon.tech/dev-database?sslmode=require"

# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp openssl pkg-config python-is-python3

# Install node modules
COPY --link bun.lockb package.json ./
RUN bun install --ci

# Generate Prisma Client
COPY --link prisma .
RUN bunx prisma generate
RUN bunx prisma db push

# Copy application code
COPY --link . .

# Final stage for app image
FROM base

# Install packages needed for deployment
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y openssl && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Copy built application
COPY --from=build /app /app

# Start the server by default
EXPOSE 3000

CMD [ "bun", "run", "start" ]