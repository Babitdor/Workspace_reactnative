import firestore from '@react-native-firebase/firestore';

export function uploadDatatoFirestore(
  BookingID,
  user,
  items,
  SelectDate,
  MinTime,
  MaxTime,
  totalRs,
  seatid,
) {
  const db = firestore()
    .collection('BookATable')
    .doc(user.uid)
    .collection('Orders')
    .doc(BookingID)
    .set(
      {
        Type: 'Table Booking',
        BookingID: BookingID,
        email: user.email,
        items: items,
        Date: SelectDate,
        StartTime: MinTime,
        EndTime: MaxTime,
        total: totalRs,
        seatsNo: seatid,
        createdAt: firestore.FieldValue.serverTimestamp(),
      },
      {merge: true},
    )
    .then(() => {});
}

export function uploadConferenceDatatoFirestore(
  BookingID,
  user,
  items,
  SelectDate,
  MinTime,
  MaxTime,
  totalRs,
  seatid,
) {
  const db = firestore()
    .collection('BookAConference')
    .doc(user.uid)
    .collection('Orders')
    .doc(BookingID)
    .set(
      {
        Type: 'Conference Booking',
        BookingID: BookingID,
        email: user.email,
        items: items,
        Date: SelectDate,
        StartTime: MinTime,
        EndTime: MaxTime,
        total: totalRs,
        seatsNo: seatid,
        createdAt: firestore.FieldValue.serverTimestamp(),
      },
      {merge: true},
    )
    .then(() => {});
}

export function uploadCoffeeConvoData(user, BookingID, items, totalRs) {
  const db = firestore();
  db.collection('CoffeeConvoOrders')
    .doc(user.uid)
    .collection('Orders')
    .doc(BookingID)
    .set({
      Type: 'Coffee & Convo',
      email: user.email,
      BookingID: BookingID,
      items: items,
      total: totalRs,
      createdAt: firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {});
}
