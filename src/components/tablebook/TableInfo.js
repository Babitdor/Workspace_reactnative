import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, { useContext } from 'react';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageSlider from 'react-native-image-slider';
import { AuthContext } from '../../navigation/AuthProvider';
const windowHeight = Dimensions.get('window').height;
export default function TableInfo(props) {
  const {isDarkMode} = useContext(AuthContext);
  return (
    <View style={{height: windowHeight}}>
      <Animatable.View style={{flex: 1}} animation="fadeInUp">
        <TableImage image={props.database.image} />
      </Animatable.View>

      <Animatable.View
        animation="fadeInUpBig"
        style={{
          width: '100%',
          flex: 2,
          height: '100%',
          transform: [{translateY: windowHeight / 4}],
          backgroundColor: isDarkMode?'black':'white',
          padding: 30,
        }}>
        <TableNo title={props.database.title} DarkMode={isDarkMode} />
        <TableDescription description={props.database.description} DarkMode={isDarkMode}/>
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
        <View style={{backgroundColor: isDarkMode?'black':'#EEEEEE', padding: 10}}>
          <FlatList
            data={props.database.perks}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    paddingVertical: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Icon
                      name="checkmark-circle-outline"
                      size={30}
                      color={isDarkMode? 'rgba(137, 252, 233, 1)':'gray'}
                    />
                  </View>
                  <View>
                    <Text
                      key={index}
                      style={[
                        styles.text_subtext,
                        {color: isDarkMode? 'rgba(137, 252, 233, 1)':'gray'},
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

const TableImage = props => <ImageSlider images={props.image} />;

const TableNo = props => (
  <Text
    style={{
      fontSize: 25,
      fontWeight: '600',
      marginTop: 10,
      color: props.DarkMode?'white':'black',
      marginHorizontal: 15,
    }}>
    {props.title}
  </Text>
);

const TableDescription = props => (
  <Text
    style={[
      styles.text_subtext,
      {color: props.DarkMode? 'rgba(137, 252, 233, 1)':'gray'},
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
    fontSize: 17,
    paddingVertical: 10,
    fontWeight: '600',
    color: 'white',
    marginHorizontal: 15,
  },
});
