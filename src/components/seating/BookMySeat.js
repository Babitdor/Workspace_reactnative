import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, {useState, useEffect, useRef, useContext} from 'react';
import Loading from '../home/Loading';
import Cart from 'react-native-vector-icons/AntDesign';
import {Dimensions} from 'react-native';
import SeatIndicator from './SeatIndicator';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import {firebase} from '@react-native-firebase/database';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import {AuthContext} from '../../navigation/AuthProvider';
import Date_Time from './Date_time';

let seatsprices = 0;
let selectedseats = [];
let SeatSelectedStatus = [];
let selectedseatsid = [];
export default function BookMySeat(props) {
  const navigation = useNavigation();
  const [Table, setTable] = useState();
  const [table1, setTable1] = useState([]);
  const [table2, setTable2] = useState([]);
  const [table3, setTable3] = useState([]);
  const [table4, setTable4] = useState([]);
  const [table5, setTable5] = useState([]);
  const [table6, setTable6] = useState([]);
  const [table7, setTable7] = useState([]);
  const {SelectedSeats, setSeats} = useContext(AuthContext);
  const {isChanged, setChanged} = useContext(AuthContext);

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
      setTable1(snapshot.val()[0].seats);
      setTable2(snapshot.val()[1].seats);
      setTable3(snapshot.val()[2].seats);
      setTable4(snapshot.val()[3].seats);
      setTable5(snapshot.val()[4].seats);
      setTable6(snapshot.val()[5].seats);
      setTable7(snapshot.val()[6].seats);
    }
    FetchData();
  }, [isChanged]);
  const onSelectRow1 = index => {
    let tempRow = [];
    tempRow = table1;
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
    setTable1(tempSeats);
  };
  const onSelectRow2 = index => {
    let tempRow = [];
    tempRow = table2;
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
    setTable2(tempSeats);
  };
  const onSelectRow3 = index => {
    let tempRow = [];
    tempRow = table3;
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
    setTable3(tempSeats);
  };
  const onSelectRow4 = index => {
    let tempRow = [];
    tempRow = table4;
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
    setTable4(tempSeats);
  };
  const onSelectRow5 = index => {
    let tempRow = [];
    tempRow = table5;
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
    setTable5(tempSeats);
  };
  const onSelectRow6 = index => {
    let tempRow = [];
    tempRow = table6;
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
    setTable6(tempSeats);
  };
  const onSelectRow7 = index => {
    let tempRow = [];
    tempRow = table7;
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
    setTable7(tempSeats);
  };
  const getAllSeats = () => {
    selectedseats = [];
    SeatSelectedStatus = [];
    selectedseatsid = [];
    seatsprices = 0;
    table1.map((item, index) => {
      if (item.booked == true) {
        selectedseats.push(1);
        SeatSelectedStatus.push(item);
        selectedseatsid.push(item.id);
        seatsprices += props.database[0].price;
      }
    });
    table2.map(item => {
      if (item.booked == true) {
        selectedseats.push(1);
        SeatSelectedStatus.push(item);
        selectedseatsid.push(item.id);
        seatsprices += props.database[1].price;
      }
    });
    table3.map(item => {
      if (item.booked == true) {
        selectedseats.push(1);
        SeatSelectedStatus.push(item);
        selectedseatsid.push(item.id);
        seatsprices += props.database[2].price;
      }
    });
    table4.map(item => {
      if (item.booked == true) {
        selectedseats.push(1);
        SeatSelectedStatus.push(item);
        selectedseatsid.push(item.id);
        seatsprices += props.database[3].price;
      }
    });
    table5.map(item => {
      if (item.booked == true) {
        selectedseats.push(1);
        SeatSelectedStatus.push(item);
        selectedseatsid.push(item.id);
        seatsprices += props.database[4].price;
      }
    });
    table6.map(item => {
      if (item.booked == true) {
        selectedseats.push(1);
        SeatSelectedStatus.push(item);
        selectedseatsid.push(item.id);
        seatsprices += props.database[5].price;
      }
    });
    table7.map(item => {
      if (item.booked == true) {
        selectedseats.push(1);
        SeatSelectedStatus.push(item);
        selectedseatsid.push(item.id);
        seatsprices += props.database[6].price;
      }
    });
    return selectedseatsid + '';
  };
  const confirmseat = () => {
    setSeats(SeatSelectedStatus);
    setChanged(isChanged => !isChanged);
    navigation.navigate('TableBook', {
      seatselected: SeatSelectedStatus,
      seatid: selectedseatsid,
      tprice: seatsprices,
      Date_Time: props.data,
    });
  };

  return (
    <>
      {Table ? (
        <>
          <Animatable.View animation="fadeInUpBig" delay={400}>
            <SeatIndicator />
          </Animatable.View>
          <SafeAreaView style={styles.container}>
            <Animatable.View
              animation="fadeInUpBig"
              delay={100}
              style={styles.footer}>
              <View
                style={{
                  width: '100%',
                  position: 'relative',
                }}>
                {/* TABLE A */}
                <View
                  style={{
                    top: 200,
                    left: 30,
                    zIndex: 100,
                    alignItems: 'center',
                    position: 'absolute',
                    flex: 1,
                  }}>
                  <TouchableOpacity
                    style={{
                      borderRadius: 5,
                      marginBottom: 15,
                      borderColor: 'white',
                      borderWidth: 2,
                      padding: 8,
                    }}
                    onPress={() => {
                      navigation.navigate('TableDescription', {
                        Table: props.database[0],
                      });
                    }}>
                    <Text style={{fontWeight: 'bold', color: 'white'}}>
                      Table A
                    </Text>
                  </TouchableOpacity>
                  <FlatList
                    data={table1}
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
                            } else {
                              onSelectRow1(index);
                            }
                          }}>
                          {item.empty == false && item.booked == true ? (
                            <Image
                              style={{
                                width: 50,
                                height: 40,
                                transform: [{rotate: '270deg'}],
                                tintColor: 'rgba(137, 252, 233, 1)',
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
                                tintColor: 'rgba(147, 147, 147, 0.53)',
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
                    top: 320,
                    left: 15,
                    zIndex: 100,
                    flex: 1,
                    alignItems: 'center',
                    position: 'absolute',
                  }}>
                  <TouchableOpacity
                    style={{
                      borderRadius: 5,
                      borderColor: 'white',
                      borderWidth: 2,
                      padding: 8,
                      marginBottom: 10,
                    }}
                    onPress={() => {
                      navigation.navigate('TableDescription', {
                        Table: props.database[1],
                      });
                    }}>
                    <Text style={{fontWeight: 'bold', color: 'white'}}>
                      Table B
                    </Text>
                  </TouchableOpacity>
                  <FlatList
                    data={table2}
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
                              onSelectRow2(index);
                            }
                          }}>
                          {item.empty == false && item.booked == true ? (
                            <Image
                              style={{
                                width: 40,
                                height: 40,
                                resizeMode: 'contain',
                                tintColor: 'rgba(137, 252, 233, 1)',
                              }}
                              source={require('../../assets/TableB.png')}
                            />
                          ) : item.empty == true && item.booked == false ? (
                            <Image
                              style={{
                                width: 40,
                                height: 40,
                                resizeMode: 'contain',
                              }}
                              source={require('../../assets/TableB.png')}
                            />
                          ) : item.empty == false && item.booked == false ? (
                            <Image
                              style={{
                                width: 40,
                                height: 40,
                                tintColor: 'rgba(147, 147, 147, 0.53)',
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
                {/* TABLE C */}
                <View
                  style={{
                    top: 160,
                    left: 220,
                    zIndex: 100,
                    flex: 1,
                    position: 'absolute',
                  }}>
                  <TouchableOpacity
                    style={{
                      borderRadius: 5,
                      borderColor: 'white',
                      borderWidth: 2,
                      padding: 8,
                    }}
                    onPress={() => {
                      navigation.navigate('TableDescription', {
                        Table: props.database[2],
                      });
                    }}>
                    <Text style={{fontWeight: 'bold', color: 'white'}}>
                      Table C
                    </Text>
                  </TouchableOpacity>
                  <FlatList
                    style={{
                      position: 'relative',
                      transform: [{rotate: '270deg'}],
                    }}
                    data={table3}
                    renderItem={({item, index}) => {
                      return (
                        <TouchableOpacity
                          style={{padding: 2}}
                          disabled={
                            item.booked == false && item.empty == false
                              ? true
                              : false
                          }
                          onPress={() => {
                            if (item.booked == false && item.empty == false) {
                              alert(item.id + ' is already Booked');
                            } else {
                              onSelectRow3(index);
                            }
                          }}>
                          {item.empty == false && item.booked == true ? (
                            <Image
                              style={{
                                width: 30,
                                height: 30,
                                tintColor: 'rgba(137, 252, 233, 1)',
                                transform: [{rotate: '90deg'}],
                              }}
                              source={require('../../assets/TableD.png')}
                            />
                          ) : item.empty == true && item.booked == false ? (
                            <Image
                              style={{
                                width: 30,
                                height: 30,
                                transform: [{rotate: '90deg'}],
                              }}
                              source={require('../../assets/TableD.png')}
                            />
                          ) : item.empty == false && item.booked == false ? (
                            <Image
                              style={{
                                width: 30,
                                height: 30,
                                tintColor: 'rgba(147, 147, 147, 0.53)',
                                transform: [{rotate: '90deg'}],
                              }}
                              source={require('../../assets/TableD.png')}
                            />
                          ) : null}
                        </TouchableOpacity>
                      );
                    }}
                    numColumns={2}
                    vertical
                  />
                </View>
                {/* TABLE D */}
                <View
                  style={{
                    top: 25,
                    right: 140,
                    zIndex: 100,
                    flex: 1,
                    alignItems: 'center',
                    position: 'absolute',
                  }}>
                  <TouchableOpacity
                    style={{
                      borderRadius: 5,
                      borderColor: 'white',
                      borderWidth: 2,
                      padding: 8,
                      marginBottom: 10,
                    }}
                    onPress={() => {
                      navigation.navigate('TableDescription', {
                        Table: props.database[3],
                      });
                    }}>
                    <Text style={{fontWeight: 'bold', color: 'white'}}>
                      Table D
                    </Text>
                  </TouchableOpacity>
                  <FlatList
                    data={table4}
                    renderItem={({item, index}) => {
                      return (
                        <TouchableOpacity
                          style={{padding: 3}}
                          disabled={
                            item.booked == false && item.empty == false
                              ? true
                              : false
                          }
                          onPress={() => {
                            if (item.booked == false && item.empty == false) {
                              alert(item.id + ' is already Booked');
                            } else {
                              onSelectRow4(index);
                            }
                          }}>
                          {item.empty == false && item.booked == true ? (
                            <Image
                              style={{
                                width: 30,
                                height: 30,
                                tintColor: 'rgba(137, 252, 233, 1)',
                              }}
                              source={require('../../assets/TableD.png')}
                            />
                          ) : item.empty == true && item.booked == false ? (
                            <Image
                              style={{
                                width: 30,
                                height: 30,
                              }}
                              source={require('../../assets/TableD.png')}
                            />
                          ) : item.empty == false && item.booked == false ? (
                            <Image
                              style={{
                                width: 30,
                                height: 30,
                                tintColor: 'rgba(147, 147, 147, 0.53)',
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
                    top: 100,
                    right: 20,
                    zIndex: 100,
                    flex: 1,
                    alignItems: 'center',
                    position: 'absolute',
                  }}>
                  <TouchableOpacity
                    style={{
                      borderRadius: 5,
                      borderColor: 'white',
                      borderWidth: 2,
                      marginBottom: 10,
                      padding: 8,
                    }}
                    onPress={() => {
                      navigation.navigate('TableDescription', {
                        Table: props.database[4],
                      });
                    }}>
                    <Text style={{fontWeight: 'bold', color: 'white'}}>
                      Table E
                    </Text>
                  </TouchableOpacity>
                  <FlatList
                    data={table5}
                    renderItem={({item, index}) => {
                      return (
                        <TouchableOpacity
                          style={{padding: 2}}
                          disabled={
                            item.booked == false && item.empty == false
                              ? true
                              : false
                          }
                          onPress={() => {
                            if (item.booked == false && item.empty == false) {
                              alert(item.id + ' is already Booked');
                            } else {
                              onSelectRow5(index);
                            }
                          }}>
                          {item.empty == false && item.booked == true ? (
                            <Image
                              style={{
                                width: 50,
                                height: 50,
                                tintColor: 'rgba(137, 252, 233, 1)',
                              }}
                              source={require('../../assets/TableB.png')}
                            />
                          ) : item.empty == true && item.booked == false ? (
                            <Image
                              style={{
                                width: 50,
                                height: 50,
                              }}
                              source={require('../../assets/TableB.png')}
                            />
                          ) : item.empty == false && item.booked == false ? (
                            <Image
                              style={{
                                width: 50,
                                height: 50,
                                tintColor: 'rgba(147, 147, 147, 0.53)',
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
                  <TouchableOpacity
                    style={{
                      borderRadius: 5,
                      borderColor: 'white',
                      borderWidth: 2,
                      marginBottom: 10,
                      padding: 8,
                    }}
                    onPress={() => {
                      navigation.navigate('TableDescription', {
                        Table: props.database[5],
                      });
                    }}>
                    <Text style={{fontWeight: 'bold', color: 'white'}}>
                      Table F
                    </Text>
                  </TouchableOpacity>
                  <FlatList
                    data={table6}
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
                              onSelectRow6(index);
                            }
                          }}>
                          {item.empty == false && item.booked == true ? (
                            <Image
                              style={{
                                width: 100,
                                height: 100,
                                transform: [{rotate: '270deg'}],
                                tintColor: 'rgba(137, 252, 233, 1)',
                              }}
                              source={require('../../assets/TableF.png')}
                            />
                          ) : item.empty == true && item.booked == false ? (
                            <Image
                              style={{
                                width: 100,
                                height: 100,
                                transform: [{rotate: '270deg'}],
                              }}
                              source={require('../../assets/TableF.png')}
                            />
                          ) : item.empty == false && item.booked == false ? (
                            <Image
                              style={{
                                width: 100,
                                height: 100,
                                tintColor: 'rgba(147, 147, 147, 0.53)',
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
                    top: 315,
                    left: 190,
                    zIndex: 100,
                    flex: 1,
                    alignItems: 'center',
                    position: 'absolute',
                    padding: 5,
                  }}>
                  <TouchableOpacity
                    style={{
                      borderRadius: 5,
                      borderColor: 'white',
                      borderWidth: 2,
                      marginBottom: 10,
                      padding: 8,
                    }}
                    onPress={() => {
                      navigation.navigate('TableDescription', {
                        Table: props.database[6],
                      });
                    }}>
                    <Text style={{fontWeight: 'bold', color: 'white'}}>
                      Table G
                    </Text>
                  </TouchableOpacity>
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
                                tintColor: 'white',
                              }}
                              source={require('../../assets/TableD.png')}
                            />
                          ) : item.empty == true && item.booked == false ? (
                            <Image
                              style={{
                                width: 30,
                                height: 30,
                                tintColor: 'white',
                              }}
                              source={require('../../assets/TableD.png')}
                            />
                          ) : item.empty == false && item.booked == false ? (
                            <Image
                              style={{
                                width: 40,
                                height: 40,
                                tintColor: 'white',
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

              <View
                style={{
                  top: '52%',
                  padding: 10,
                  zIndex: 9999,
                  flex: 3,
                }}>
                <Animatable.View
                  animation="fadeInUp"
                  delay={1000}
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'black',
                    borderRadius: 30,
                    padding: 15,
                    margin: -10,
                    height: '100%',
                  }}>
                  <View style={{paddingVertical: 10, zIndex: 9999}}>
                    {/* Slider Page Goes Here */}
                    <Date_Time />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '100%',
                      justifyContent: 'space-between',
                      paddingHorizontal: 15,
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                      }}>
                      <View>
                        <Text style={{color: 'white', padding: 5}}>
                          Seat Number
                        </Text>
                      </View>
                      <View>
                        {getAllSeats() ? (
                          <Text
                            style={{
                              fontSize: responsiveScreenFontSize(2.5),
                              color: 'white',
                              padding: 5,
                              fontSize: 16,
                            }}>
                            {getAllSeats()}
                          </Text>
                        ) : (
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: '200',
                              color: 'white',
                              padding: 5,
                            }}>
                            No Seats
                          </Text>
                        )}
                      </View>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View>
                        <Cart
                          color="white"
                          name="shoppingcart"
                          size={30}
                          style={{marginRight: 20, marginLeft: 20}}
                        />
                      </View>
                      <View>
                        {seatsprices ? (
                          <Text style={{color: 'white', fontSize: 20}}>
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

                  {getAllSeats() ? (
                    <Animatable.View
                      animation="fadeInUp"
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: 'rgba(137, 252, 233, 1)',
                        padding: 20,
                        marginTop: 30,
                        zIndex: 999,
                        marginBottom: 10,
                        borderRadius: 10,
                        width: '100%',
                      }}>
                      <TouchableOpacity
                        disabled={getAllSeats() ? false : true}
                        style={{
                          alignItems: 'center',

                          justifyContent: 'center',
                          width: '100%',
                        }}
                        onPress={() => confirmseat()}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 20,
                          }}>
                          Proceed
                        </Text>
                      </TouchableOpacity>
                    </Animatable.View>
                  ) : (
                    <Animatable.View
                      animation="fadeOutDown"
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: 'rgba(137, 252, 233, 1)',
                        padding: 20,
                        marginTop: 30,
                        zIndex: 999,
                        marginBottom: 10,
                        borderRadius: 10,
                        width: '100%',
                      }}>
                      <TouchableOpacity
                        disabled={true}
                        style={{
                          alignItems: 'center',

                          justifyContent: 'center',
                          width: '100%',
                        }}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 20,
                          }}>
                          Proceed
                        </Text>
                      </TouchableOpacity>
                    </Animatable.View>
                  )}
                </Animatable.View>
              </View>
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
