#!/bin/bash

# stop all server
sudo pm2 stop all
sudo pm2 delete all

## change the ip
sudo sed -i "s/<public-ip>/$(curl -s http://checkip.amazonaws.com)/g" /home/ubuntu/se-project/library/src/axios/axios.js

sudo sed -i "s/<public-ip>/$(curl -s http://checkip.amazonaws.com)/g" /home/ubuntu/se-project/user/src/axios/axios.js

# run backend
cd /home/ubuntu/se-project/backend/ && sudo npm run deploy
# run library
cd /home/ubuntu/se-project/library/ && sudo npm run deploy
# run user
cd /home/ubuntu/se-project/user/ && sudo npm run deploy