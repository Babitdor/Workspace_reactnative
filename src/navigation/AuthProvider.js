import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Alert, useColorScheme} from 'react-native';
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
  const isDarkMode = useColorScheme() === 'dark';

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
        isDarkMode,
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
                    ID_PIC:
                      'https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns=',
                  },
                  {merge: true},
                ).then(async () => {
                  console.log('Data Uploaded');
                  console.log(profile);
                  const task = storage().ref('Profile/').child(res.user.uid);

                  await task
                    .putFile(profile)
                    .then(snapshot => console.log('Profile Uploaded'));

                  const URL = await task.getDownloadURL(URL).then(data => {
                    db.set(
                      {
                        Profile_PIC: data,
                      },
                      {merge: true},
                    );
                  });
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
            await auth()
              .signOut()
              .then(async () => {
                await GoogleSignin.revokeAccess();
                setUser(null);
              });
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
                if (!ProfileImage.includes('https://')) {
                  try {
                    const taskProfile = await storage()
                      .ref('Profile/')
                      .child(user.uid);

                    await taskProfile
                      .putFile(ProfileImage)
                      .then(() => console.log('Profile Image Uploaded'));

                    const Profile_URL = await taskProfile
                      .getDownloadURL(Profile_URL)
                      .then(data => {
                        db.set(
                          {
                            Profile_PIC: data,
                          },
                          {merge: true},
                        );
                      });
                  } catch (err) {
                    console.log(err);
                  }
                } else {
                  console.log('NO NEW IMAGE');
                }
              }

              async function IDData() {
                if (!ID_IMAGE.includes('https://')) {
                  try {
                    const taskID = await storage()
                      .ref('Profile/Identification/')
                      .child(user.uid);

                    await taskID
                      .putFile(ID_IMAGE)
                      .then(() => console.log('ID is Updated'));

                    const ID_URL = await taskID
                      .getDownloadURL(ID_URL)
                      .then(data => {
                        db.set(
                          {
                            ID_PIC: data,
                          },
                          {merge: true},
                        );
                      });
                  } catch (err) {
                    console.log(err);
                  }
                } else {
                  console.log('NO NEW ID IMAGE');
                }
              }
              ImageData();
              IDData();
            });
          } catch (e) {
            console.log(e);
          }
        },
        googleProfileData: async (
          user,
          Name,
          DateofBirth,
          PhoneNo,
          Gender,
          ProfileImage,
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
                Profile_PIC: user.photoURL,
                CreatedAt: firestore.FieldValue.serverTimestamp(),
                Identification: 'No Identification',
                ID_PIC:
                  'https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns=',
              },
              {merge: true},
            ).then(() => {
              async function ImageData() {
                try {
                  const taskProfile = await storage()
                    .ref('Profile/')
                    .child(user.uid);

                  await taskProfile
                    .putFile(ProfileImage)
                    .then(() => console.log('Profile Image Uploaded'));

                  const Profile_URL = await taskProfile
                    .getDownloadURL(Profile_URL)
                    .then(data => {
                      db.set(
                        {
                          Profile_PIC: data,
                        },
                        {merge: true},
                      );
                    });
                } catch (err) {
                  console.log(err);
                }
              }
              ImageData();
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
