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
// import {TextInput} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {RadioButton} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import Edit from 'react-native-vector-icons/AntDesign';

export default function Edit_Field({route}) {
  const Data = route.params.Userdata;
  const [isDisplayDate, setDateShow] = useState(false);
  const navigation = useNavigation();
  const [displaymode, setMode] = useState('time');
  const {user, updateIncompleteData, setRefresh, Refresh} =
    useContext(AuthContext);
  const [EditHandler, setEditHandler] = useState({
    EditName: true,
    EditDOB: true,
    EditPhoneNo: true,
    EditGender: true,
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
  const Update = (User, Name, DOB, Phone, Gender) => {
    updateIncompleteData(User, Name, DOB, Phone, Gender);
    setRefresh(Resfresh => !Refresh);
    navigation.navigate('ProfileScreen');
  };
  const ChangeNameEditStatus = () => {
    setEditHandler({
      ...EditHandler,
      EditName: !EditHandler.EditName,
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
  return (
    <View style={styles.container}>
      <View style={[styles.header,{alignItems:'center'}]}>
        <Image source={require('../../assets/UpdateProfile.png')} resizeMode='contain' style={{width:100, height:100}}/>
      </View>

      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        {/* Name Section */}
        <Text style={styles.text_footer}>Name</Text>
        <View style={styles.action}>
          <User
            name="user"
            size={30}
            color={EditHandler.EditName ? 'white' : 'rgba(137, 252, 233, 1)'}
          />
          <TextInput
            editable={EditHandler.EditName ? false : true}
            underlineColor="black"
            activeUnderlineColor="black"
            textColor={
              EditHandler.EditName ? 'rgba(137, 252, 233, 1)' : 'white'
            }
            style={[styles.TextInput, {borderColor: 'transparent'}]}
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
                    EditHandler.EditName ? 'white' : 'rgba(137, 252, 233, 1)'
                  }
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Date of Birth Section */}
        <Text style={[styles.text_footer, {marginTop: 6}]}>Date of Birth</Text>
        <View style={styles.action}>
          <Cake
            name="cake-variant-outline"
            size={30}
            color={EditHandler.EditDOB ? 'white' : 'rgba(137, 252, 233, 1)'}
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
                  fontSize: 20,
                  marginLeft: 15,
                  color: EditHandler.EditDOB
                    ? 'rgba(137, 252, 233, 1)'
                    : 'white',
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
                    EditHandler.EditDOB ? 'white' : 'rgba(137, 252, 233, 1)'
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
        <Text style={[styles.text_footer, {marginTop: 6}]}>Phone No.</Text>
        <View style={styles.action}>
          <Phone
            name="phone"
            size={30}
            color={EditHandler.EditPhoneNo ? 'white' : 'rgba(137, 252, 233, 1)'}
          />
          <TextInput
            maxLength={10}
            underlineColor="black"
            activeUnderlineColor="black"
            textColor={
              EditHandler.EditPhoneNo ? 'rgba(137, 252, 233, 1)' : 'white'
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
                    EditHandler.EditPhoneNo ? 'white' : 'rgba(137, 252, 233, 1)'
                  }
                />
              </View>
            </TouchableOpacity>
          </View>
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
            color={EditHandler.EditGender ? 'white' : 'rgba(137, 252, 233, 1)'}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <Text
                style={[
                  styles.text_footer,
                  {
                    color: EditHandler.EditGender
                      ? 'rgba(137, 252, 233, 1)'
                      : 'white',
                  },
                ]}>
                Male
              </Text>
            </View>
            <View>
              <RadioButton
                disabled={EditHandler.EditGender ? true : false}
                color="rgba(137, 252, 233, 1)"
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
                    color: EditHandler.EditGender
                      ? 'rgba(137, 252, 233, 1)'
                      : 'white',
                  },
                ]}>
                Female
              </Text>
            </View>
            <View>
              <RadioButton
                disabled={EditHandler.EditGender ? true : false}
                color="rgba(137, 252, 233, 1)"
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
                    EditHandler.EditGender ? 'white' : 'rgba(137, 252, 233, 1)'
                  }
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            onPress={() =>
              Update(
                user,
                data.name,
                data.date_of_birth,
                data.phoneNo,
                data.gender,
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
    fontSize: 20,
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
