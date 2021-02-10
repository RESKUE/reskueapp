import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Divider,
  IconButton,
  Title,
  Paragraph,
  useTheme,
} from 'react-native-paper';
//import {FancyList} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import ListActions from '../../components/ListActions';
import FloatingWhiteButton from '../../components/FloatingWhiteButton';
import CulturalAsset from '../../models/CulturalAsset';
import useAllAssets from '../../handlers/AllAssetsHook';

export default function CulturalAssetDetailScreen({navigation, route}) {
  const [isLoading, setIsLoading] = React.useState(true);

  const [culturalAsset, setCulturalAsset] = React.useState();

  const {colors} = useTheme();
  const {requestAllAssets, result} = useAllAssets();

  const routeAssetId = route.params.id;
  React.useEffect(() => {
    console.log(result.source, 'response received');
    if (result.source === 'cache') {
      setIsLoading(false);
      setCulturalAsset(
        new CulturalAsset(
          result?.data.find((asset) => asset.id === routeAssetId),
        ),
      );
    }
  }, [result, routeAssetId]);

  React.useEffect(() => {
    requestAllAssets();
  }, [requestAllAssets]);

  const goMap = () => navigation.push('CulturalAssetMapScreen');
  const goAssetGroup = () => console.log('Go to AssetGroup');
  const deleteAsset = () => console.log('Deleted Asset');
  const goCreation = () => console.log('Edited Asset');
  const goMedia = () => console.log('Go to MediaList');
  const goComments = () => console.log('Go to CommentList');

  return (
    <Scaffold>
      {isLoading ? (
        <ActivityIndicator animating={true} color={colors.primary} />
      ) : (
        <>
          <Image
            style={styles.image}
            source={require('../../assets/MonaLisa.jpg')}
          />
          <Title style={styles.title}>{culturalAsset.data.name}</Title>
          <View style={styles.buttonContainer}>
            <Button
              color={GRAY_COLOR_CODE}
              icon="map-marker"
              onPress={goMap}
              style={styles.bold}>
              Location
            </Button>
            <Button
              color={GRAY_COLOR_CODE}
              icon="apps"
              onPress={goAssetGroup}
              style={styles.bold}>
              Louvre
            </Button>
          </View>
          <ListActions>
            <IconButton
              color={GRAY_COLOR_CODE}
              icon="circle-edit-outline"
              onPress={goCreation}
            />
            <IconButton
              color={GRAY_COLOR_CODE}
              icon="trash-can-outline"
              onPress={deleteAsset}
            />
          </ListActions>
          <Divider style={styles.divider} />
          <View style={styles.descriptionContainer}>
            <Title style={styles.bold}>Beschreibung:</Title>
            <Paragraph>
              Mona Lisa ist ein weltberühmtes Ölgemälde von Leonardo da Vinci
              aus der Hochphase der italienischen Renaissance Anfang des 16.
              Jahrhunderts.
            </Paragraph>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.center}>
            <FloatingWhiteButton
              onPress={goMedia}
              content="Weiter zu den Medien"
            />
            <FloatingWhiteButton
              onPress={goComments}
              content="Weiter zu den Kommentaren"
            />
          </View>
        </>
      )}
    </Scaffold>
  );
}

const GRAY_COLOR_CODE = '#535353';

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: -8,
  },
  bold: {
    fontWeight: 'bold',
  },
  divider: {
    backgroundColor: 'black',
    marginHorizontal: 15,
  },
  descriptionContainer: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
