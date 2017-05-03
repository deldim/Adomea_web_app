#servernode
#sudo docker build servernode/ -t server/node -f servernode/Dockerfile
#FROM rgroszewski/nodejs-hello-world-express
#FROM node:onbuild
FROM mariadb:latest

ENV MYSQL_ROOT_PASSWORD 'uzengoMDP'

COPY . /home/


#RUN apt update && apt upgrade -y #To uncomment in the future

RUN cp -r /home/node-*/bin/* /usr/bin/
RUN cp -r /home/node-*/share/* /usr/share/
RUN cp -r /home/node-*/include/* /usr/include/
RUN cp -r /home/node-*/lib/* /usr/lib/

EXPOSE 3000 3000
EXPOSE 3306 3306

RUN cd /home/ && ls
RUN cd /home/ && npm install
#RUN echo "/home/bin/www& && exit 0;" > /etc/rc.local
