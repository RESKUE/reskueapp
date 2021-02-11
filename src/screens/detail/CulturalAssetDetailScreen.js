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
import {FancyList} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import CulturalAssetListItem from '../../components/listItems/CulturalAssetListItem';
import TaskListItem from '../../components/listItems/TaskListItem';
import ListActions from '../../components/ListActions';
import FloatingWhiteButton from '../../components/FloatingWhiteButton';
import CulturalAsset from '../../models/CulturalAsset';
import useAllAssets from '../../handlers/AllAssetsHook';
import useAllTasks from '../../handlers/AllTasksHook';

export default function CulturalAssetDetailScreen({navigation, route}) {
  const [culturalAsset, setCulturalAsset] = React.useState(null);
  const [parentAsset, setParentAsset] = React.useState(null);
  const [childrenAssets, setChildrenAssets] = React.useState(null);
  const [tasks, setTasks] = React.useState(null);

  const {colors} = useTheme();
  const {requestAllAssets, result: assetResult} = useAllAssets();
  const {requestAllTasks, result: taskResult} = useAllTasks();

  React.useEffect(() => {
    requestAllAssets();
  }, [requestAllAssets]);

  React.useEffect(() => {
    requestAllTasks();
  }, [requestAllTasks]);

  const routeAssetId = route.params.id;
  React.useEffect(() => {
    console.log(assetResult.source, 'response received');
    if (assetResult.source) {
      setCulturalAsset(
        new CulturalAsset(
          assetResult?.data.find((asset) => asset.id === routeAssetId),
        ),
      );
    }
  }, [assetResult, routeAssetId]);

  React.useEffect(() => {
    console.log(taskResult.source, 'task response received');
    if (taskResult.source && culturalAsset) {
      const taskIds = culturalAsset.data.tasks.map((task) => task.id);
      const foundTasks = taskResult?.data.filter((task) =>
        taskIds.includes(task.id),
      );
      setTasks(foundTasks);
    }
  }, [culturalAsset, taskResult]);

  React.useEffect(() => {
    if (assetResult && culturalAsset) {
      const parentId = culturalAsset.data.parent.id;
      if (parentId != null) {
        const parent = assetResult?.data.find((asset) => asset.id === parentId);
        setParentAsset(parent);
      } else {
        setParentAsset({});
      }

      const childrenIds = culturalAsset.data.children.map((child) => child.id);
      const children = assetResult?.data.filter((asset) =>
        childrenIds.includes(asset.id),
      );
      setChildrenAssets(children);
    }
  }, [culturalAsset, assetResult]);

  const goMap = () => navigation.push('CulturalAssetMapScreen');
  const goAssetGroup = () =>
    navigation.push('CulturalAssetDetailScreen', {id: parentAsset.id});
  const deleteAsset = () => console.log('Deleted Asset');
  const goCreation = () => console.log('Edited Asset');
  const goMedia = () => console.log('Go to MediaList');
  const goComments = () => console.log('Go to CommentList');

  return (
    <Scaffold>
      {culturalAsset === null ||
      childrenAssets === null ||
      parentAsset === null ||
      tasks === null ? (
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
              color={colors.primary}
              icon="map-marker"
              onPress={goMap}
              style={styles.bold}>
              Location
            </Button>
            <View>
              {parentAsset.name ? (
                <Button
                  color={colors.primary}
                  icon="apps"
                  onPress={goAssetGroup}
                  style={styles.bold}>
                  {parentAsset.name}
                </Button>
              ) : null}
            </View>
          </View>
          <ListActions>
            <IconButton
              color={colors.primary}
              icon="circle-edit-outline"
              onPress={goCreation}
            />
            <IconButton
              color={colors.primary}
              icon="trash-can-outline"
              onPress={deleteAsset}
            />
          </ListActions>
          <Divider style={styles.divider} />
          <View style={styles.descriptionContainer}>
            <Title style={styles.bold}>Beschreibung:</Title>
            <Paragraph>{culturalAsset.data.description}</Paragraph>
          </View>
          <Divider style={styles.divider} />
          <View>
            {childrenAssets.length === 0 ? null : (
              <FancyList
                title="Teil-Kulturgüter"
                data={childrenAssets}
                component={CulturalAssetListItem}
              />
            )}
          </View>
          <View>
            {tasks.length === 0 ? null : (
              <FancyList
                title="Aufgaben"
                data={tasks}
                component={TaskListItem}
              />
            )}
          </View>

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
