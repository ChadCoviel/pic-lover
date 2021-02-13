# Stage 0: compile angular frontend
FROM node:latest as build
WORKDIR /app
COPY angular/. . 
RUN npm install
RUN npm run build --prod

# Stage 1: serve app with nginx server
FROM nginx:latest
RUN rm -f /usr/share/nginx/html/index.html
COPY --from=build /app/dist/angular/. /usr/share/nginx/html
RUN ls -alF /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80