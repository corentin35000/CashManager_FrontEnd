#!/bin/bash

# Killing any existing ADB server instances
adb kill-server

# Starting ADB server without daemon
# Appeler le script .ps1 pour faire en mode détaché du terminal

# Optional: Check if devices are connected
adb devices

# Starting Docker Compose
docker-compose up