FROM node:15 as builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Build the app
RUN npm run build

# Now host it
FROM nginx:alpine

COPY --from=builder /usr/src/app/dist /var/share/nginx/html
