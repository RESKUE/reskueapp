import React from 'react';
import {Text} from 'react-native';
import {StyleSheet, View, Image} from 'react-native';
import {culturalAssetData} from '../../../testdata';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';

export default function CulturalAssetDetailScreen({navigation, route}) {
  const goMap = () =>
    navigation.reset({
      index: 0,
      routes: [{name: 'CulturalAssetMapScreen'}],
    });

  return (
    <View>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={require('../../assets/MonaLisa.jpg')}
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.title}> Mona Lisa </Text>
        <Text style={styles.buttons}>
          <Button color="#535353" icon="map-marker" onPress={goMap}>
            Location
          </Button>
          <Button color="#535353" icon="apps">
            Louvre
          </Button>
        </Text>
        <View style={{flexDirection: 'row-reverse', marginTop: -20}}>
          <Button color="#535353" icon="circle-edit-outline"></Button>
          <Button
            color="#535353"
            icon="trash-can-outline"
            style={{position: 'absolute', marginRight: 20}}></Button>
        </View>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 0.5,
            marginLeft: 20,
            marginRight: 20,
          }}
        />
        <Text style={styles.subtitle}>Informationen:</Text>
        <Text style={styles.text}>
          Mona Lisa ist ein weltberühmtes Ölgemälde von Leonardo da Vinci aus
          der Hochphase der italienischen Renaissance Anfang des 16.
          Jahrhunderts.
        </Text>
        <View style={{flexDirection: 'row', marginTop: 40}}>
          <Text style={{color: '#919191', marginLeft: 20}}>
            Weitere Medien anzeigen ...{' '}
          </Text>
          <Button
            color="#919191"
            icon="arrow-right"
            style={{marginTop: -8}}></Button>
        </View>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 0.5,
            marginLeft: 20,
            marginRight: 20,
          }}
        />
        <View style={styles.center}>
          <Button style={styles.box}>
            {' '}
            <Text style={{color: '#000', fontSize: 13}}>
              Weiter zu den Kommentaren
            </Text>{' '}
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {height: '35%', justifyContent: 'center', alignItems: 'center'},
  footer: {height: '65%', backgroundColor: '#FFFFFF', bottom: 0},

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10,
    letterSpacing: 5,
  },
  buttons: {fontSize: 14, fontWeight: 'bold', marginLeft: 10, marginTop: -8},
  subtitle: {fontSize: 18, fontWeight: 'bold', marginLeft: 20, marginTop: 5},
  text: {fontSize: 14, marginLeft: 20, marginRight: 20, marginTop: 5},
  logo: {marginTop: 300, width: '100%'},
  center: {
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: '80%',
    height: 50,
    borderRadius: 20,
    marginTop: 30,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
  },
});
