FROM node:24

RUN apt-get update && apt-get install -y \
  zip \
  unzip \
  curl

RUN curl -fsSL https://bun.sh/install | bash

ENV PATH="/root/.bun/bin:$PATH"

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN bun install

# Copy the rest of the project files to the working directory
COPY . .

# Expose the port that the Next.js app will run on
EXPOSE 3000

# Start the Next.js app
CMD ["sh","init.sh"]