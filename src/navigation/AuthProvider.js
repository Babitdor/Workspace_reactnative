import React, {Children, createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
// import database from '@react-native-firebase/database'
import {useNavigation} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [SelectedSeats,setSeats] = useState([])
  const [isChanged,setChanged] = useState(false);
  const [MinTime, setMin] = useState('');
  const [MaxTime, setMax] = useState('');
  const [SelectDate, setSelectDate] = useState('');

  return (
    <AuthContext.Provider
      value={{
        MinTime, 
        MaxTime,
        SelectDate,
        user,
        isChanged,
        SelectedSeats,
        setSeats,
        setMax,
        setSelectDate,
        setChanged,
        setMin,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        googleLogin: async () => {
          try {
            const {idToken} = await GoogleSignin.signIn();
            const googleCredential =
              auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredential);
            // .then(User => {
            //     database()
            //     .ref('/Data/Users/')
            //     .set({
            //         uid: User.user.uid,
            //     })
            // .then(() => console.log('Data Set'));
            // })
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
            // .then(registeredUser => {
            //     database()
            //     .ref('/Data/Users/')
            //     .set({
            //         uid: registeredUser.user.id,
            //     })
            //     .then(() => console.log('Data set'))

            // })
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
            setUser(null);
            await GoogleSignin.revokeAccess();
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
