FROM node:lts

RUN apt-get update && apt-get install -y \
    locales git procps vim
RUN locale-gen ja_JP.UTF-8
RUN localedef -f UTF-8 -i ja_JP ja_JP
ENV LANG=ja_JP.UTF-8
ENV TZ=Asia/Tokyo
WORKDIR /app