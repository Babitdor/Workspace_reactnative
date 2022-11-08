import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  FlatList,
  StyleSheet,
} from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export default function TableInfo(props) {
  return (
    <View style={{height: windowHeight}}>
      <Animatable.View style={{flex: 1}} animation="fadeInUp">
        <TableImage image={props.database.image} />
      </Animatable.View>

      <Animatable.View
        animation="fadeInUpBig"
        style={{
          width: '100%',
          flex: 2.5,
          height: '100%',
          transform: [{translateY: windowHeight / 4}],
          backgroundColor: 'black',
          borderRadius: 32,
          padding: 30,
        }}>
        <TableNo title={props.database.title} />
        <TableDescription description={props.database.description} />
        <View
          style={[
            styles.header,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
            },
          ]}>
          <View>
            <Text style={styles.text_header}>Price:</Text>
          </View>
          <View>
            <Text
              style={[
                styles.text_header,
                {color: 'rgba(137, 252, 233, 1)', fontSize: 25},
              ]}>
              ₹{props.database.price}
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.header}>
            <Text style={styles.text_header}>Perks & Bonus</Text>
          </View>
        </View>
        <View style={{backgroundColor: 'black', padding: 10}}>
          <FlatList
            data={props.database.perks}
            renderItem={({item, index}) => {
              return (
                <View style={{paddingVertical: 8, flexDirection:'row',alignItems:'center'}}>
                  <View>
                    <Icon name="checkmark-circle-outline" size={30} color={'rgba(137, 252, 233, 1)'}/>
                  </View>
                  <View>
                    <Text
                      key={index}
                      style={[
                        styles.text_subtext,
                        {color: 'rgba(137, 252, 233, 1)'},
                      ]}>
                      {item}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </Animatable.View>
    </View>
  );
}

const TableImage = props => (
  <ImageBackground
    source={{uri: props.image}}
    style={{width: '100%', height: 320, resizeMode: 'contain'}}
  />
);

const TableNo = props => (
  <Text
    style={{
      fontSize: 25,
      fontWeight: '600',
      marginTop: 10,
      color: 'white',
      marginHorizontal: 15,
    }}>
    {props.title}
  </Text>
);

const TableDescription = props => (
  <Text
    style={[
      styles.text_subtext,
      {padding: 10, color: 'rgba(137, 252, 233, 1)'},
    ]}>
    {props.description}
  </Text>
);

const styles = StyleSheet.create({
  header: {
    borderColor: 'white',
    backgroundColor: 'black',
    borderRadius: 5,
    borderBottomWidth: 1,
    padding: 10,
  },
  text_header: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginHorizontal: 5,
  },
  text_subtext: {
    fontSize: 18,
    paddingVertical: 10,
    fontWeight: '600',
    color: 'white',
    marginHorizontal: 15,
  },
});
