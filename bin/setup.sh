#! /usr/bin/env bash

apt-get update -y
apt-get upgrade -y
apt-get install -y python3 python3-pip

echo python3 --version

# python3 -m venv .venv
# source .venv/bin/activate

pip3 install -r requirements.txt

echo all good to go 😁
