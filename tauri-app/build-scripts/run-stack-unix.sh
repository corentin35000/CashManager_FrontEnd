#!/bin/bash

# Killing any existing ADB server instances
adb kill-server

# Starting ADB server without daemon
adb -a nodaemon server start

# Optional: Check if devices are connected
adb devices

# Starting Docker Compose
docker-compose up