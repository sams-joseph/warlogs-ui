# Stage 1 - the build process
FROM node:6-alpine as build-deps
WORKDIR /usr/src/
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

# Stage 2 - the production environment
FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/build /usr/share/nginx/html
COPY --from=build-deps /usr/src/nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]