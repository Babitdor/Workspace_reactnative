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
  const [Triggered, setTriggered] = useState(true);
  const [user, setUser] = useState(null);
  const [Category, setCategory] = useState('Starters');
  const [SelectedSeats, setSeats] = useState([]);
  const [isChanged, setChanged] = useState(false);
  const [MinTime, setMin] = useState('');
  const [MaxTime, setMax] = useState('');
  const [SelectDate, setSelectDate] = useState('');
  const [TicketType, setTicketType] = useState('BookATable');
  const [Refresh,setRefresh] = useState(true);

  return (
    <AuthContext.Provider
      value={{
        Refresh,
        setRefresh,
        Triggered,
        setTriggered,
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
        register: async (email, password, phone, gender, DOB, name) => {
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
                });
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
        updateIncompleteData: async (user,Name,DateofBirth,PhoneNo,Gender) => {
          try{ 
            const db = firestore().collection('Users').doc(user.uid);
            db.set(
              {
                Name:Name,
                Date_of_Birth:DateofBirth,
                PhoneNo:PhoneNo,
                Gender:Gender,
                email:user.email,
                CreatedAt: firestore.FieldValue.serverTimestamp(),
                
              },{merge: true}
            )
          } catch(e){
            console.log(e);
          }
        }
      }}>
      {children}
    </AuthContext.Provider>
  );
};
