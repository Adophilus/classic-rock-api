#! /usr/bin/env bash

git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.7.4
echo '. $HOME/.asdf/asdf.sh' >> ~/.bashrc
echo '. $HOME/.asdf/completions/asdf.bash' >> ~/.bashrc
source ~/.bashrc

# fix for render's python version
asdf plugin-add python
asdf install python 3.11.1
asdf global python 3.11.1

python3 -m venv .venv
source .venv/bin/activate

pip3 install -r requirements.txt

echo all good to go 😁
