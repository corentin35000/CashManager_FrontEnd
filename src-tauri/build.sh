#!/bin/bash

if [ -d "/app/src-tauri/gen/android/app/src/main/jniLibs" ]; then
  echo "SET CHMOD 777 !!!!!!!!!!!!!"
  chmod -R 777 /app/src-tauri/gen/android/app/src/main/jniLibs
fi

npm run build:vite:develop

if [ -d "/app/src-tauri/gen/android/app/src/main/jniLibs" ]; then
  echo "SET CHMOD 777 !!!!!!!!!!!!!"
  chmod -R 777 /app/src-tauri/gen/android/app/src/main/jniLibs
fi
