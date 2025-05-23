# 1. Install dependencies
FROM node:22.14.0-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install

# 2. Build the app with env variable passed in
FROM node:22.14.0-alpine AS builder
WORKDIR /app

# Accept the API URL during build
ARG NEXT_PUBLIC_ICHOOSERX_BE_BASE_URL
ARG NEXT_PUBLIC_PYTHON_MICROSERVICE_URL

ENV NEXT_PUBLIC_ICHOOSERX_BE_BASE_URL=$NEXT_PUBLIC_ICHOOSERX_BE_BASE_URL
ENV NEXT_PUBLIC_PYTHON_MICROSERVICE_URL=$NEXT_PUBLIC_PYTHON_MICROSERVICE_URL

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Debug: Print the injected env var
RUN echo "🔍 Backend API URL: $NEXT_PUBLIC_ICHOOSERX_BE_BASE_URL"
RUN echo "🔍 Microservice API URL: $NEXT_PUBLIC_PYTHON_MICROSERVICE_URL"
RUN echo "🧪 Next.js env during build: $(node -p 'process.env.NEXT_PUBLIC_ICHOOSERX_BE_BASE_URL')"
RUN echo "🧪 Next.js env during build: $(node -p 'process.env.NEXT_PUBLIC_PYTHON_MICROSERVICE_URL')"

# Will embed NEXT_PUBLIC_* into the built static files
RUN npm run build

# 3. Final image for serving the app
FROM node:22.14.0-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

# (Optional) Add a user to run the app as non-root
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Copy all runtime files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Run as non-root user
USER nextjs

EXPOSE 8080

CMD ["npx", "next", "start", "-p", "8080"]