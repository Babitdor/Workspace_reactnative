import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import Loading from '../home/Loading';
import Cart from 'react-native-vector-icons/AntDesign';
import Up from 'react-native-vector-icons/AntDesign';
import {Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import {firebase} from '@react-native-firebase/database';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import {AuthContext} from '../../navigation/AuthProvider';
import Date_Time_Conf from './Date_Time_Conf';
import ConferenceIndicator from './ConferenceIndicator';
const {height} = Dimensions.get('screen');
let seatsprices = 0;
let selectedseats = [];
let SeatSelectedStatus = [];
let selectedseatsid = [];
export default function Bookingscreen(props) {
  const navigation = useNavigation();
  const [Table, setTable] = useState();
  const [table1, setTable1] = useState([]);
  const [table2, setTable2] = useState([]);
  const [table4, setTable4] = useState([]);
  const [table5, setTable5] = useState([]);
  const [table6, setTable6] = useState([]);
  const [table7, setTable7] = useState([]);
  const [Conference, setConference] = useState([]);
  const [Open, setOpen] = useState(false);
  const {
    setSeats,
    MinTime,
    MaxTime,
    SelectDate,
    setMin,
    setMax,
    setSelectDate,
  } = useContext(AuthContext);
  const {isChanged, setChanged} = useContext(AuthContext);

  useEffect(() => {
    setMax('');
    setMin('');
    setSelectDate('');
  }, []);

  useEffect(() => {
    async function FetchData() {
      var snapshot = await firebase
        .app()
        .database()
        .ref('/Data/Tables/')
        .on('value', snapshot => {
          setTable(snapshot.val());
          setTable1(snapshot.val()[0].seats);
          setTable2(snapshot.val()[1].seats);
          setTable4(snapshot.val()[3].seats);
          setTable5(snapshot.val()[4].seats);
          setTable6(snapshot.val()[5].seats);
          setTable7(snapshot.val()[6].seats);
          setConference(snapshot.val()[7].seats);
        });
      return () => database().ref(`/Data/Tables/`).off('value', snapshot);
    }
    FetchData();
  }, [isChanged]);
  const onSelectConference = index => {
    let tempRow = [];
    tempRow = Conference;
    tempRow.map((item, ind) => {
      if (index === ind) {
        if (item.booked === true) {
          item.booked = false;
          item.empty = true;
        } else {
          item.booked = true;
          item.empty = false;
        }
      }
    });
    let tempSeats = [];
    tempRow.map(item => {
      tempSeats.push(item);
    });
    setConference(tempSeats);
  };
  const getAllSeats = () => {
    selectedseats = [];
    SeatSelectedStatus = [];
    selectedseatsid = [];
    seatsprices = 0;
    Conference.map(item => {
      if (item.booked == true) {
        selectedseats.push(1);
        SeatSelectedStatus.push(item);
        selectedseatsid.push(item.id);
        seatsprices += props.database[7].price;
      }
    });
    return selectedseatsid + '';
  };

  const confirmseat = () => {
    if (MinTime !== '' && MaxTime !== '' && SelectDate !== '') {
      setSeats(SeatSelectedStatus);
      setChanged(isChanged => !isChanged);
      navigation.navigate('ConferenceBook', {
        seatselected: SeatSelectedStatus,
        seatid: selectedseatsid,
        tprice: seatsprices,
      });
    } else {
      Alert.alert('No Date or Time Selected');
      navigation.navigate('Home');
    }
  };

  return (
    <>
      {Table ? (
        <>
          <Animatable.View animation="fadeInUpBig" useNativeDriver>
            {/* Seat Indicators */}
            <ConferenceIndicator />
          </Animatable.View>
          <SafeAreaView style={styles.container}>
            <Animatable.View
              useNativeDriver
              animation="fadeInUpBig"
              delay={100}
              style={styles.footer}>
              {/* Seat Layout Container */}
              <View
                style={{
                  width: '100%',
                  position: 'relative',
                }}>
                {/* TABLE A */}
                <View
                  style={{
                    top: 160,
                    left: 30,
                    zIndex: 100,
                    alignItems: 'center',
                    position: 'absolute',
                    flex: 1,
                  }}>
                  <FlatList
                    data={table1}
                    renderItem={({item}) => {
                      return (
                        <TouchableOpacity style={{padding: 5}} disabled={true}>
                          {item.empty == false && item.booked == true ? (
                            <Image
                              style={{
                                width: 50,
                                height: 40,
                                transform: [{rotate: '270deg'}],
                                tintColor: 'gray',
                                resizeMode: 'contain',
                              }}
                              source={require('../../assets/TableA.png')}
                            />
                          ) : item.empty == true && item.booked == false ? (
                            <Image
                              style={{
                                width: 50,
                                height: 40,
                                transform: [{rotate: '270deg'}],
                                resizeMode: 'contain',
                                tintColor: 'gray',
                              }}
                              source={require('../../assets/TableA.png')}
                            />
                          ) : item.empty == false && item.booked == false ? (
                            <Image
                              style={{
                                width: 50,
                                height: 40,
                                transform: [{rotate: '270deg'}],
                                resizeMode: 'contain',
                                tintColor: 'gray',
                              }}
                              source={require('../../assets/TableA.png')}
                            />
                          ) : null}
                        </TouchableOpacity>
                      );
                    }}
                    horizontal
                  />
                </View>
                {/* TABLE B */}
                <View
                  style={{
                    top: 240,
                    left: 15,
                    zIndex: 100,
                    flex: 1,
                    alignItems: 'center',
                    position: 'absolute',
                  }}>
                  <FlatList
                    data={table2}
                    renderItem={({item}) => {
                      return (
                        <TouchableOpacity style={{padding: 5}} disabled={true}>
                          {item.empty == false && item.booked == true ? (
                            <Image
                              style={{
                                width: 40,
                                height: 40,
                                resizeMode: 'contain',
                                tintColor: 'gray',
                              }}
                              source={require('../../assets/TableB.png')}
                            />
                          ) : item.empty == true && item.booked == false ? (
                            <Image
                              style={{
                                width: 40,
                                height: 40,
                                resizeMode: 'contain',
                                tintColor: 'gray',
                              }}
                              source={require('../../assets/TableB.png')}
                            />
                          ) : item.empty == false && item.booked == false ? (
                            <Image
                              style={{
                                width: 40,
                                height: 40,
                                tintColor: 'gray',
                                resizeMode: 'contain',
                              }}
                              source={require('../../assets/TableB.png')}
                            />
                          ) : null}
                        </TouchableOpacity>
                      );
                    }}
                    horizontal
                  />
                </View>
                {/* Table C */}
                <View
                  style={{
                    top: 120,
                    left: 160,
                    zIndex: 100,
                    flex: 1,
                    alignItems: 'center',
                    position: 'absolute',
                    padding: 5,
                  }}>
                  <TouchableOpacity
                    style={{
                      borderRadius: 20,
                      borderColor: 'white',
                      borderWidth: 2,
                      marginBottom: -16,
                      padding: 8,
                      zIndex: 999,
                    }}
                    onPress={() => {
                      navigation.navigate('TableDescription', {
                        Table: props.database[7],
                      });
                    }}>
                    <Text style={{fontWeight: 'bold', color: 'white'}}>
                      Conference
                    </Text>
                  </TouchableOpacity>
                  <FlatList
                    data={Conference}
                    renderItem={({item, index}) => {
                      return (
                        <TouchableOpacity
                          style={{padding: 5}}
                          disabled={
                            item.booked == false && item.empty == false
                              ? true
                              : false
                          }
                          onPress={() => {
                            if (item.booked == false && item.empty == false) {
                              alert(item.id + ' is already Booked');
                            } else {
                              onSelectConference(index);
                            }
                          }}>
                          {item.empty == false && item.booked == true ? (
                            <Image
                              style={{
                                width: 150,
                                height: 100,
                                tintColor: 'rgba(137, 252, 233, 1)',
                              }}
                              source={require('../../assets/Conference.png')}
                            />
                          ) : item.empty == true && item.booked == false ? (
                            <Image
                              style={{
                                width: 150,
                                height: 100,
                              }}
                              source={require('../../assets/Conference.png')}
                            />
                          ) : item.empty == false && item.booked == false ? (
                            <Image
                              style={{
                                width: 150,
                                height: 100,
                                tintColor: 'rgba(147, 147, 147, 0.53)',
                              }}
                              source={require('../../assets/Conference.png')}
                            />
                          ) : null}
                        </TouchableOpacity>
                      );
                    }}
                    horizontal
                  />
                </View>
                {/* TABLE D */}
                <View
                  style={{
                    top: 25,
                    right: 145,
                    zIndex: 100,
                    flex: 1,
                    alignItems: 'center',
                    position: 'absolute',
                  }}>
                  <FlatList
                    data={table4}
                    renderItem={({item, index}) => {
                      return (
                        <TouchableOpacity style={{padding: 3}} disabled={true}>
                          {item.empty == false && item.booked == true ? (
                            <Image
                              style={{
                                width: 30,
                                height: 30,
                                tintColor: 'gray',
                              }}
                              source={require('../../assets/TableD.png')}
                            />
                          ) : item.empty == true && item.booked == false ? (
                            <Image
                              style={{
                                width: 30,
                                height: 30,
                                tintColor: 'gray',
                              }}
                              source={require('../../assets/TableD.png')}
                            />
                          ) : item.empty == false && item.booked == false ? (
                            <Image
                              style={{
                                width: 30,
                                height: 30,
                                tintColor: 'gray',
                              }}
                              source={require('../../assets/TableD.png')}
                            />
                          ) : null}
                        </TouchableOpacity>
                      );
                    }}
                    numColumns={2}
                  />
                </View>
                {/* TABLE E */}
                <View
                  style={{
                    top: 80,
                    right: 20,
                    zIndex: 100,
                    flex: 1,
                    alignItems: 'center',
                    position: 'absolute',
                  }}>
                  <FlatList
                    data={table5}
                    renderItem={({item}) => {
                      return (
                        <TouchableOpacity style={{padding: 2}} disabled={true}>
                          {item.empty == false && item.booked == true ? (
                            <Image
                              style={{
                                width: 50,
                                height: 50,
                                tintColor: 'gray',
                              }}
                              source={require('../../assets/TableB.png')}
                            />
                          ) : item.empty == true && item.booked == false ? (
                            <Image
                              style={{
                                width: 50,
                                height: 50,
                                tintColor: 'gray',
                              }}
                              source={require('../../assets/TableB.png')}
                            />
                          ) : item.empty == false && item.booked == false ? (
                            <Image
                              style={{
                                width: 50,
                                height: 50,
                                tintColor: 'gray',
                              }}
                              source={require('../../assets/TableA.png')}
                            />
                          ) : null}
                        </TouchableOpacity>
                      );
                    }}
                    vertical
                  />
                </View>
                {/* Table F */}
                <View
                  style={{
                    top: 20,
                    left: 30,
                    zIndex: 100,
                    flex: 1,
                    alignItems: 'center',
                    position: 'absolute',
                    padding: 5,
                  }}>
                  <FlatList
                    data={table6}
                    renderItem={({item, index}) => {
                      return (
                        <TouchableOpacity style={{padding: 5}} disabled={true}>
                          {item.empty == false && item.booked == true ? (
                            <Image
                              style={{
                                width: 100,
                                height: 100,
                                transform: [{rotate: '270deg'}],
                                tintColor: 'gray',
                              }}
                              source={require('../../assets/TableF.png')}
                            />
                          ) : item.empty == true && item.booked == false ? (
                            <Image
                              style={{
                                width: 100,
                                height: 100,
                                transform: [{rotate: '270deg'}],
                                tintColor: 'gray',
                              }}
                              source={require('../../assets/TableF.png')}
                            />
                          ) : item.empty == false && item.booked == false ? (
                            <Image
                              style={{
                                width: 100,
                                height: 100,
                                tintColor: 'gray',
                                transform: [{rotate: '270deg'}],
                              }}
                              source={require('../../assets/TableF.png')}
                            />
                          ) : null}
                        </TouchableOpacity>
                      );
                    }}
                    vertical
                  />
                </View>
                {/* Table G */}
                <View
                  style={{
                    top: 250,
                    left: 190,
                    zIndex: 100,
                    flex: 1,
                    alignItems: 'center',
                    position: 'absolute',
                    padding: 5,
                  }}>
                  <FlatList
                    data={table7}
                    horizontal
                    renderItem={({item, index}) => {
                      return (
                        <TouchableOpacity style={{padding: 5}} disabled={true}>
                          {item.empty == false && item.booked == true ? (
                            <Image
                              style={{
                                width: 30,
                                height: 30,
                                tintColor: 'gray',
                              }}
                              source={require('../../assets/TableD.png')}
                            />
                          ) : item.empty == true && item.booked == false ? (
                            <Image
                              style={{
                                width: 30,
                                height: 30,
                                tintColor: 'gray',
                              }}
                              source={require('../../assets/TableD.png')}
                            />
                          ) : item.empty == false && item.booked == false ? (
                            <Image
                              style={{
                                width: 40,
                                height: 40,
                                tintColor: 'gray',
                                resizeMode: 'contain',
                              }}
                              source={require('../../assets/TableB.png')}
                            />
                          ) : null}
                        </TouchableOpacity>
                      );
                    }}
                    vertical
                  />
                </View>
              </View>

              {/* Date/Time and Proceed Container */}

              {/* <View style={styles.BottomContainer}> */}
              <Animatable.View
                useNativeDriver
                animation="fadeInUp"
                style={
                  Open
                    ? styles.ProceedBtnContainerOpen
                    : styles.ProceedBtnContainer
                }>
                <TouchableOpacity
                  style={{padding: 10, marginBottom:20}}
                  onPress={() => setOpen(Open => !Open)}>
                  <Up
                    size={25}
                    name={Open ? 'down' : 'up'}
                    color={Open ? 'white' : 'rgba(137, 252, 233, 1)'}
                  />
                </TouchableOpacity>
                <View style={{paddingVertical: 10, zIndex: 9999}}>
                  {/* Date & Time Component for Conference Booking */}
                  <Date_Time_Conf />
                </View>

                {/* Proceed Button*/}
                {getAllSeats() && seatsprices ? (
                  <Animatable.View
                    animation="fadeInUp"
                    style={styles.ProceedBtn}>
                    <TouchableOpacity
                      disabled={getAllSeats() ? false : true}
                      onPress={() => confirmseat()}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                          }}>
                          <View>
                            <Text style={{color: 'black', padding: 5}}>
                              Seat Number
                            </Text>
                          </View>
                          <View>
                            {getAllSeats() ? (
                              <Text style={styles.seatidtext}>
                                {getAllSeats()}
                              </Text>
                            ) : (
                              <Text
                                style={{
                                  fontSize: 15,
                                  fontWeight: '200',
                                  color: 'black',
                                  padding: 5,
                                }}>
                                No Seats
                              </Text>
                            )}
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <View>
                            <Cart
                              color="black"
                              name="shoppingcart"
                              size={30}
                              style={{marginRight: 20, marginLeft: 20}}
                            />
                          </View>
                          <View>
                            {seatsprices ? (
                              <Text style={{color: 'black', fontSize: 20}}>
                                {seatsprices.toLocaleString('en-IN', {
                                  style: 'currency',
                                  currency: 'INR',
                                })}
                              </Text>
                            ) : (
                              <></>
                            )}
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </Animatable.View>
                ) : (
                  <></>
                )}
              </Animatable.View>
              {/* </View> */}
            </Animatable.View>
          </SafeAreaView>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
const styles = StyleSheet.create({
  // BottomContainer: {
  //   top: height / 2.6,
  //   zIndex: 9999,
  //   flex: 3,
  // },
  ProceedBtnContainer: {
    top: height / 1.6,
    zIndex: 9999,
    flex: 3,
    borderRadius: 40,
    paddingHorizontal: 20,
    marginHorizontal: -10,
    backgroundColor: 'black',
    alignItems: 'center',
    flexDirection: 'column',
  },
  ProceedBtnContainerOpen: {
    top: height / 2.4,
    zIndex: 9999,
    flex: 3,
    flexDirection: 'column',
    borderRadius: 40,
    paddingHorizontal: 20,
    marginHorizontal: -10,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  // ProceedBtnContainer: {
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   backgroundColor: 'black',
  //   borderRadius: 40,
  //   paddingHorizontal: 20,
  //   marginHorizontal: -10,
  //   height: '100%',
  // },
  seatidtext: {
    fontSize: responsiveScreenFontSize(2.5),
    color: 'black',
    padding: 5,
    fontSize: 16,
  },
  ProceedBtn: {
    width: '90%',
    backgroundColor: 'rgba(137, 252, 233, 1)',
    paddingHorizontal: 15,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  header: {
    position: 'relative',
  },
  footer: {
    flex: 1,
    backgroundColor: '#181818',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  logo: {
    width: responsiveWidth(60),
    height: responsiveHeight(10),
    tintColor: 'white',
    resizeMode: 'contain',
  },
  title: {
    color: 'black',
    alignSelf: 'center',
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
  },
  text: {
    color: 'black',
    alignSelf: 'center',
    fontSize: responsiveFontSize(2),
    marginTop: responsiveHeight(0.5),
  },
  button: {
    alignItems: 'center',
    marginTop: responsiveHeight(2),
  },
  buttonbtn: {
    backgroundColor: 'black',
    width: responsiveWidth(50),
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: responsiveFontSize(2),
  },
});
