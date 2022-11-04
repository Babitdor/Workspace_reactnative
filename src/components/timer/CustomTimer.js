import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore'
import moment from 'moment';
function CustomTimer(props) { 
    const calculateTimeLeft = (value) => {
        
        let year = new Date().getFullYear();
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
      const [year] = useState(new Date().getFullYear());
    
      useEffect(() => {
        setTimeout(() => {
          setTimeLeft(calculateTimeLeft(props));
        }, 1000);
      });
    
      const timerComponents = [];
    
      Object.keys(timeLeft).forEach((interval) => {
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
        backgroundColor: '#181818',
      }}>
      <View>
        <View style={{alignItems: 'center', padding: 10}}>
          <View>
            <Text style={{color: 'white', fontSize: 20}}>{timeLeft.days}</Text>
          </View>
          <View>
            <Text style={{color: 'white', fontSize: 12}}>Days</Text>
          </View>
        </View>
      </View>

      <View>
        <View style={{alignItems: 'center', padding: 10}}>
          <View>
            <Text style={{color: 'white', fontSize: 20}}>{timeLeft.hours}</Text>
          </View>
          <View>
            <Text style={{color: 'white', fontSize: 12}}>Hours</Text>
          </View>
        </View>
      </View>

      <View>
        <View style={{alignItems: 'center', padding: 10}}>
          <View>
            <Text style={{color: 'white', fontSize: 20}}>
              {timeLeft.minutes}
            </Text>
          </View>
          <View>
            <Text style={{color: 'white', fontSize: 12}}>Minute</Text>
          </View>
        </View>
      </View>

      <View>
        <View style={{alignItems: 'center', padding: 10}}>
          <View>
            <Text style={{color: 'white', fontSize: 20}}>
              {timeLeft.seconds}
            </Text>
          </View>
          <View>
            <Text style={{color: 'white', fontSize: 12}}>Seconds</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default CustomTimer;
