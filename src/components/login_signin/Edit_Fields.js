import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  BackHandler,
} from 'react-native';
import {Button} from 'react-native-paper';
import React, {useState, useContext, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import moment from 'moment';
import User from 'react-native-vector-icons/AntDesign';
import Phone from 'react-native-vector-icons/AntDesign';
import IDCARD from 'react-native-vector-icons/AntDesign';
import Gender from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Cake from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../../navigation/AuthProvider';
// import {TextInput} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {RadioButton} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import Edit from 'react-native-vector-icons/AntDesign';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ScrollView} from 'react-native';

export default function Edit_Field({route}) {
  const Data = route.params.Userdata;
  const DefaultImage = {uri: route.params.Image};
  const [isDisplayDate, setDateShow] = useState(false);
  const navigation = useNavigation();
  const [displaymode, setMode] = useState('time');
  const {user, updateIncompleteData, setRefresh, Refresh, isDarkMode} =
    useContext(AuthContext);

  const [EditHandler, setEditHandler] = useState({
    EditName: true,
    EditDOB: true,
    EditPhoneNo: true,
    EditGender: true,
    EditID: true,
  });

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
  const [data, setData] = useState({
    name: Data.Name,
    phoneNo: Data.PhoneNo,
    date_of_birth: Data.Date_of_Birth,
    gender: Data.Gender,
    avatar: Data.Profile_PIC,
    IdName: Data.Identification ? Data.Identification : 'No Identification',
    IDImage:
      'https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns=',
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
  const IDNameChange = val => {
    setData({
      ...data,
      IdName: val,
    });
  };
  const Update = async (
    User,
    Name,
    DOB,
    Phone,
    Gender,
    ProfileImage,
    ID,
    ID_IMAGE,
  ) => {
    updateIncompleteData(
      User,
      Name,
      DOB,
      Phone,
      Gender,
      ProfileImage,
      ID,
      ID_IMAGE,
    );
    setRefresh(Refresh => !Refresh);
    navigation.goBack();
  };
  const ChangeNameEditStatus = () => {
    setEditHandler({
      ...EditHandler,
      EditName: !EditHandler.EditName,
    });
  };
  const IDNameEditStatus = () => {
    setEditHandler({
      ...EditHandler,
      EditID: !EditHandler.EditID,
    });
  };
  const ChangeDOBEditStatus = () => {
    setEditHandler({
      ...EditHandler,
      EditDOB: !EditHandler.EditDOB,
    });
  };
  const ChangePhoneEditStatus = () => {
    setEditHandler({
      ...EditHandler,
      EditPhoneNo: !EditHandler.EditPhoneNo,
    });
  };
  const ChangeGenderEditStatus = () => {
    setEditHandler({
      ...EditHandler,
      EditGender: !EditHandler.EditGender,
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
        const source = response.assets[0].uri;
        setData({
          ...data,
          avatar: source,
        });
      }
    });
  };

  const selectImageID = async () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response.assets[0].uri;
        console.log(source);
        setData({
          ...data,
          IDImage: source,
        });
      }
    });
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? 'black' : 'white'},
      ]}>
      <View style={[styles.header, {alignItems: 'center'}]}>
        <TouchableOpacity onPress={() => selectImage()}>
          <View style={{alignSelf: 'center'}}>
            {data.avatar ? (
              <Image
                source={{uri: data.avatar}}
                resizeMode="cover"
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 100,
                  borderWidth: 2,
                  borderColor: isDarkMode
                    ? 'rgba(137, 252, 233, 1)'
                    : '#008B8B',
                }}
              />
            ) : (
              <Image
                source={require('../../assets/register.png')}
                style={{
                  width: 100,
                  height: 100,
                  tintColor: 'white',
                  borderRadius: 100,
                  borderWidth: 2,
                  borderColor: isDarkMode
                    ? 'rgba(137, 252, 233, 1)'
                    : '#008B8B',
                }}
                resizeMode="contain"
              />
            )}
          </View>
        </TouchableOpacity>
      </View>

      <Animatable.View
        style={styles.footer}
        animation="fadeInUpBig"
        useNativeDriver>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Name Section */}
          <Text
            style={[
              styles.text_footer,
              {color: isDarkMode ? 'white' : 'black'},
            ]}>
            Name
          </Text>
          <View style={styles.action}>
            <User
              name="user"
              size={30}
              color={
                isDarkMode
                  ? EditHandler.EditName
                    ? 'white'
                    : 'rgba(137, 252, 233, 1)'
                  : EditHandler.EditName
                  ? 'black'
                  : '#008B8B'
              }
            />
            <TextInput
              editable={EditHandler.EditName ? false : true}
              underlineColor={isDarkMode ? 'black' : 'white'}
              activeUnderlineColor="black"
              textColor={
                isDarkMode
                  ? EditHandler.EditName
                    ? 'white'
                    : 'rgba(137, 252, 233, 1)'
                  : EditHandler.EditName
                  ? 'black'
                  : '#008B8B'
              }
              style={[styles.TextInput, {borderColor: 'white'}]}
              onKeyPress={false}
              autoCapitalize="none"
              value={data.name}
              onChangeText={val => nameinput(val)}
            />
            <View style={{marginHorizontal: 10}}>
              <TouchableOpacity onPress={ChangeNameEditStatus}>
                <View style={{alignItems: 'flex-end', flexDirection: 'column'}}>
                  <Edit
                    name="edit"
                    size={25}
                    color={
                      isDarkMode
                        ? EditHandler.EditName
                          ? 'white'
                          : 'rgba(137, 252, 233, 1)'
                        : EditHandler.EditName
                        ? 'black'
                        : '#008B8B'
                    }
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Date of Birth Section */}
          <Text
            style={[
              styles.text_footer,
              {marginTop: 6, color: isDarkMode ? 'white' : 'black'},
            ]}>
            Date of Birth
          </Text>
          <View style={styles.action}>
            <Cake
              name="cake-variant-outline"
              size={30}
              color={
                isDarkMode
                  ? EditHandler.EditDOB
                    ? 'white'
                    : 'rgba(137, 252, 233, 1)'
                  : EditHandler.EditDOB
                  ? 'black'
                  : '#008B8B'
              }
            />
            <TouchableOpacity
              disabled={EditHandler.EditDOB ? true : false}
              onPress={displayDatepicker}
              title="Select your Time"
              style={[styles.TextInput]}>
              <Text
                style={[
                  styles.text_footer,
                  {
                    paddingVertical: 10,
                    fontSize: 16,
                    marginLeft: 15,
                    color: isDarkMode
                      ? EditHandler.EditDOB
                        ? 'white'
                        : 'rgba(137, 252, 233, 1)'
                      : EditHandler.EditDOB
                      ? 'black'
                      : '#008B8B',
                  },
                ]}>
                {data.date_of_birth}
              </Text>
            </TouchableOpacity>
            <View style={{marginHorizontal: 10}}>
              <TouchableOpacity onPress={ChangeDOBEditStatus}>
                <View style={{alignItems: 'flex-end', flexDirection: 'column'}}>
                  <Edit
                    name="edit"
                    size={25}
                    color={
                      isDarkMode
                        ? EditHandler.EditDOB
                          ? 'white'
                          : 'rgba(137, 252, 233, 1)'
                        : EditHandler.EditDOB
                        ? 'black'
                        : '#008B8B'
                    }
                  />
                </View>
              </TouchableOpacity>
            </View>
            {isDisplayDate && (
              <DateTimePicker
                testID="dateTimePicker"
                minimumDate={new Date(1960, 12, 31)}
                value={new Date(data.date_of_birth)}
                // maximumDate={new Date(2022, 12, 31)}
                mode={'date'}
                is24Hour={true}
                display="spinner"
                onChange={changeSelectedDate}
              />
            )}
          </View>

          {/* Phone No Section */}
          <Text
            style={[
              styles.text_footer,
              {marginTop: 6, color: isDarkMode ? 'white' : 'black'},
            ]}>
            Phone No.
          </Text>
          <View style={styles.action}>
            <Phone
              name="phone"
              size={30}
              color={
                isDarkMode
                  ? EditHandler.EditPhoneNo
                    ? 'white'
                    : 'rgba(137, 252, 233, 1)'
                  : EditHandler.EditPhoneNo
                  ? 'black'
                  : '#008B8B'
              }
            />
            <TextInput
              maxLength={10}
              underlineColor={isDarkMode ? 'black' : 'white'}
              activeUnderlineColor="black"
              textColor={
                isDarkMode
                  ? EditHandler.EditPhoneNo
                    ? 'white'
                    : 'rgba(137, 252, 233, 1)'
                  : EditHandler.EditPhoneNo
                  ? 'black'
                  : '#008B8B'
              }
              editable={EditHandler.EditPhoneNo ? false : true}
              value={data.phoneNo}
              keyboardType="numeric"
              style={styles.TextInput}
              onChangeText={val => phonenoChange(val)}
            />
            <View style={{marginHorizontal: 10}}>
              <TouchableOpacity onPress={ChangePhoneEditStatus}>
                <View style={{alignItems: 'flex-end', flexDirection: 'column'}}>
                  <Edit
                    name="edit"
                    size={25}
                    color={
                      isDarkMode
                        ? EditHandler.EditPhoneNo
                          ? 'white'
                          : 'rgba(137, 252, 233, 1)'
                        : EditHandler.EditPhoneNo
                        ? 'black'
                        : '#008B8B'
                    }
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Gender */}
          <Text
            style={[
              styles.text_footer,
              {marginTop: 6, color: isDarkMode ? 'white' : 'black'},
            ]}>
            Gender
          </Text>
          <View
            style={[
              styles.action,
              {flexDirection: 'row', justifyContent: 'space-between'},
            ]}>
            <Gender
              name={data.gender === 'Male' ? 'male' : 'female'}
              size={30}
              color={
                isDarkMode
                  ? EditHandler.EditGender
                    ? 'white'
                    : 'rgba(137, 252, 233, 1)'
                  : EditHandler.EditGender
                  ? 'black'
                  : '#008B8B'
              }
            />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View>
                <Text
                  style={[
                    styles.text_footer,
                    {
                      color: isDarkMode
                        ? EditHandler.EditGender
                          ? 'white'
                          : 'rgba(137, 252, 233, 1)'
                        : EditHandler.EditGender
                        ? 'black'
                        : '#008B8B',
                    },
                  ]}>
                  Male
                </Text>
              </View>
              <View>
                <RadioButton
                  disabled={EditHandler.EditGender ? true : false}
                  color={isDarkMode ? 'rgba(137, 252, 233, 1)' : '#008B8B'}
                  value="Male"
                  status={data.gender === 'Male' ? 'checked' : 'unchecked'}
                  onPress={() => setData({...data, gender: 'Male'})}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View>
                <Text
                  style={[
                    styles.text_footer,
                    {
                      color: isDarkMode
                        ? EditHandler.EditGender
                          ? 'white'
                          : 'rgba(137, 252, 233, 1)'
                        : EditHandler.EditGender
                        ? 'black'
                        : '#008B8B',
                    },
                  ]}>
                  Female
                </Text>
              </View>
              <View>
                <RadioButton
                  disabled={EditHandler.EditGender ? true : false}
                  color={isDarkMode ? 'rgba(137, 252, 233, 1)' : '#008B8B'}
                  value="Female"
                  status={data.gender === 'Female' ? 'checked' : 'unchecked'}
                  onPress={() => setData({...data, gender: 'Female'})}
                />
              </View>
            </View>
            <View style={{marginHorizontal: 10}}>
              <TouchableOpacity onPress={ChangeGenderEditStatus}>
                <View style={{alignItems: 'flex-end', flexDirection: 'column'}}>
                  <Edit
                    name="edit"
                    size={25}
                    color={
                      isDarkMode
                        ? EditHandler.EditGender
                          ? 'white'
                          : 'rgba(137, 252, 233, 1)'
                        : EditHandler.EditGender
                        ? 'black'
                        : '#008B8B'
                    }
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* IDENTIFICATION CARD */}
          <Text style={[styles.text_footer, {marginTop: 6,color:isDarkMode?'white':'black'}]}>
            Identification
          </Text>
          <View style={styles.action}>
            <IDCARD
              name="idcard"
              size={30}
              color={isDarkMode?EditHandler.EditID ? 'white' : 'rgba(137, 252, 233, 1)':EditHandler.EditID ? 'black' : '#008B8B'}
            />

            <TextInput
              underlineColor={isDarkMode?"black":'white'}
              activeUnderlineColor="black"
              textColor={
                isDarkMode ? EditHandler.EditID ? 'rgba(137, 252, 233, 1)' : 'white':EditHandler.EditID ? 'black':'#008B8B'
              }
              editable={EditHandler.EditID ? false : true}
              value={data.IdName}
              style={styles.TextInput}
              onChangeText={val => IDNameChange(val)}
            />
            <View
              style={{
                marginHorizontal: 10,
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View>
                <Button
                  disabled={EditHandler.EditID ? true : false}
                  mode="contained"
                  buttonColor={isDarkMode?"rgba(137, 252, 233, 1)":'#008B8B'}
                  onPress={() => selectImageID()}>
                  Upload
                </Button>
              </View>

              <View>
                <TouchableOpacity onPress={IDNameEditStatus}>
                  <View
                    style={{
                      alignItems: 'flex-end',
                      flexDirection: 'column',
                      marginLeft: 20,
                    }}>
                    <Edit
                      name="edit"
                      size={25}
                      color={
                        isDarkMode ? EditHandler.EditID ? 'white' : 'rgba(137, 252, 233, 1)': EditHandler.EditID ? 'black' : '#008B8B'
                      }
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>

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
                data.IdName,
                data.IDImage,
              )
            }
            style={[
              styles.signIn,
              {
                marginTop: 10,
                backgroundColor: isDarkMode? 'white':'#008B8B',
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
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[
              styles.signIn,
              {
                marginTop: 10,
                backgroundColor: isDarkMode? 'white':'#008B8B',
              },
            ]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={[styles.textSign, {color: 'black'}]}>Cancel</Text>
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
    flex: 2,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  footer: {
    flex: 4,
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
    backgroundColor: 'transparent',
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
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});
