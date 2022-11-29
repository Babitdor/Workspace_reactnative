import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  BackHandler,
} from 'react-native';
import {responsiveScreenFontSize} from 'react-native-responsive-dimensions';
import React, {useState, useContext, useEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import moment from 'moment';
import User from 'react-native-vector-icons/AntDesign';
import Phone from 'react-native-vector-icons/AntDesign';
import Gender from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Cake from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../../navigation/AuthProvider';
import {TextInput} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {RadioButton} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';

export default function Edit_Page() {
  const [isDisplayDate, setDateShow] = useState(false);
  const navigation = useNavigation();
  const [displaymode, setMode] = useState('time');
  const {user, updateIncompleteData, setRefresh, Refresh} =
    useContext(AuthContext);
  const defaultImage = {uri: user.photoURL};
  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {});
    return focusHandler;
  }, [navigation]);
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );
  console.log(defaultImage);
  const [data, setData] = useState({
    name: user.displayName,
    phoneNo: '',
    date_of_birth: '',
    gender: '',
    avatar: defaultImage,
  });

  console.log(data.avatar);
  const changeSelectedDate = (_event, selectedDate) => {
    currentDate = moment(selectedDate).format('DD-MM-YYYY');
    setDateShow(false);
    setData({
      ...data,
      date_of_birth: currentDate,
    });
  };
  const showDateMode = currentMode => {
    setDateShow(true);
    setMode(currentMode);
  };
  const displayDatepicker = () => {
    showDateMode('date');
  };
  const phonenoChange = val => {
    if (val.length != 0) {
      setData({
        ...data,
        phoneNo: val,
      });
    } else {
      setData({
        ...data,
        phoneNo: val,
      });
    }
  };
  const nameinput = val => {
    setData({
      ...data,
      name: val,
    });
  };
  const selectImage = async () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.assets[0].uri};
        console.log(source);
        setData({
          ...data,
          avatar: source,
        });
      }
    });
  };

  const Update = (User, Name, DOB, Phone, Gender, ProfileIMG) => {
    updateIncompleteData(User, Name, DOB, Phone, Gender, ProfileIMG);
    setRefresh(Refresh => !Refresh);
    navigation.navigate('ProfileScreen');
  };
  return (
    <View style={styles.container}>
      <View style={[styles.header, {alignItems: 'center'}]}>
        <TouchableOpacity onPress={() => selectImage()}>
          <View style={{alignSelf: 'center'}}>
            {data.avatar ? (
              <Image
                source={data.avatar}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 100,
                  // backgroundColor: 'rgba(137, 252, 233, 1)',
                }}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={require('../../assets/register.png')}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 100,
                  backgroundColor: 'rgba(137, 252, 233, 1)',
                }}
                resizeMode="contain"
              />
            )}
          </View>
        </TouchableOpacity>
      </View>

      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        {/* Name Section */}
        <Text style={styles.text_footer}>Name</Text>
        <View style={styles.action}>
          <User name="user" size={30} color="white" />
          <TextInput
            style={styles.TextInput}
            autoCapitalize="none"
            value={data.name}
            onChangeText={val => nameinput(val)}
          />
        </View>

        {/* Date of Birth Section */}
        <Text style={[styles.text_footer, {marginTop: 6}]}>Date of Birth</Text>
        <View style={styles.action}>
          <Cake name="cake-variant-outline" size={30} color="white" />
          <TouchableOpacity
            onPress={displayDatepicker}
            title="Select your Time"
            style={[styles.TextInput]}>
            <Text
              style={[
                styles.text_footer,
                {
                  paddingVertical: 10,
                  fontSize: 16,
                  color: 'rgba(137, 252, 233, 1)',
                },
              ]}>
              {data.date_of_birth}
            </Text>
          </TouchableOpacity>
          {isDisplayDate && (
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date()}
              // maximumDate={new Date(2022, 12, 31)}
              mode={'date'}
              is24Hour={true}
              display="spinner"
              onChange={changeSelectedDate}
            />
          )}
        </View>

        {/* Phone No Section */}
        <Text style={[styles.text_footer, {marginTop: 6}]}>Phone No.</Text>
        <View style={styles.action}>
          <Phone name="phone" size={30} color="white" />
          <TextInput
            maxLength={10}
            keyboardType="numeric"
            style={styles.TextInput}
            onChangeText={val => phonenoChange(val)}
          />
        </View>

        {/* Gender */}
        <Text style={[styles.text_footer, {marginTop: 6}]}>Gender</Text>
        <View
          style={[
            styles.action,
            {flexDirection: 'row', justifyContent: 'space-evenly'},
          ]}>
          <Gender
            name={data.gender === 'Male' ? 'male' : 'female'}
            size={30}
            color="white"
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <Text style={styles.text_footer}>Male</Text>
            </View>
            <View>
              <RadioButton
                color="rgba(137, 252, 233, 1)"
                value="Male"
                status={data.gender === 'Male' ? 'checked' : 'unchecked'}
                onPress={() => setData({...data, gender: 'Male'})}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <Text style={styles.text_footer}>Female</Text>
            </View>
            <View>
              <RadioButton
                color="rgba(137, 252, 233, 1)"
                value="Female"
                status={data.gender === 'Female' ? 'checked' : 'unchecked'}
                onPress={() => setData({...data, gender: 'Female'})}
              />
            </View>
          </View>
        </View>

        {/* Email Section */}
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() =>
              Update(
                user,
                data.name,
                data.date_of_birth,
                data.phoneNo,
                data.gender,
                data.avatar,
              )
            }
            style={[
              styles.signIn,
              {
                marginTop: 10,
                backgroundColor: 'white',
              },
            ]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={[styles.textSign, {color: 'black'}]}>
                  Update Profile
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  footer: {
    flex: 3,
    paddingVertical: 35,
    paddingHorizontal: 30,
  },
  text_header: {
    color: 'white',
    colorWeight: 'bold',
    alignSelf: 'center',
    fontSize: 30,
  },
  text_footer: {
    color: 'white',
    fontSize: 15,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(137, 252, 233, 1)',
    paddingBottom: 5,
  },
  TextInput: {
    flex: 1,
    marginTop: -12,
    fontSize: 16,
    paddingLeft: 10,
    color: 'rgba(137, 252, 233, 1)',
  },
  button: {
    alignItems: 'center',
    marginTop: 20,
    padding: 5,
  },
  signIn: {
    width: '100%',
    height: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});
