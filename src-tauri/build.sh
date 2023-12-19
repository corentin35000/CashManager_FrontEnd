#!/bin/bash

# Get current branch
branch=$(git rev-parse --abbrev-ref HEAD) # machine local
branch2="${GITHUB_REF//refs\/heads\//}" # ci github actions

chmod -R 777 /app/src-tauri/gen/android/app/src/main/jniLibs

if [[ $branch == "main" || $branch2 == "main" ]]; then
    echo "build launcher to branch : $branch"
    npm run build:vite:develop
else
    echo "build launcher to branch : $branch"
    npm run build:vite:develop
fi

chmod -R 777 /app/src-tauri/gen/android/app/src/main/jniLibs