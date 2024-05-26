import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import validator from 'validator';
import Toast from 'react-native-simple-toast';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../routes/RouteParamList';
import { useAppDispatch, useAppSelector } from '../../app/Hooks';
import { checkAuthStatus } from '../../app/AppReducer';

type Props = NativeStackScreenProps<AppStackParamList, 'Login'>;

export default function LoginScreen({navigation}: Props) {
  const [email, updateEmail] = useState<string>('');
  const [password, updatePassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const appDispatchure = useAppDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../images/Logonetflix.png')}
          style={styles.headerImage}
        />
      </View>
      <View style={[styles.inputTextContainer, {marginTop: 86}]}>
        <Text style={styles.inputTextTitle}>Email</Text>
        <TextInput
          enterKeyHint="done"
          keyboardType="email-address"
          cursorColor={'white'}
          style={styles.inputText}
          onChangeText={text => {
            updateEmail(text);
          }}
        />
      </View>
      <View style={[styles.inputTextContainer, {marginTop: 14}]}>
        <Text style={styles.inputTextTitle}>Password</Text>
        <TextInput
          enterKeyHint="done"
          keyboardType="default"
          cursorColor={'white'}
          style={styles.inputText}
          onChangeText={text => {
            updatePassword(text);
          }}
        />
      </View>
      <TouchableOpacity
        style={styles.signinButton}
        onPress={async () => {
          Keyboard.dismiss();
          if (!validator.isEmail(email)) {
            Toast.show('Please enter a valid email', Toast.SHORT, {
              backgroundColor: 'white',
              textColor: 'black',
            });
            return;
          }
          if (!validator.isStrongPassword(password, {minLength: 8})) {
            Toast.show('Please enter a strong password', Toast.SHORT);
            return;
          }
          setLoading(true);
          try {
            const users = await firestore()
              .collection('Users')
              .where('email', '==', email.toLocaleLowerCase())
              .get();
            let creds: FirebaseAuthTypes.UserCredential;
            if (users.empty) {
              creds = await auth().createUserWithEmailAndPassword(
                email,
                password,
              );
              await firestore().collection('Users').doc(creds.user.uid).set({
                email: email.toLocaleLowerCase(),
              });
            } else {
              creds = await auth().signInWithEmailAndPassword(email, password);
            }
            if (creds.user) {
              appDispatchure(checkAuthStatus());
              navigation.push('Search');
            }
          } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(error);

            switch (errorCode) {
              case 'auth/invalid-credential':
                Alert.alert('Invalid email or password.');
                break;
              case 'auth/user-not-found':
                Alert.alert('User not found.');
                break;
              case 'auth/invalid-email':
                Alert.alert('Invalid email format.');
                break;
              case 'auth/wrong-password':
                Alert.alert('Invalid password.');
                break;
              case 'auth/weak-password':
                Alert.alert('Password is too weak.');
                break;
              default:
                Alert.alert('Unexpected error during sign in.');
            }
          } finally {
            setLoading(false);
          }
        }}>
        <Text style={styles.signinButtonText}>Sign In</Text>
      </TouchableOpacity>
      {loading && (
        <ActivityIndicator style={styles.loader} color={'red'} size={30} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 12,
  },
  headerImage: {
    height: 31,
    width: 124,
    resizeMode: 'contain',
  },
  inputTextContainer: {
    height: 70,
    width: '100%',
    backgroundColor: '#656060',
    paddingHorizontal: 17,
    paddingVertical: 8,
    borderRadius: 11,
    justifyContent: 'space-between',
  },
  inputTextTitle: {
    color: '#FDF7F7',
    fontWeight: '700',
    fontSize: 15,
  },
  signinButton: {
    height: 46,
    width: '100%',
    backgroundColor: 'black',
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 1,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signinButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  inputText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  loader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});
