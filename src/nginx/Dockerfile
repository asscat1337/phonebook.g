FROM nginx:1.25.1-alpine


COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 8000

CMD ["nginx","-g","daemon off"]