import {View, Text, Pressable, StyleSheet, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import Calendar from 'react-native-vector-icons/AntDesign';
import Clock from 'react-native-vector-icons/AntDesign';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {useContext} from 'react';
import {AuthContext} from '../../navigation/AuthProvider';

let currentStartTime = '';
let currentEndTime = '';
let currentDate = '';
let tempstart = '';
let tempend = '';

export default function Date_Time_Conf() {
  useEffect(() => {
    currentStartTime = '';
    currentEndTime = '';
    currentDate = '';
    tempstart = '';
    tempend = '';
  }, []);

  const StartTime = new Date();
  const EndTime = new Date();
  const {isChanged, setChanged} = useContext(AuthContext);
  const {setSelectDate, setMin, setMax} = useContext(AuthContext);
  const [date, setDate] = useState(new Date());
  const [displaymode, setMode] = useState('time');
  const [isDisplayStartTime, setStartTimeShow] = useState(false);
  const [isDisplayEndTime, setEndTimeShow] = useState(false);
  const [isDisplayDate, setDateShow] = useState(false);

  const changeStartSelectedTime = (_event, selectedStartTime) => {
    tempstart = moment(selectedStartTime).format('HH:mm:ss');
    currentStartTime = moment(selectedStartTime).format('hh:mm A');
    if (tempstart != tempend || tempstart < tempend) {
      setStartTimeShow(false);
      setMin(tempstart);
    } else {
      Alert.alert('Inaccurate Time Selection');
      currentStartTime = '';
      setStartTimeShow(false);
    }
  };
  const showStartTimeMode = currentMode => {
    setStartTimeShow(true);
    setMode('time');
  };
  const displayStartTimepicker = () => {
    showStartTimeMode('time');
  };
  const changeEndSelectedTime = (_event, selectedEndTime) => {
    tempend = moment(selectedEndTime).format('HH:mm:ss A');
    currentEndTime = moment(selectedEndTime).format('hh:mm A');
    if (tempend === tempstart || tempend < tempstart) {
      Alert.alert('Inaccurate Time Selection');
      currentEndTime = '';
      setEndTimeShow(false);
    } else {
      setEndTimeShow(false);
      setMax(tempend);
    }
  };
  const showEndTimeMode = currentMode => {
    setEndTimeShow(true);
    setMode(currentMode);
  };
  const displayEndTimepicker = () => {
    showEndTimeMode('time');
  };
  const changeSelectedDate = (_event, selectedDate) => {
    currentDate = moment(selectedDate).format('YYYY-MM-DD');
    setDateShow(false);
    setSelectDate(currentDate);
  };
  const showDateMode = currentMode => {
    setDateShow(true);
    setMode(currentMode);
  };
  const displayDatepicker = () => {
    showDateMode('date');
  };

  return (
    <View>
      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <Pressable
          onPress={displayStartTimepicker}
          title="Select your Time"
          style={styles.TextInputTime}>
          {currentStartTime != 0 ? (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Clock name="clockcircle" size={25} color="white" />
              <Text style={[styles.Text, {marginLeft: 10}]}>
                {currentStartTime}
              </Text>
            </View>
          ) : (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Clock name="clockcircleo" size={25} color="white" />
              <Text style={[styles.Text, {marginLeft: 10}]}>Start Time</Text>
            </View>
          )}
        </Pressable>

        {isDisplayStartTime && (
          <DateTimePicker
            value={StartTime}
            mode={displaymode}
            is24Hour={true}
            display="default"
            onChange={changeStartSelectedTime}
          />
        )}

        <Pressable
          onPress={displayEndTimepicker}
          title="Select your Time"
          style={styles.TextInputTime}>
          {currentEndTime != 0 ? (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Clock name="clockcircle" size={25} color="white" />
              <Text style={[styles.Text, {marginLeft: 10}]}>
                {currentEndTime}
              </Text>
            </View>
          ) : (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Clock name="clockcircleo" size={25} color="white" />
              <Text style={[styles.Text, {marginLeft: 10}]}>End Time</Text>
            </View>
          )}
        </Pressable>

        {isDisplayEndTime && (
          <DateTimePicker
            value={EndTime}
            mode={displaymode}
            minuteInterval={10}
            is24Hour={true}
            display="default"
            onChange={changeEndSelectedTime}
          />
        )}
      </View>

      <View style={{alignItems: 'center'}}>
        <Pressable
          onPress={displayDatepicker}
          title="Select your Time"
          style={styles.TextInput}>
          {currentDate != 0 ? (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Calendar name="calendar" size={25} color="white" />
              <Text style={[styles.Text, {marginLeft: 10}]}>{currentDate}</Text>
            </View>
          ) : (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Calendar name="calendar" size={25} color="white" />
              <Text style={[styles.Text, {marginLeft: 10}]}>Date</Text>
            </View>
          )}
        </Pressable>
      </View>

      {isDisplayDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          minimumDate={new Date(Date.now() + 3600 * 1000 * 24 * 2)}
          maximumDate={new Date(2023, 12, 31)}
          mode={displaymode}
          is24Hour={true}
          display="default"
          onChange={changeSelectedDate}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  TextInput: {
    width: responsiveWidth(78),
    backgroundColor: '#242526',
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
    marginHorizontal: 15,
    paddingHorizontal: 20,
  },
  TextInputTime: {
    width: responsiveWidth(35),
    backgroundColor: '#242526',
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: 15,
    paddingHorizontal: 20,
  },
  Text: {
    color: 'white',
    fontSize: responsiveFontSize(1.7),
  },
  container: {
    flex: responsiveHeight(1),
    // backgroundColor: '#181818',
  },
  header: {
    flex: responsiveHeight(0.1),
    justifyContent: 'flex-end',
  },
  footer: {
    flex: 2,
    backgroundColor: '#242526',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
});
