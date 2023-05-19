## docker build --tag node-docker .
## docker run -it -p 3000:3000 node-docker
# syntax=docker/dockerfile:1

# Specify the docker image to base off of
FROM node:12.18.1
# Can be production
ENV NODE_ENV=developement
# Create a working directory in the container
WORKDIR /app
# Copy package stuff in for npm install
COPY ["package.json", "package-lock.json*", "./"]
# Can be --production
RUN npm install --developement
# This copies everything into the container.
COPY . .
# This is what actually gets executed
CMD [ "npm", "start" ]
