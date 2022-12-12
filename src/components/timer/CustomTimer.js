import React, {useContext, useEffect, useState} from 'react';
import {Text, View, Button} from 'react-native';
import {AuthContext} from '../../navigation/AuthProvider';
// import PushNotification from 'react-native-push-notification';
// import moment from 'moment/moment';

export default function CustomTimer(props) {
  const {isDarkMode} = useContext(AuthContext);
  // var reminder = moment(`${props.date} ${props.time}`).subtract(30, 'm').toDate();
  const calculateTimeLeft = value => {
    const difference = +new Date(`${value.date} ${value.time}`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(props));

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft(props));
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach(interval => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <View style={{backgroundColor: 'red', flex: 1, alignItems: 'center'}}>
        <Text style={{color: 'white'}}>{timeLeft[interval]}</Text>
      </View>,
    );
  });

  return (
    <>
      {timerComponents.length ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 10,
            justifyContent: 'center',
            flexDirection: 'row',
            borderRadius: 10,
            margin: 10,
            borderWidth: 1,
            borderColor: 'rgba(137, 252, 233, 1)',
          }}>
          <View>
            <View style={{alignItems: 'center', padding: 10}}>
              <View>
                <Text style={{color:  isDarkMode?'white':'black', fontSize: 20}}>
                  {timeLeft.days}
                </Text>
              </View>
              <View>
                <Text style={{color: isDarkMode?'white':'black', fontSize: 12}}>Days</Text>
              </View>
            </View>
          </View>

          <View>
            <View style={{alignItems: 'center', padding: 10}}>
              <View>
                <Text style={{color:  isDarkMode?'white':'black', fontSize: 20}}>
                  {timeLeft.hours}
                </Text>
              </View>
              <View>
                <Text style={{color:  isDarkMode?'white':'black', fontSize: 12}}>Hours</Text>
              </View>
            </View>
          </View>

          <View>
            <View style={{alignItems: 'center', padding: 10}}>
              <View>
                <Text style={{color:  isDarkMode?'white':'black', fontSize: 20}}>
                  {timeLeft.minutes}
                </Text>
              </View>
              <View>
                <Text style={{color:  isDarkMode?'white':'black', fontSize: 12}}>Minutes</Text>
              </View>
            </View>
          </View>

          <View>
            <View style={{alignItems: 'center', padding: 10}}>
              <View>
                <Text style={{color:  isDarkMode?'white':'black', fontSize: 20}}>
                  {timeLeft.seconds}
                </Text>
              </View>
              <View>
                <Text style={{color: isDarkMode?'white':'black', fontSize: 12}}>Seconds</Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <Text
          style={{
            color: isDarkMode ? 'cyan' : 'black',
            textAlign: 'center',
            fontSize: 20,
            marginHorizontal: 15,
          }}>
          Ticket Finished
        </Text>
      )}
    </>
  );
}
