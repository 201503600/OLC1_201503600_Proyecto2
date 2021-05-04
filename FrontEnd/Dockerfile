FROM golang:1.14
ENV TZ=America/Guatemala
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt-get update
RUN apt-get install wget -y
RUN apt-get install graphviz -y
RUN apt-get install nano -y
WORKDIR /App
COPY wait.sh .
EXPOSE 8000