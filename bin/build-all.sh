#! /usr/bin/env bash


sudo apt-get install -y python3 python3-pip

pip3 install -r requirements.txt

python3 -m scripts.serializer

pnpm build
