#! /usr/bin/env bash

sudo apt-get update -y
sudo apt-get upgrade -y
sudo apt-get install -y python3 python3-pip

# python3 -m venv .venv
# source .venv/bin/activate

pip3 install -r requirements.txt

echo all good to go 😁
