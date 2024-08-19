FROM nginx:1.23.2-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY ./dist/sakai-ng /usr/share/nginx/html
EXPOSE 4200