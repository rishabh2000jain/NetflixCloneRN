import { Platform } from "react-native";

export const credentials =
  Platform.OS == 'android'
    ? {
        clientId: '',
        appId: '1:361672344306:android:c4695642dab64e5705866b',
        apiKey: 'AIzaSyAnDj8UpChcBdDZ0hVsFSlXr1zh828dgDs',
        databaseURL: '',
        storageBucket: 'rninstaclone-3b49b.appspot.com',
        messagingSenderId: '',
        projectId: 'rninstaclone-3b49b',
      }
    : {
        clientId: '',
        appId: '1:361672344306:ios:a84c295e7fb3819805866b',
        apiKey: 'AIzaSyAAsh5f6gRh_qlCpsOBJqxbveut02JSe_g',
        databaseURL: '',
        storageBucket: 'rninstaclone-3b49b.appspot.com',
        messagingSenderId: '',
        projectId: 'rninstaclone-3b49b',
      };