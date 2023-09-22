FROM reactnativecommunity/react-native-android
ARG EAS_USER
ARG EAS_PASS

RUN npm install eas-cli envinfo detox-cli --global && envinfo
RUN echo fs.inotify.max_user_watches=524288 | tee -a /etc/sysctl.conf && sysctl -p
RUN mkdir -p /root/.android && touch /root/.android/repositories.cfg
RUN echo yes | $ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager --channel=0 --verbose "system-images;android-31;google_apis;arm64-v8a"
RUN echo no | $ANDROID_HOME/cmdline-tools/latest/bin/avdmanager --verbose create avd --force --name "pixel_3" --device "pixel_3" --package "system-images;android-31;google_apis;arm64-v8a"
RUN apt-get update && apt-get install -y socat
RUN (sleep 1; echo "$EAS_USER"; sleep 1; echo "$EAS_PASS"; sleep 1) | socat - EXEC:'eas login',pty,setsid,ctty
RUN adb start-server


## variables are visibile in the layer. do not push this image to the hub