#!/bin/bash

# stop all server
sudo pm2 stop all

# run backend
cd /home/ubuntu/se-project/backend/ && sudo npm run deploy
# run library
cd /home/ubuntu/se-project/library/ && sudo npm run deploy
# run user
cd /home/ubuntu/se-project/user/ && sudo npm run deploy