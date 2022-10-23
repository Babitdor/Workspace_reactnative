import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Cart from 'react-native-vector-icons/AntDesign';
import Seat from 'react-native-vector-icons/AntDesign';
// import database from '../../../jsons/Database.json'
import {Dimensions} from 'react-native';
import {firebase} from '@react-native-firebase/database';
import SeatIndicator from './SeatIndicator';
import * as Animatable from 'react-native-animatable';
const Duration = 400;

const reference = firebase
  .app()
  .database(
    'https://workspace-booking-392c3-default-rtdb.asia-southeast1.firebasedatabase.app/',
  )
  .ref('/Data/Tables/')
  .on('value', snapshot => {
    database = snapshot.val();
  });

let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('screen').width;
let seatsprices = 0;
let selectedseats = [];
let selectedseatsid = [];
export default function BookMySeat({navigation}) {
  const [table1, setTable1] = useState(database[0].seats);
  const [table2, setTable2] = useState(database[1].seats);
  const [table3, setTable3] = useState(database[2].seats);
  const [table4, setTable4] = useState(database[3].seats);
  const [table5, setTable5] = useState(database[4].seats);
  const [table6, setTable6] = useState(database[5].seats);

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
  const getAllSeats = () => {
    selectedseats = [];
    selectedseatsid = [];
    seatsprices = 0;
    table1.map(item => {
      if (item.booked == true) {
        selectedseats.push(1);
        selectedseatsid.push(item.id);
        seatsprices += database[0].price;
      }
    });
    table2.map(item => {
      if (item.booked == true) {
        selectedseats.push(1);
        selectedseatsid.push(item.id);
        seatsprices += database[1].price;
      }
    });
    table3.map(item => {
      if (item.booked == true) {
        selectedseats.push(1);
        selectedseatsid.push(item.id);
        seatsprices += database[2].price;
      }
    });
    table4.map(item => {
      if (item.booked == true) {
        selectedseats.push(1);
        selectedseatsid.push(item.id);
        seatsprices += database[3].price;
      }
    });
    table5.map(item => {
      if (item.booked == true) {
        selectedseats.push(1);
        selectedseatsid.push(item.id);
        seatsprices += database[4].price;
      }
    });
    table6.map(item => {
      if (item.booked == true) {
        selectedseats.push(1);
        selectedseatsid.push(item.id);
        seatsprices += database[5].price;
      }
    });
    return selectedseatsid + '';
  };

  return (
    <View style={{flex: 1}}>
      <Animatable.View
        animation="fadeInUp"
        delay={400}
        useNativeDriver={true}
        style={{zIndex: 99, position: 'relative', top: 0, flex: 2}}>
        <SeatIndicator navigation={navigation} />
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            flex: 3,
            justifyContent: 'space-evenly',
            marginBottom: 20,
          }}>
          <Text style={{fontSize: 20, color: 'white', fontWeight: '600'}}>
            Selected Seats
          </Text>
          <Text style={{fontSize: 20, color: 'red'}}>{getAllSeats()}</Text>
        </View>
      </Animatable.View>

      <Animatable.View
        useNativeDriver={true}
        animation="fadeInUpBig"
        delay={500}
        style={{
          flex: 2,
          flexDirection: 'column',
          borderRadius: 30,
          backgroundColor: '#E4E6EB',
          width: ScreenWidth,
          position: 'relative',
          height: ScreenHeight,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.37,
          shadowRadius: 7.49,
          elevation: 12,
        }}>
        <View
          style={{
            borderRadius: 30,
            position: 'absolute',
            width: ScreenWidth,
          }}>
          {/* TABLE A */}
          <View
            style={{
              top: 170,
              width: 100,
              left: 30,
              zIndex: 10,
              width: '35%',
              alignItems: 'center',
              position: 'absolute',
              flex: 1,
            }}>
            <Text style={{fontWeight: 'bold'}}>Table A</Text>
            <FlatList
              data={table1}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={{padding: 5}}
                    disable={false}
                    onPress={() => {
                      if (item.booked == false && item.empty == false) {
                        alert(item.id + ' is already Booked');
                      } else {
                        onSelectRow1(index);
                      }
                    }}>
                    {item.empty == false && item.booked == true ? (
                      <Image
                        style={{
                          width: 50,
                          height: 50,
                          transform: [{rotate: '270deg'}],
                          tintColor: 'rgba(255, 0, 0, 0.5)',
                        }}
                        source={require('../../assets/TableA.png')}
                      />
                    ) : item.empty == true && item.booked == false ? (
                      <Image
                        style={{
                          width: 50,
                          height: 50,
                          transform: [{rotate: '270deg'}],
                        }}
                        source={require('../../assets/TableA.png')}
                      />
                    ) : item.empty == false && item.booked == false ? (
                      <Image
                        style={{
                          width: 50,
                          height: 50,
                          transform: [{rotate: '270deg'}],
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
              top: 250,
              left: 15,
              zIndex: 10,
              flex: 1,
              alignItems: 'center',
              position: 'absolute',
            }}>
            <Text style={{fontWeight: 'bold'}}>Table B</Text>
            <FlatList
              data={table2}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={{padding: 5}}
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
                          width: 50,
                          height: 50,
                          tintColor: 'rgba(255, 0, 0, 0.5)',
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
                          width: 40,
                          height: 40,
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
          {/* TABLE C */}
          <View
            style={{
              top: 150,
              left: 220,
              zIndex: 10,
              flex: 1,
              position: 'absolute',
            }}>
            <Text style={{position: 'absolute', fontWeight: 'bold'}}>
              Table C
            </Text>
            <FlatList
              style={{position: 'relative', transform: [{rotate: '270deg'}]}}
              data={table3}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={{padding: 2}}
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
                        tintColor: 'rgba(255, 0, 0, 0.5)',
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
              top: 35,
              right: 170,
              zIndex: 10,
              flex: 1,
              alignItems: 'center',
              position: 'absolute',
            }}>
            <Text style={{fontWeight: 'bold'}}>Table D</Text>
            <FlatList
              data={table4}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={{padding: 3}}
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
                          tintColor: 'rgba(255, 0, 0, 0.5)',
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
              top: 120,
              right: 30,
              zIndex: 10,
              flex: 1,
              position: 'absolute',
            }}>
            <Text style={{fontWeight: 'bold'}}>Table E</Text>
            <FlatList
              data={table5}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={{padding: 2}}
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
                          tintColor: 'rgba(255, 0, 0, 0.5)',
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
                          width: 40,
                          height: 40,
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
              left: 35,
              zIndex: 10,
              flex: 1,
              alignItems: 'center',
              position: 'absolute',
              padding: 5,
            }}>
            <Text style={{fontWeight: 'bold'}}>Table F</Text>
            <FlatList
              data={table6}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={{padding: 5}}
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
                          tintColor: 'rgba(255, 0, 0, 0.5)',
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
        </View>

        <View
          style={{
            top: '80%',
            padding: 10,
            flex: 3,
          }}>
          {selectedseats.length != 0 ? (
            <Animatable.View animation="fadeInUp">
              <TouchableOpacity
                style={{
                  borderRadius: 20,
                  backgroundColor: 'black',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  padding: 20,
                  width: '100%',
                }}
                onPress={() =>
                  navigation.navigate('TableBook', {
                    totalseat: selectedseats.length,
                    seatid: selectedseatsid,
                    tprice: seatsprices,
                  })
                }>
                <Text style={{color: 'white', fontSize: 20, marginRight: 30}}>
                  Proceed
                </Text>
                <Cart
                  color="white"
                  name="shoppingcart"
                  size={30}
                  style={{marginRight: 30}}
                />
                <Text style={{color: 'white', fontSize: 20}}>
                  {seatsprices.toLocaleString('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                  })}
                </Text>
              </TouchableOpacity>
            </Animatable.View>
          ) : (
            <Animatable.View animation="fadeOutDown">
              <TouchableOpacity
                style={{
                  borderRadius: 20,
                  backgroundColor: 'black',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  padding: 20,
                  width: '100%',
                }}>
                <Text style={{color: 'white', fontSize: 20, marginRight: 30}}>
                  Proceed
                </Text>
                <Cart
                  color="white"
                  name="shoppingcart"
                  size={30}
                  style={{marginRight: 30}}
                />
                <Text style={{color: 'white', fontSize: 20}}>
                  {seatsprices.toLocaleString('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                  })}
                </Text>
              </TouchableOpacity>
            </Animatable.View>
          )}
        </View>
      </Animatable.View>
    </View>
  );
}
