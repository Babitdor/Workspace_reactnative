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
import OrderItems from '../tablebook/OrderItems';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../navigation/AuthProvider';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';

const {height} = Dimensions.get('screen');

export default function ViewCart() {
  const navigation = useNavigation();
  const {user} = useContext(AuthContext);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const {items} = useSelector(state => state.cartReducer.selectedItems);
  const total = items
    .map(item => Number(item.price.replace('₹', '')))
    .reduce((prev, curr) => prev + curr, 0);
  // totalRs : stores the overall total,and converted to Indian Currency
  const totalRs = total.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
  });

  const OnPayment = () => {
    dispatch({type: 'DESTORY_SESSION'});
  };
  //Function to update & store the firebase cloud store. Note : Integration of payment framework are to be done in here
  const addOrdertoFirebase = () => {
    const db = firestore();
    db.collection('CoffeeConvoOrders')
      .doc(user.uid)
      .collection('Orders')
      .add({
        Type: 'Coffee & Convo',
        email: user.email,
        items: items,
        total: totalRs,
        createdAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        console.log('Data Uploaded');
      });
    OnPayment();
    setModalVisible(false);
    navigation.navigate('Completed', {totalRs: totalRs});
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
              }}></View>
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
