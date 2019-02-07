#!/bin/bash

pm2 start ecosystem.json

pm2 monit
