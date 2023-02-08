#! /usr/bin/env bash


sudo apt-get install -y python3 python3-pip

python3 -m venv .venv
source .venv/bin/activate

pip3 install -r requirements.txt

python3 -m scripts.serializer

pnpm build
