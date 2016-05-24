#!/bin/bash

# Remove old Nodejs versions
sudo apt-get remove nodejs -y

# Install new NodeJS 6.x version
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
apt-get install -y nodejs

# Install MongoDB
apt-get update

# Install the latest MongoDB
# https://docs.mongodb.com/v3.0/tutorial/install-mongodb-on-debian/
apt-get install -y mongodb

npm install -g bower
npm install -g grunt-cli
npm install -g gulp

# Install sass gem
apt-get install -y ruby
gem install sass
