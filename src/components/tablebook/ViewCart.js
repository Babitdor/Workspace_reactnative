import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Cart from 'react-native-vector-icons/AntDesign';
import OrderItems from './OrderItems';
import {AuthContext} from '../../navigation/AuthProvider';
import {firebase} from '@react-native-firebase/database';
import * as Animatable from 'react-native-animatable';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import urid from 'urid';
import {uploadDatatoFirestore} from '../../firebase/firestoreapi';
import {FlatList} from 'react-native';
import {
  StartTimeNotifications,
  EndTimeNotifications,
} from '../notifications/Notifications';

const {height} = Dimensions.get('screen');
let Count = 0;

export default function ViewCart(props) {
  const [Tables, setTable] = useState([]);
  const [BookingID, setBookingID] = useState();
  const reference = firebase.app().database();
  const navigation = useNavigation();
  const {seatid, tprice} = props.seats;
  const {
    MaxTime,
    MinTime,
    SelectDate,
    user,
    SelectedSeats,
    isChanged,
    setChanged,
  } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    async function FetchData() {
      var snapshot = await firebase
        .app()
        .database()
        .ref('/Data/Tables/')
        .on('value', snapshot => {
          setTable(snapshot.val());
        });
      return () => database().ref(`/Data/Tables/`).off('value', snapshot);
    }
    FetchData();
  }, [isChanged]);

  useEffect(() => {
    const id = urid(6, `0123456789TALEBOKING`);
    setBookingID(id);
  }, []);

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
  const grayoutseats = () => {
    setChanged(isChanged => !isChanged);
    SelectedSeats.map(item => {
      for (var i = 0; i < Object.keys(Tables).length; i++) {
        for (var j = 0; j < Object.keys(Tables[i].seats).length; j++) {
          if (item.id === Tables[i].seats[j].id) {
            reference.ref(`/Data/Tables/${i}/seats/${j}`).update({
              booked: false,
              empty: false,
            });
          }
        }
      }
    });
    return;
  };
  // const grayoutseats = seat => {
  //   reference.ref('/Data/Tables/').once('value', snapshot => {
  //     snapshot.forEach(userSnapshot => {
  //       userSnapshot.child('seats').forEach(Snapshot => {
  //         if (Snapshot.child('id').val() === seat) {
  //           var DataLink = Snapshot.ref
  //             .toString()
  //             .replace(reference.ref().toString(), '');
  //           reference.ref(`${DataLink}`).update({
  //             booked: false,
  //             empty: false,
  //           });
  //           return;
  //         }
  //       });
  //     });
  //   });
  // };
  const OnPayment = () => {
    dispatch({type: 'DESTORY_SESSION'});
  };
  //Function to update & store the firebase cloud store. Note : Integration of payment framework are to be done in here
  const addOrdertoFirebase = () => {
    // AddtoBooked(seatid);
    if (Checking(SelectedSeats) > 0) {
      uploadDatatoFirestore(
        BookingID,
        user,
        items,
        SelectDate,
        MinTime,
        MaxTime,
        totalRs,
        seatid,
        SelectedSeats,
      );
      OnPayment();
      grayoutseats();
      StartTimeNotifications(SelectDate, MinTime, BookingID);
      EndTimeNotifications(SelectDate, MaxTime, BookingID);
      setModalVisible(false);
      navigation.navigate('Completed', {totalRs: totalRs});
    } else {
      Alert.alert('Seat is Taken');
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

            <FlatList
              showsVerticalScrollIndicator={false}
              data={items}
              renderItem={({item, index}) => {
                return <OrderItems key={index} item={item} />;
              }}
              horizontal={false}
            />

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
                  padding: 5,
                  borderRadius: 30,
                  width: 300,
                  position: 'relative',
                }}
                onPress={() => addOrdertoFirebase()}>
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
              padding: 10,
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
    height: height * 0.9,
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
