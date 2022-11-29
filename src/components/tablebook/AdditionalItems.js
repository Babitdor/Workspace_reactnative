import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  BackHandler,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState, useCallback, useRef} from 'react';
import BouncyCheckBox from 'react-native-bouncy-checkbox';
import {useDispatch, useSelector} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {firebase} from '@react-native-firebase/database';
import Loading from '../home/Loading';
export default function AdditionalItems() {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );
  useEffect(() => {
    async function FetchData() {
      var snapshot = await firebase
        .app()
        .database()
        .ref('/Data/Items/')
        .once('value', snapshot => {
          setITEMS(snapshot.val());
          setOldITEMS(snapshot.val());
        });
    }
    FetchData();
  }, []);
  const searchRef = useRef('');
  const [search, setSearch] = useState();
  const [items, setITEMS] = useState([]);
  const [Olditems, setOldITEMS] = useState([]);
  const dispatch = useDispatch();
  const selectItem = (item, checkboxValue) =>
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        ...item,
        checkboxValue: checkboxValue,
      },
    });

  const cartItems = useSelector(state => state.cartReducer.selectedItems.items);

  const isIteminCart = (_item, cartItems) =>
    Boolean(cartItems.find(item => item.title === _item.title));
  const SPACING = 20;
  const AVATAR_SIZE = 70;
  const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

  const onSearch = text => {
    if (text == '') {
      setITEMS(Olditems);
    } else {
      let tempList = items.filter(item => {
        return item.title.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      setITEMS(tempList);
    }
  };
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',
          marginHorizontal: 20,
          marginBottom: 12,
          borderRadius: 20,
          paddingHorizontal: 20,
        }}>
        <View>
          <Icon name="search1" color={'black'} size={25} />
        </View>

        <TextInput
          placeholder="Search item here..."
          ref={searchRef}
          value={search}
          style={{
            width: '85%',
            borderRadius: 20,
            paddingHorizontal: 15,
          }}
          onChangeText={txt => {
            onSearch(txt);
            setSearch(txt);
          }}
        />
        {search=='' ? null : (
          <TouchableOpacity
            onPress={() => {
              searchRef.current.clear();
              onSearch('');
              setSearch('');
            }}>
            <Icon name="close" color={'black'} size={25} />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={items}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => {
          return (
            <>
              <Animatable.View
                useNativeDriver
                animation="fadeInUp"
                style={styles.items}>
                <ItemImage items={item} />
                <ItemTitle items={item} />
                <BouncyCheckBox
                  fillColor="rgba(98, 190, 175, 1)"
                  size={30}
                  iconStyle={{borderColor: 'lightgray'}}
                  onPress={checkboxValue => selectItem(item, checkboxValue)}
                  isChecked={isIteminCart(item, cartItems)}
                />
              </Animatable.View>
            </>
          );
        }}
      />
    </>
  );
}

const ItemTitle = props => (
  <View
    style={{
      width: '50%',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
    }}>
    <View>
      <Text style={{fontSize: 18, fontWeight: '600', color: '#E4E6EB'}}>
        {props.items.title}
      </Text>
      <Text style={{fontSize: 15, color: '#E4E6EB'}}>{props.items.price}</Text>
    </View>
  </View>
);

const ItemImage = props => (
  <View>
    <Image
      style={{width: 90, height: 90, resizeMode: 'contain', borderRadius: 20}}
      source={{uri: props.items.image}}
    />
  </View>
);

const styles = StyleSheet.create({
  items: {
    backgroundColor: '#181818',
    padding: 12,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
      elevation: 10,
    },
  },
});
