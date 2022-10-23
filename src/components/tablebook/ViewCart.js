import {View, Text, TouchableOpacity, Modal, StyleSheet,Dimensions} from 'react-native';
import React, {useState, useContext} from 'react';
import {useSelector} from 'react-redux';
import Cart from 'react-native-vector-icons/AntDesign';
import OrderItems from './OrderItems';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../navigation/AuthProvider';
import {firebase} from '@react-native-firebase/database';
import * as Animatable from 'react-native-animatable'
const {height} = Dimensions.get('screen');
const sending = firebase;
const reference = firebase
  .app()
  .database(
    'https://workspace-booking-392c3-default-rtdb.asia-southeast1.firebasedatabase.app/',
  )
  .ref('/Data/Tables/')
  .on('value', snapshot => {
    Tables = snapshot.val();
  });


  let Title = []
export default function ViewCart(props) {
 
  const {seatid, totalseat, tprice} = props.seats;
  const {user} = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const {items, tablename} = useSelector(
    state => state.cartReducer.selectedItems,
  );
  const total =
    items
      .map(item => Number(item.price.replace('₹', '')))
      .reduce((prev, curr) => prev + curr, 0) + tprice;

  // totalRs : stores the overall total,and converted to Indian Currency
  const totalRs = total.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
  });

  //graoutseats function, grays out the seats in the booking layout, on successful booking.
  const grayoutseats = seatid => {
    for (i = 0; i < Tables.length; i++) {
      for (j = 0; j < Tables[i].seats.length; j++) {
        seatid.map(seat => {
          if (seat === Tables[i].seats[j].id) {
            
            sending
              .app()
              .database(
                'https://workspace-booking-392c3-default-rtdb.asia-southeast1.firebasedatabase.app/',
              )
              .ref(`/Data/Tables/${i}/seats/${j}`)
              .update({
                booked: false,
                empty: false,
              });
              // Title.push(Tables[i].title)
          }
        });
      }
    }
    return;
  };

  const Titlestore = seatid => {
    for (i = 0; i < Tables.length; i++) {
      for (j = 0; j < Tables[i].seats.length; j++) {
        seatid.map(seat => {
          if (seat === Tables[i].seats[j].id) {
            
              Title.push(Tables[i].title)
          }
        });
      }
    }
    return;
  };

  //Function to update & store the firebase cloud store. Note : Integration of payment framework are to be done in here
  const addOrdertoFirebase = () => {
    const db = firestore();
    Titlestore(seatid)
    db.collection('orders')
      .add({
        email: user.email,
        items: items,
        total: totalRs,
        title: Title,
        seatsNo: seatid,
        createdAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        console.log('Data Uploaded');
      });
    grayoutseats(seatid);
    setModalVisible(false);
  };

  const checkoutModalContent = () => {
    return (
      <>
        <Animatable.View style={styles.modalContainer} animation='fadeInUpBig'>
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
              <Text style={{fontWeight: '600', fontSize:16,color:'white', }} >Seat : {seatid+""}</Text>
              <Text style={{opacity:0.7, fontSize:16,color:'white'}}>₹{tprice}</Text>
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
                  backgroundColor: 'black',
                  alignItems: 'center',
                  padding: 13,
                  borderRadius: 30,
                  width: 300,
                  position: 'relative',
                }}
                onPress={addOrdertoFirebase}>
                <Text style={{color: 'white', fontSize: 20}}>Pay</Text>
                <Text style={{color: 'white', fontSize: 16, marginTop: 5}}>
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
              backgroundColor: 'black',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              padding: 13,
              width: '100%',
              position: 'relative',
            }}
            onPress={() => setModalVisible(true)}>
            <Text style={{color: 'white', fontSize: 20, marginRight: 30}}>
              View Cart
            </Text>
            <Cart
              color="white"
              name="shoppingcart"
              size={30}
              style={{marginRight: 30}}
            />
            <Text style={{color: 'white', fontSize: 20}}>{totalRs}</Text>
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
    height:'100%'
  },
  modalCheckoutContainer: {
    backgroundColor: '#181818',
    padding: 16,
    margin: 2,
    borderRadius: 30,
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
