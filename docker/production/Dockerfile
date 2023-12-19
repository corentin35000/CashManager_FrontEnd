# Stage 1: Node.js environment
FROM node:20.10.0 as node-builder

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

# Stage 2: Final stage combining Node.js, Java and Rust environments
FROM ubuntu:22.04 as runtime

# Installer les prérequis for Node.js
RUN apt-get update && \
    apt-get install -y ca-certificates curl gnupg && \
    mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

# Choisir la version de Node.js (ex. 16, 18, 20, etc.)
ARG NODE_MAJOR=20

# Créer le dépôt deb pour Node.js
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" > /etc/apt/sources.list.d/nodesource.list

# Mettre à jour et installer Node.js
RUN apt-get update && \
    apt-get install nodejs git -y

# Install dependencies for Tauri
RUN apt install -y \
    libwebkit2gtk-4.1-dev \
    build-essential \
    wget \
    file \
    libssl-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev \
    unzip

WORKDIR /app

# Copy necessary files from node-builder
COPY --from=node-builder /app /app

# Download and Install JDK Java
RUN apt-get update && apt-get install -y openjdk-17-jdk
RUN wget -q https://dl.google.com/android/repository/commandlinetools-linux-6609375_latest.zip -O cmdtools.zip && \
    mkdir -p /usr/local/android-sdk/cmdline-tools && \
    unzip cmdtools.zip -d /usr/local/android-sdk/cmdline-tools && \
    rm cmdtools.zip

ENV JAVA_HOME="/usr/lib/jvm/java-17-openjdk-amd64"
ENV ANDROID_HOME="/usr/local/android-sdk"
ENV PATH="$JAVA_HOME/bin:$ANDROID_HOME/cmdline-tools/tools/bin:$PATH"
ENV NDK_HOME="$ANDROID_HOME/ndk/26.1.10909125"
ENV KEYSTORE_PASSWORD=Marylene59!
ENV ALIAS_NAME=keystore_alias_name
ENV KEY_PASSWORD=Marylene59!

# Accept licenses
RUN yes | sdkmanager --licenses
# Download dependencies for Android Studio
RUN sdkmanager \
    "platform-tools" \
    "platforms;android-34" \
    "build-tools;34.0.0" \
    "ndk;26.1.10909125" \
    "cmake;3.10.2.4988404"

# Install Rust and add targets for Android
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

# Copier le répertoire .cargo dans un emplacement accessible par monutilisateur
RUN cp -R /root/.cargo /home/monutilisateur/.cargo && \
    chmod -R 755 /home/monutilisateur/.cargo

# Créer un nouvel utilisateur pour le processus de build
RUN useradd -m monutilisateur

# Changer la propriété de tous les fichiers et dossiers dans le répertoire courant et le répertoire .cargo pour le nouvel utilisateur
RUN chown -R monutilisateur:monutilisateur /app /home/monutilisateur/.cargo

# Passer à l'utilisateur non-root
USER monutilisateur

# Mettre à jour le PATH pour inclure le binaire cargo pour l'utilisateur non-root
ENV PATH="/home/monutilisateur/.cargo/bin:$PATH"

# Continuer avec les commandes de build
RUN chmod +x src-tauri/build.sh && \
    npm run rust:install:target:android && \
    npm run build:tauri:android