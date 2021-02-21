import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {
  Button,
  Divider,
  IconButton,
  Title,
  Paragraph,
  useTheme,
} from 'react-native-paper';
import {FancyList, LoadingIndicator} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import CulturalAssetListItem from '../../components/listItems/CulturalAssetListItem';
import TaskListItem from '../../components/listItems/TaskListItem';
import ListActions from '../../components/ListActions';
import FloatingWhiteButton from '../../components/FloatingWhiteButton';
import useAsset from '../../handlers/IdAssetHook';
import useAllAssetChildren from '../../handlers/AllAssetChildrenHook';
import useAllTasks from '../../handlers/AllTasksHook';
import CulturalAsset from '../../models/CulturalAsset';

export default function CulturalAssetDetailScreen({navigation, route}) {
  const [culturalAsset, setCulturalAsset] = React.useState(null);
  const [parentAsset, setParentAsset] = React.useState(null);
  const [childrenAssets, setChildrenAssets] = React.useState(null);
  const [tasks, setTasks] = React.useState([]);

  const {colors} = useTheme();
  const {requestAsset, result: assetResult} = useAsset(route.params.id);
  const {
    requestAllAssetChildren,
    result: assetChildrenResult,
  } = useAllAssetChildren(route.params.id);
  const {requestAllTasks, result: taskResult} = useAllTasks();

  React.useEffect(() => {
    requestAsset();
  }, [requestAsset]);

  React.useEffect(() => {
    requestAllAssetChildren();
  }, [requestAllAssetChildren]);

  React.useEffect(() => {
    requestAllTasks();
  }, [requestAllTasks]);

  //Set this CulturalAsset from requested id data
  React.useEffect(() => {
    if (assetResult) {
      setCulturalAsset(new CulturalAsset(assetResult.data));
    }
  }, [assetResult]);

  //Set tasks of this CulturalAsset
  React.useEffect(() => {
    if (taskResult && culturalAsset) {
      const taskIds = culturalAsset.data.tasks?.map((task) => task.id);
      const foundTasks = taskResult?.data.filter((task) =>
        taskIds.includes(task.id),
      );
      setTasks(foundTasks);
    }
  }, [culturalAsset, taskResult]);

  //Set parent and children of this CulturalAsset
  React.useEffect(() => {
    if (assetChildrenResult && culturalAsset) {
      const parentId = culturalAsset.data.parent?.id;
      if (parentId != null) {
        setParentAsset(culturalAsset.data.parent);
      } else {
        setParentAsset({});
      }
      if (assetChildrenResult) {
        setChildrenAssets(assetChildrenResult.data);
      } else {
        setChildrenAssets([]);
      }
    }
  }, [culturalAsset, assetChildrenResult]);

  const goMap = () => navigation.push('CulturalAssetMapScreen');
  const goAssetGroup = () =>
    navigation.push('CulturalAssetDetailScreen', {id: parentAsset.id});
  const deleteAsset = () => console.log('Deleted Asset');
  const goCreation = () => console.log('Edited Asset');
  const goTaskCreation = () =>
    navigation.push('TaskCreationScreen', {
      assetId: culturalAsset.data.id,
    });
  const goMedia = () => navigation.push('MediaListScreen');
  const goComments = () => console.log('Go to CommentList');

  if (
    culturalAsset === null ||
    childrenAssets === null ||
    parentAsset === null ||
    tasks === null
  ) {
    return <LoadingIndicator />;
  }

  return (
    <Scaffold>
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
        <ListActions>
          <IconButton
            color={colors.primary}
            icon="plus-circle-outline"
            onPress={goTaskCreation}
          />
        </ListActions>
        <FancyList title="Aufgaben" data={tasks} component={TaskListItem} />
      </View>
      <View style={styles.center}>
        <FloatingWhiteButton onPress={goMedia} content="Weiter zu den Medien" />
        <FloatingWhiteButton
          onPress={goComments}
          content="Weiter zu den Kommentaren"
        />
      </View>
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
