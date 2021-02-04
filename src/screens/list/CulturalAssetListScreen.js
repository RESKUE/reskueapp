import React from 'react';
import {Text, Button, View} from 'react-native-paper';
import Scaffold from '../../components/baseComponents/Scaffold';
import {AuthContext} from '@ilt-pse/react-native-kueres';
import {StyleSheet} from 'react-native';

export default function CulturalAssetListScreen({navigation}) {
  const {authService} = React.useContext(AuthContext);

  const goDetails = () =>
    navigation.push('CulturalAssetDetailScreen', {id: 42});
  const goCreation = () =>
    navigation.navigate('StackScreens', {
      screen: 'CulturalAssetCreationScreen',
    });

  return (
    <Scaffold
      navigation={navigation}
      content={
        <>
          <Text style={{color: '#168A60', marginLeft: 25}}>
            Cultural Asset List Screen
          </Text>
          <Button style={styles.buttonTop} mode="contained" onPress={goDetails}>
            <Text style={{color: '#000'}}>Go to details</Text>
          </Button>
          <Button
            style={styles.buttonBottom}
            mode="contained"
            onPress={goCreation}>
            <Text style={{color: '#000'}}>Create a new cultural asset</Text>
          </Button>
          <Button onPress={() => authService.logout()}>Logout</Button>
        </>
      }
    />

    //</Scaffold>
  );
}

const culturalAssetData = [
  {
    id: 0,
    name: 'Louvre',
    description: 'Museum in Paris',
    tags: [],
    comments: [{}],
    media: [{}],
    label: '',
    longitude: 32.0,
    latitude: 32.0,
    level: 1,
    parent: {},
    children: [{id: 1}, {id: 2}],
    tasks: [{}],
  },
  {
    id: 1,
    name: 'Mona Lisa',
    description: 'Gemälde von Leonardo da Vinci',
    tags: ['special', 'very important'],
    comments: [{}],
    media: [{}],
    label: 'Muss vor Wasser geschützt werden',
    longitude: 32.0,
    latitude: 32.0,
    level: 0,
    parent: {id: 0},
    children: [{}],
    tasks: [{}],
  },
  {
    id: 2,
    name: 'Sitzender Schreiber',
    description: 'Kalksteinstatue im Louvre',
    tags: [],
    comments: [{}],
    media: [{}],
    label: '',
    longitude: 32.0,
    latitude: 32.0,
    level: 0,
    parent: {id: 0},
    children: [{}],
    tasks: [{}],
  },
  {
    id: 3,
    name: 'Die Erschaffung Adams',
    description: 'Deckenfresko in der Sixtinischen Kapelle',
    tags: ['important'],
    comments: [{}],
    media: [{}],
    label: '',
    longitude: 20.0,
    latitude: 55.0,
    level: 0,
    parent: {},
    children: [{}],
    tasks: [{}],
  },
];

const styles = StyleSheet.create({
  buttonTop: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderWidth: 6 / 10,
    borderColor: '#168A60',
    marginLeft: 20,
    marginRight: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  buttonBottom: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderWidth: 6 / 10,
    borderColor: '#168A60',
    marginLeft: 20,
    marginRight: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
