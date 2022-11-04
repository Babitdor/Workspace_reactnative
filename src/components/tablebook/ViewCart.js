import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Cart from 'react-native-vector-icons/AntDesign';
import OrderItems from './OrderItems';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../navigation/AuthProvider';
import {firebase} from '@react-native-firebase/database';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
// import database from '@react-native-firebase/database';
const {height} = Dimensions.get('screen');

let Count = 0;
export default function ViewCart(props) {
  const [Tables, setTable] = useState([]);
  const reference = firebase
    .app()
    .database(
      'https://workspace-booking-392c3-default-rtdb.asia-southeast1.firebasedatabase.app/',
    );

  useEffect(() => {
    async function FetchData() {
      var snapshot = await firebase
        .app()
        .database(
          'https://workspace-booking-392c3-default-rtdb.asia-southeast1.firebasedatabase.app/',
        )
        .ref('/Data/Tables/')
        .once('value');
      setTable(snapshot.val());
    }
    FetchData();
  }, [isChanged]);

  // const {Date, EndTime, StartTime} = props.Date_Time.Date_Time;
  const navigation = useNavigation();
  const {seatid, tprice} = props.seats;
  const {MaxTime, MinTime, SelectDate} = useContext(AuthContext);
  const {user, SelectedSeats} = useContext(AuthContext);
  const dispatch = useDispatch();
  const {isChanged, setChanged} = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const {items} = useSelector(state => state.cartReducer.selectedItems);
  const total =
    items
      .map(item => Number(item.price.replace('₹', '')))
      .reduce((prev, curr) => prev + curr, 0) + tprice;
  // totalRs : stores the overall total,and converted to Indian Currency
  const totalRs = total.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
  });
  const Checking = SelectedSeats => {
    setChanged(isChanged => !isChanged);
    Count = 0;
    SelectedSeats.map(seat => {
      for (var i = 0; i < Object.keys(Tables).length; i++) {
        for (var j = 0; j < Object.keys(Tables[i].seats).length; j++) {
          if (
            JSON.stringify(seat.empty) ===
              JSON.stringify(!Tables[i].seats[j].empty) &&
            JSON.stringify(seat.booked) ===
              JSON.stringify(!Tables[i].seats[j].booked) &&
            JSON.stringify(seat.id) === JSON.stringify(Tables[i].seats[j].id)
          ) {
            Count++;
          }
        }
      }
    });
    return Count;
  };

  const grayoutseats = SelectedSeats => {
    setChanged(isChanged => !isChanged);
    reference.ref('/Data/Tables/').once('value', snapshot => {
      const Seat = Object.assign({}, snapshot.val());
      SelectedSeats.map(item => {
        console.log(item);
        for (var i = 0; i < Object.keys(Seat).length; i++) {
          for (var j = 0; j < Object.keys(Seat[i].seats).length; j++) {
            if (item.id === Seat[i].seats[j].id) {
              reference.ref(`/Data/Tables/${i}/seats/${j}`).update({
                booked: false,
                empty: false,
              });
            }
          }
        }
      });
    });
    return;
  };

  const OnPayment = () => {
    dispatch({type: 'DESTORY_SESSION'});
  };
  //Function to update & store the firebase cloud store. Note : Integration of payment framework are to be done in here
  const addOrdertoFirebase = () => {
    // AddtoBooked(seatid);
    if (Checking(SelectedSeats) > 0) {
      const db = firestore()
        .collection('BookATable')
        .doc(user.uid)
        .collection('Orders');
      db.add(
        {
          Type: 'Table Booking',
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
      ).then(() => {
        console.log('Data Uploaded');
      });
      grayoutseats(SelectedSeats);
      OnPayment();
      setModalVisible(false);
      navigation.navigate('Completed', {totalRs: totalRs});
    } else {
      alert('Seat is Taken');
      navigation.navigate('Home');
    }
  };

  const checkoutModalContent = () => {
    return (
      <>
        <Animatable.View style={styles.modalContainer} animation="fadeInUpBig">
          <View style={styles.modalCheckoutContainer}>
            <Text style={styles.tablename}>Checkout</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 20,
                borderBottomWidth: 1,
                borderBottomColor: '#999',
              }}>
              <Text style={{fontWeight: '600', fontSize: 16, color: 'white'}}>
                Seat : {seatid + ''}
              </Text>
              <Text style={{opacity: 0.7, fontSize: 16, color: 'white'}}>
                ₹{tprice}
              </Text>
            </View>
            {items.map((item, index) => (
              <OrderItems key={index} item={item} />
            ))}
            <View style={styles.subtotalContainer}>
              <Text style={styles.subTotalText}>Subtotal</Text>
              <Text style={styles.subTotalText}>{totalRs}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  backgroundColor: 'rgba(137, 252, 233, 1)',
                  alignItems: 'center',
                  padding: 13,
                  borderRadius: 30,
                  width: 300,
                  position: 'relative',
                }}
                onPress={addOrdertoFirebase}>
                <Text style={{color: 'black', fontSize: 20}}>Pay</Text>
                <Text style={{color: 'black', fontSize: 18, marginTop: 5}}>
                  {total ? totalRs : ''}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animatable.View>
      </>
    );
  };
  return (
    <>
      <Modal
        visible={modalVisible}
        transparent={true}
        statusBarTranslucent
        onRequestClose={() => setModalVisible(false)}>
        {checkoutModalContent()}
      </Modal>

      {total ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(137, 252, 233, 1)',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              padding: 13,
              width: '100%',
              position: 'relative',
            }}
            onPress={() => setModalVisible(true)}>
            <Text style={{color: 'black', fontSize: 20, marginRight: 30}}>
              View Cart
            </Text>
            <Cart
              color="black"
              name="shoppingcart"
              size={30}
              style={{marginRight: 30}}
            />
            <Text style={{color: 'black', fontSize: 20}}>{totalRs}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.8)',
    height: '100%',
  },
  modalCheckoutContainer: {
    backgroundColor: '#181818',
    padding: 16,
    margin: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: height * 0.7,
    borderWidth: 1,
  },
  tablename: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 20,
    marginBottom: 10,
  },
  subtotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  subTotalText: {
    color: 'white',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 10,
  },
});
