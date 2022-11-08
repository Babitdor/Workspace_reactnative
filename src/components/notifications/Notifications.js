import {View, Text, Button} from 'react-native';
import React from 'react';
import PushNotification from 'react-native-push-notification';
import moment from 'moment';
const Notifications = props => {
  var reminder = moment(`${props.Date} ${props.StartTime}`)
    .subtract(30, 'm')
    .toDate();

  const title = props.Type;
  const index = props.index;
  const time = new Date(`${reminder}`);
  const notifyme = (val, name, index) => {
    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      title: `${name} ${index + 1}`,
      message: `Start Time : ${moment(val, 'HH:mm:ss').format(
        'LT',
      )} 30 Mins Left`, // (required)
      date: val, // in 60 secs
      allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
      channelId: '1',
      /* Android Only Properties */
      repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
    });
  };

  return (
    <View>
      <Button
        title="Set a Reminder"
        onPress={() => notifyme(time, title, index)}
        disabled={props.Clicked ? true : false}
      />
    </View>
  );
};

export default Notifications;
