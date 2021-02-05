import React from 'react';
import {Text} from 'react-native';
import {StyleSheet, View, Image} from 'react-native';
import {Button, IconButton} from 'react-native-paper';
import Scaffold from '../../components/baseComponents/Scaffold';
import ListActions from '../../components/ListActions';

export default function CulturalAssetDetailScreen({navigation, route}) {
  const goMap = () => navigation.push('CulturalAssetMapScreen');
  const goAssetGroup = () => console.log('Go to AssetGroup');
  const deleteAsset = () => console.log('Deleted Asset');
  const goCreation = () => console.log('Edited Asset');
  const goMedia = () => console.log('Go to MediaList');
  const goComments = () => console.log('Go to CommentList');

  return (
    <Scaffold>
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
          <Button color="#535353" icon="apps" onPress={goAssetGroup}>
            Louvre
          </Button>
        </Text>
        <ListActions>
          <IconButton
            color="#535353"
            icon="circle-edit-outline"
            onPress={goCreation}
          />
          <IconButton
            color="#535353"
            icon="trash-can-outline"
            onPress={deleteAsset}
          />
        </ListActions>
        <View
          style={styles.randomView} //give proper name
        />
        <Text style={styles.subtitle}>Informationen:</Text>
        <Text style={styles.text}>
          Mona Lisa ist ein weltberühmtes Ölgemälde von Leonardo da Vinci aus
          der Hochphase der italienischen Renaissance Anfang des 16.
          Jahrhunderts.
        </Text>
        <View style={styles.mediaBox}>
          <Text style={styles.mediaText}>Weitere Medien anzeigen ... </Text>
          <Button
            color="#919191"
            icon="arrow-right"
            onPress={goMedia}
            style={styles.mediaButton}
          />
        </View>
        <View style={styles.randomView} />
        <View style={styles.center}>
          <Button style={styles.box} onPress={goComments}>
            {' '}
            <Text style={styles.commentText}>
              Weiter zu den Kommentaren
            </Text>{' '}
          </Button>
        </View>
      </View>
    </Scaffold>
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
  logo: {marginTop: 80, width: '100%'},
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
  randomView: {
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    marginLeft: 20,
    marginRight: 20,
  },
  mediaBox: {
    flexDirection: 'row',
    marginTop: 40,
  },
  mediaText: {
    color: '#919191',
    marginLeft: 20,
  },
  mediaButton: {
    marginTop: -8,
  },
  commentText: {
    color: '#000',
    fontSize: 13,
  },
});
