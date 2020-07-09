FROM nginx:1.19.0-alpine
ARG host
RUN mkdir /service-logs
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./Schema /usr/share/nginx/html/Schema
RUN if [ ! -z "$host" ] ; then cd /usr/share/nginx/html/Schema && (grep -rli 'mc-models' * | xargs -i@ sed -i "s/mc-models/$host/gI" @); fi