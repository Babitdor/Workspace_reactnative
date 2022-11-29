import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import React, {useState, useContext, useEffect} from 'react';
import * as Animatable from 'react-native-animatable';
import moment from 'moment';
import User from 'react-native-vector-icons/AntDesign';
import Phone from 'react-native-vector-icons/AntDesign';
import Lock from 'react-native-vector-icons/AntDesign';
import Check from 'react-native-vector-icons/AntDesign';
import Gender from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Eye from 'react-native-vector-icons/Entypo';
import Cake from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../../navigation/AuthProvider';
import {TextInput} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {RadioButton} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import {ScrollView} from 'react-native';

export default function SignIn1() {
  const [isDisplayDate, setDateShow] = useState(false);
  const navigation = useNavigation();
  const [displaymode, setMode] = useState('time');
  const {register} = useContext(AuthContext);
  const [data, setData] = useState({
    name: '',
    email: '',
    phoneNo: '',
    date_of_birth: '',
    password: '',
    avatar: null,
    gender: 'Male',
    confirm_password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
    filename: '',
    uri: '',
  });

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
  const emailInputChange = val => {
    if (val.length != 0) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
      });
    }
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
  const handleConfirmPasswordChange = val => {
    setData({
      ...data,
      confirm_password: val,
    });
  };
  const handlePasswordChange = val => {
    setData({
      ...data,
      password: val,
    });
  };
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
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

  return (
    <View style={styles.container}>
      <View style={[styles.header, {alignItems: 'center'}]}>
        <TouchableOpacity onPress={() => selectImage()}>
          <Animatable.View
            style={{position: 'absolute', alignSelf: 'center'}}
            animation="fadeInUp">
            {data.avatar ? (
              <Image
                source={data.avatar}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 100,
                  // backgroundColor: 'rgba(137, 252, 233, 1)',
                }}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={require('../../assets/register.png')}
                style={{
                  width: 80,
                  height: 80,
                  borderColor: 'rgba(137, 252, 233, 1)',
                  tintColor: 'white',
                  // backgroundColor: 'rgba(137, 252, 233, 1)',
                }}
                resizeMode="contain"
              />
            )}
          </Animatable.View>
        </TouchableOpacity>
      </View>
      {/* <Text style={styles.text_header}></Text> */}

      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <ScrollView>
          {/* Name Section */}
          <Text style={styles.text_footer}>Name</Text>
          <View style={styles.action}>
            <User name="user" size={30} color="white" />
            <TextInput
              style={styles.TextInput}
              autoCapitalize="none"
              onChangeText={val => nameinput(val)}
            />
          </View>

          {/* Date of Birth Section */}
          <Text style={[styles.text_footer, {marginTop: 6}]}>
            Date of Birth
          </Text>
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
                    fontSize: responsiveScreenFontSize(2.5),
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
              {flexDirection: 'row', justifyContent: 'space-between'},
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
          <Text style={[styles.text_footer, {marginTop: 10}]}>Email</Text>
          <View style={styles.action}>
            <User name="mail" size={30} color="white" />
            <TextInput
              style={styles.TextInput}
              autoCapitalize="none"
              onChangeText={val => emailInputChange(val)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Check name="checkcircleo" size={25} />
              </Animatable.View>
            ) : null}
          </View>

          {/* Password Section */}
          <Text style={[styles.text_footer, {marginTop: 10}]}>Password</Text>
          <View style={styles.action}>
            <Lock name="lock" size={30} color="white" />
            <TextInput
              style={styles.TextInput}
              autoCapitalize="none"
              secureTextEntry={data.secureTextEntry ? true : false}
              onChangeText={val => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Eye name="eye-with-line" size={25} color="white" />
              ) : (
                <Eye name="eye" size={25} color="white" />
              )}
            </TouchableOpacity>
          </View>

          {/* Confirm Password Section */}
          <Text style={[styles.text_footer, {marginTop: 10}]}>
            Confirm Password
          </Text>
          <View style={styles.action}>
            <Lock name="lock" size={30} color="white" />
            <TextInput
              style={styles.TextInput}
              autoCapitalize="none"
              secureTextEntry={data.confirm_secureTextEntry ? true : false}
              onChangeText={val => handleConfirmPasswordChange(val)}
            />
            <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              {data.confirm_secureTextEntry ? (
                <Eye name="eye-with-line" size={25} color="white" />
              ) : (
                <Eye name="eye" size={25} color="white" />
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.button}>
          <TouchableOpacity
            disabled={
              data.email && data.password && data.phoneNo && data.name
                ? false
                : true
            }
            style={[
              styles.signIn,
              {
                marginTop: 10,
                borderColor: 'black',
                borderWidth: 1,
                backgroundColor: 'rgba(137, 252, 233, 1)',
              },
            ]}
            onPress={() =>
              register(
                data.email,
                data.password,
                data.phoneNo,
                data.gender,
                data.date_of_birth,
                data.name,
                data.avatar,
              )
            }>
            <Text style={[styles.textSign, {color: 'black'}]}>Register Me</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{marginTop: 20}}
            onPress={() => navigation.goBack()}>
            <Text style={[styles.textSign, {fontSize: 16}]}>
              Account Created ? Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}

const {height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  footer: {
    flex: 5,
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  text_header: {
    color: 'white',
    colorWeight: 'bold',
    alignSelf: 'center',
    fontSize: 20,
  },
  text_footer: {
    color: 'white',
    fontSize: 16,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 0.2,
    borderBottomColor: 'rgba(137, 252, 233, 1)',
    paddingBottom: 5,
  },
  TextInput: {
    flex: 1,
    marginTop: -12,
    fontSize: responsiveScreenFontSize(2.5),
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
