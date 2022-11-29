import PushNotification from 'react-native-push-notification';
import moment from 'moment';
export function StartTimeNotifications(SelectDate, MinTime, BookingID) {
  var reminder = moment(`${SelectDate} ${MinTime}`).subtract(30, 'm').toDate();

  PushNotification.localNotificationSchedule({
    title: `Table Booking : ${BookingID}`,
    message: `Almost Time till your Start Time: ${moment(
      MinTime,
      'HH:mm:ss',
    ).format('LT')}`,
    date: new Date(`${reminder}`),
    allowWhileIdle: false,
    channelId: '1',
    repeatTime: 1,
  });
  return;
}

export function EndTimeNotifications(SelectDate, MaxTime, BookingID) {
  var deadline = moment(`${SelectDate} ${MaxTime}`).subtract(20, 'm').toDate();

  PushNotification.localNotificationSchedule({
    title: `Table Booking : ${BookingID}`,
    message: `Almost Time till your End Time: ${moment(
      MaxTime,
      'HH:mm:ss',
    ).format('LT')}`,
    date: new Date(`${deadline}`),
    allowWhileIdle: false,
    channelId: '1',
    repeatTime: 1,
  });
  return;
}

export function StartTimeConferenceNotifications(
  SelectDate,
  MinTime,
  BookingID,
) {
  var reminder = moment(`${SelectDate} ${MinTime}`).subtract(30, 'm').toDate();

  PushNotification.localNotificationSchedule({
    title: `Conference : ${BookingID}`,
    message: `Almost Time till your Start Time: ${moment(
      MinTime,
      'HH:mm:ss',
    ).format('LT')}`,
    date: new Date(`${reminder}`),
    allowWhileIdle: false,
    channelId: '1',
    repeatTime: 1,
  });
  return;
}

export function EndTimeConferenceNotifications(SelectDate, MaxTime, BookingID) {
  var deadline = moment(`${SelectDate} ${MaxTime}`).subtract(20, 'm').toDate();
  PushNotification.localNotificationSchedule({
    title: `Conference : ${BookingID}`,
    message: `Almost Time till your End Time: ${moment(
      MaxTime,
      'HH:mm:ss',
    ).format('LT')}`,
    date: new Date(`${deadline}`),
    allowWhileIdle: false,
    channelId: '1',
    repeatTime: 1,
  });
  return;
}
