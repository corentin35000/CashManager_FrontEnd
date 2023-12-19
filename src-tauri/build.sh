#!/bin/bash

# Vérifier si le répertoire jniLibs existe et changer les permissions avant de construire avec Vite
if [ -d "/app/src-tauri/gen/android/app/src/main/jniLibs" ]; then
  echo "Modification des permissions et de la propriété du répertoire jniLibs..."
  chown -R root:root /app/src-tauri/gen/android/app/src/main/jniLibs
  chmod -R 777 /app/src-tauri/gen/android/app/src/main/jniLibs
fi

# Exécuter la commande de build Vite
npm run build:vite:develop

# Répéter la modification des permissions et de la propriété après la construction avec Vite
if [ -d "/app/src-tauri/gen/android/app/src/main/jniLibs" ]; then
  echo "Modification des permissions et de la propriété du répertoire jniLibs à nouveau..."
  chown -R root:root /app/src-tauri/gen/android/app/src/main/jniLibs
  chmod -R 777 /app/src-tauri/gen/android/app/src/main/jniLibs
fi
