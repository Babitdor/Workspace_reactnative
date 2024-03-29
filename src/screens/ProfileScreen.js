import React, {useState, useEffect} from 'react';
import {firebase} from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import StaticGoogleProfile from '../components/profile/StaticGoogleProfile';
import Profile from '../components/profile/LoginProfile';
import {useContext} from 'react';
import {AuthContext} from '../navigation/AuthProvider';
export default function ProfileScreen() {
  const navigation = useNavigation();
  const [UserData, setUserData] = useState([]);
  const {user, Refresh, isDarkMode} = useContext(AuthContext);

  useEffect(() => {
    async function FetchData() {
      const snapshot = await firebase
        .firestore()
        .collection('Users')
        .doc(user.uid)
        .onSnapshot(documentSnapshot => {
          setUserData(documentSnapshot.data());
        });
      return () => snapshot();
    }
    FetchData();
  }, [Refresh]);

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {});
    return focusHandler;
  }, [navigation]);
  {
    return (
      <SafeAreaView
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: isDarkMode ? 'black' : 'white',
        }}>
        {UserData ? <Profile UserData={UserData} /> : <StaticGoogleProfile />}
      </SafeAreaView>
    );
  }
}
