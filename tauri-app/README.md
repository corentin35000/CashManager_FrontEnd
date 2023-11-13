# Cash Manager

Infos IMPORTANT : Les version du protocole ADB doit correspondre côté hote et dans le container ! Pas obligatoirement la version de ADB mais la version du protocole ADB.

## Setup Environment
1. Download and Install ADB : https://developer.android.com/studio/releases/platform-tools?hl=fr
2. Add ADB in PATH ENVIRONMENT

<br /><br /><br /><br />


## Cycle Development
1. Run commands :
```bash
adb kill-server
adb -a nodaemon server start
adb devices # optional: check if device connected to host

docker-compose up
```

<br /><br /><br /><br />


## Production