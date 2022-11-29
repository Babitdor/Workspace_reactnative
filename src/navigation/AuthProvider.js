import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Alert} from 'react-native';
export const AuthContext = createContext();
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export const AuthProvider = ({children}) => {
  const [Triggered, setTriggered] = useState(true);
  const [user, setUser] = useState(null);
  const [Category, setCategory] = useState('Starters');
  const [SelectedSeats, setSeats] = useState([]);
  const [isChanged, setChanged] = useState(false);
  const [MinTime, setMin] = useState('');
  const [MaxTime, setMax] = useState('');
  const [SelectDate, setSelectDate] = useState('');
  const [TicketType, setTicketType] = useState('BookATable');
  const [Refresh, setRefresh] = useState(true);

  return (
    <AuthContext.Provider
      value={{
        Refresh,
        setRefresh,
        MinTime,
        MaxTime,
        TicketType,
        Category,
        SelectDate,
        user,
        isChanged,
        SelectedSeats,
        setCategory,
        setSeats,
        setTicketType,
        setMax,
        setSelectDate,
        setChanged,
        setMin,
        setUser,
        login: async (email, password) => {
          try {
            await auth()
              .signInWithEmailAndPassword(email, password)
              .then(() => console.log('Logged In'))
              .catch(error => {
                console.log(error.message);
                switch (error.code) {
                  case 'auth/invalid-email':
                    Alert.alert('Invalid Email! Please Try Again');
                    break;

                  case 'auth/wrong-password':
                    Alert.alert('Wrong Password! Please Try Again');
                    break;

                  case 'auth/user-not-found':
                    Alert.alert('User not found! Please Try Again');
                    break;
                  case 'auth/weak-password':
                    Alert.alert(
                      'The given password is invalid. Password should be at least 6 characters',
                    );
                }
              });
          } catch (e) {
            Alert.alert(e);
          }
        },
        googleLogin: async () => {
          try {
            const {idToken} = await GoogleSignin.signIn();
            const googleCredential =
              auth.GoogleAuthProvider.credential(idToken);
            await auth()
              .signInWithCredential(googleCredential)
              .then(() => console.log('Data Uploaded'))
              .catch(error => Alert.alert(error.message));
          } catch (e) {
            Alert.alert(e);
          }
        },
        register: async (
          email,
          password,
          phone,
          gender,
          DOB,
          name,
          profile,
        ) => {
          try {
            await auth()
              .createUserWithEmailAndPassword(email, password)
              .then(res => {
                const db = firestore().collection(`Users`).doc(res.user.uid);
                db.set(
                  {
                    Name: name,
                    email: email,
                    Date_of_Birth: DOB,
                    Gender: gender,
                    PhoneNo: phone,
                    createdAt: firestore.FieldValue.serverTimestamp(),
                  },
                  {merge: true},
                ).then(() => {
                  console.log('Data Uploaded');
                  const {uri} = profile;
                  const uploadUri =
                    Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
                  console.log(uploadUri);
                  const task = storage()
                    .ref('Profile/' + res.user.uid)
                    .putFile(uploadUri)
                    .then(snapshot => console.log('uploaded'));
                });
              })
              .catch(error => {
                console.log(error.message);
                switch (error.code) {
                  case 'auth/invalid-email':
                    Alert.alert('Invalid Email! Please Try Again');
                    break;
                  case 'auth/wrong-password':
                    Alert.alert('Wrong Password! Please Try Again');
                    break;
                  case 'auth/user-not-found':
                    Alert.alert('User not found! Please Try Again');
                    break;
                  case 'auth/email-already-in-use':
                    Alert.alert(
                      'The email address is already in use by another account',
                    );
                    break;
                  case 'auth/weak-password':
                    Alert.alert(
                      'The given password is invalid. Password should be at least 6 characters',
                    );
                    break;
                }
              });
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
            await GoogleSignin.revokeAccess();
            setUser(null);
          } catch (e) {
            console.log(e);
          }
        },
        updateIncompleteData: async (
          user,
          Name,
          DateofBirth,
          PhoneNo,
          Gender,
          ProfileImage,
          ID_NAME,
          ID_IMAGE,
        ) => {
          try {
            const db = firestore().collection('Users').doc(user.uid);
            db.set(
              {
                Name: Name,
                Date_of_Birth: DateofBirth,
                PhoneNo: PhoneNo,
                Gender: Gender,
                email: user.email,
                CreatedAt: firestore.FieldValue.serverTimestamp(),
                Identification: ID_NAME,
              },
              {merge: true},
            ).then(() => {
              async function ImageData() {
                try {
                  let {uri} = ProfileImage;
                  let uploadUri =
                    Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
                  const task = await storage()
                    .ref('Profile/' + user.uid)
                    .putFile(uploadUri)
                    .then(() => console.log('Information Updated'))
                    .catch(error => console.log('storage/unknown'));

                  uri = ID_IMAGE.uri;
                  console.log(uri);
                  uploadUri =
                    Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
                  Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
                  const task1 = await storage()
                    .ref('Profile/Identification/' + user.uid)
                    .putFile(uploadUri)
                    .then(() => console.log('ID is Updated'))
                    .catch(error => console.log('storage/unknown'));
                } catch (err) {
                  console.log(err);
                }
              }
              ImageData();
              // console.log('Data Uploaded');
              // const {uri} = ProfileImage;
              // const uploadUri =
              //   Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
              // const task = storage()
              //   .ref('Profile/' + user.uid)
              //   .putFile(uploadUri)
              //   .then(() => console.log('Information Updated'));
            });
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
