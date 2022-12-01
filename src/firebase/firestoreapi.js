import firestore from '@react-native-firebase/firestore';

export async function uploadDatatoFirestore(
  BookingID,
  user,
  items,
  SelectDate,
  MinTime,
  MaxTime,
  totalRs,
  seatid,
) {
  const db = firestore();
  await db
    .collection('BookATable')
    .doc(user.uid)
    .collection('Orders')
    .doc(BookingID)
    .set({
      createdAt: firestore.FieldValue.serverTimestamp(),
      Type: 'Table Booking',
      BookingID: BookingID,
      email: user.email,
      items: items,
      Date: SelectDate,
      StartTime: MinTime,
      EndTime: MaxTime,
      total: totalRs,
      seatsNo: seatid,
    })
    .catch(e => {
      console.log(e);
    });
  return Promise;
}

export async function uploadConferenceDatatoFirestore(
  BookingID,
  user,
  items,
  SelectDate,
  MinTime,
  MaxTime,
  totalRs,
  seatid,
) {
  const db = firestore();
  await db
    .collection('BookAConference')
    .doc(user.uid)
    .collection('Orders')
    .doc(BookingID)
    .set(
      {
        createdAt: firestore.FieldValue.serverTimestamp(),
        Type: 'Conference Booking',
        BookingID: BookingID,
        email: user.email,
        items: items,
        Date: SelectDate,
        StartTime: MinTime,
        EndTime: MaxTime,
        total: totalRs,
        seatsNo: seatid,
      },
      {merge: true},
    )
    .catch(e => {
      console.log(e);
    });
  return Promise;
}

export async function uploadCoffeeConvoData(user, BookingID, items, totalRs) {
  const db = firestore();
  await db
    .collection('CoffeeConvoOrders')
    .doc(user.uid)
    .collection('Orders')
    .doc(BookingID)
    .set({
      createdAt: firestore.FieldValue.serverTimestamp(),
      Type: 'Coffee & Convo',
      email: user.email,
      BookingID: BookingID,
      items: items,
      total: totalRs,
    })
    .catch(e => {
      console.log(e);
    });
  return Promise;
}
