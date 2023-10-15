# First man on the moon

https://github.com/MarcusSakae/first-man-on-the-moon

A small little idle game where you compete about who can get to the moon first.
Then a new game session starts and you can try again. Good luck!

Good luck!

## Installation

Node.js and npm is required, and a mobile device or emulator with Expo installed.

```
npm install
```

## Run (in emulator or connected device)

```
npx expo start
```

## server

Can be started from the /server folder
Requires rust and cargo.

```
cargo run
```

The API_URL needs to be updated inside /.env

```
API_URL=http://123.123.123.123:8000
```

Note that this will never be localhost, as the server is not running on the mobile device.

## Slides

[slides](https://docs.google.com/presentation/d/1Z3guVkzaWdLW5O781pxTtSqNE0-tGwqQRF7QLoWiIfQ/edit#slide=id.gc6f980f91_0_0)
Also as pdf "First man on the moon.pdf" in the root folder

## 4 used expo components:

- @react-native-picker/picker
  [link](https://github.com/MarcusSakae/first-man-on-the-moon/blob/8d9fd4d608df5b82cddc869ebf5e413a8c4383ca/components/RocketComposer.tsx#L83-L102)
- react-native-reanimated
  [link](https://github.com/MarcusSakae/first-man-on-the-moon/blob/main/components/LoadingIcon.tsx)
- expo-gl
  [link](<https://github.com/MarcusSakae/first-man-on-the-moon/blob/8d9fd4d608df5b82cddc869ebf5e413a8c4383ca/app/(tabs)/home.tsx#L119>)
- react-async-storage
  [link](https://github.com/MarcusSakae/first-man-on-the-moon/blob/8d9fd4d608df5b82cddc869ebf5e413a8c4383ca/state/userSlice.ts#L10-L14)

## 4 used react-native components:

(I feel I might have misunderstood this? ...maybe react-native components made by me?)

- ImageBackground
  [link](https://github.com/MarcusSakae/first-man-on-the-moon/blob/8d9fd4d608df5b82cddc869ebf5e413a8c4383ca/components/RocketComposer.tsx#L54C4-L115)
- Pressable
  [link](https://github.com/MarcusSakae/first-man-on-the-moon/blob/8d9fd4d608df5b82cddc869ebf5e413a8c4383ca/components/DrawerButton.tsx#L29-L39)
- Image
  [link](https://github.com/MarcusSakae/first-man-on-the-moon/blob/8d9fd4d608df5b82cddc869ebf5e413a8c4383ca/components/DrawerButton.tsx#L29-L39)
- Text
  [link](https://github.com/MarcusSakae/first-man-on-the-moon/blob/8d9fd4d608df5b82cddc869ebf5e413a8c4383ca/components/DrawerButton.tsx#L29-L39)

## Ytterligare en valfri extern modul:

- react-redux (@reduxjs/toolkit, etx)
  [link](https://github.com/MarcusSakae/first-man-on-the-moon/blob/ff46bd4c4930af44e91b34d486259f3c0ba17fc2/state/store.ts)

## Lista över genomförda krav:

### Krav för godkänt:

- [x] 1. Projektet använder minst 4 stycken RN-komponenter och minst 4 stycken Expo
     komponenter.
- [x] 2. De utvalda komponenterna MÅSTE antecknas i README filen tillsammans med en
     lista över genomförda krav.
- [x] 3. React Navigation används för att skapa en bättre upplevelse i appen.
- [x] 4. Git & GitHub har använts
- [x] 5. Projektmappen innehåller en README.md fil - (läs ovan för mer info)
- [x] 6. Uppgiften lämnas in i tid!
- [x] 7. Muntlig presentation är genomförd

### Krav för väl godkänt:

- [x] 1. Alla punkter för godkänt är uppfyllda
- [x] 2. Ytterligare en valfri extern modul används i projektet.
- [x] 3. Appen ska prata med ett Web-API för att hämta data.
- [soon] 4. Appen ska laseras på en Appstore (Deadline samma dag som kursen slutar)

## Todos

- list astronaut slots and astronauts
- post building changes to api so it persists

- add images for lvl2,3,4 houses

↓↓ move down when done ↓↓

# Done

- upgrade buildings
- unlock tab with badge and toast