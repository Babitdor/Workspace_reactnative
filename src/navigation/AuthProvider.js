import React, {
  Children,
  createContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
export const AuthContext = createContext();


export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [Category, setCategory] = useState('Starters');
  const [SelectedSeats, setSeats] = useState([]);
  const [isChanged, setChanged] = useState(false);
  const [MinTime, setMin] = useState('');
  const [MaxTime, setMax] = useState('');
  const [SelectDate, setSelectDate] = useState('');
  const [TicketType, setTicketType] = useState('BookATable');
  const timer = 8600;
  const refTimer = useRef(60);
  
  return (
    <AuthContext.Provider
      value={{
        timer,
        refTimer,
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
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password) => {
          try {
            await auth()
              .createUserWithEmailAndPassword(email, password)
              .then(res => {
                console.log(res.user.uid);
              });
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
