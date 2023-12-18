#!/bin/bash

# Get current branch
branch=$(git rev-parse --abbrev-ref HEAD) # machine local
branch2="${GITHUB_REF//refs\/heads\//}" # ci github actions

if [[ $branch == "main" || $branch2 == "main" ]]; then
    echo "build launcher to branch : $branch"
    npm run build:vite:develop
else
    echo "build launcher to branch : $branch"
    npm run build:vite:develop
fi