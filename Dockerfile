FROM node:20-alpine AS base 

WORKDIR /app

COPY package*.json ./

RUN npm ci

FROM base AS development 
COPY . .

EXPOSE 4201

CMD ["npm","start"]

FROM base AS builder

COPY . .
COPY .htaccess ./

RUN npm run build:prod

FROM httpd:alpine AS production

WORKDIR /usr/local/apache2/htdocs/mymonitor

RUN sed -i 's/#LoadModule rewrite_module/LoadModule rewrite_module/' /usr/local/apache2/conf/httpd.conf && \
    sed -i 's/AllowOverride None/AllowOverride All/' /usr/local/apache2/conf/httpd.conf

COPY --from=builder /app/dist/my-monitor  /usr/local/apache2/htdocs/mymonitor
COPY --from=builder /app/.htaccess /usr/local/apache2/htdocs/mymonitor

EXPOSE 80