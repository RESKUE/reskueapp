import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FancyList, LoadingIndicator} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import CulturalAssetListItem from '../../components/listItems/CulturalAssetListItem';
import TaskListItem from '../../components/listItems/TaskListItem';
import ListActions from '../../components/ListActions';
import FloatingWhiteButton from '../../components/FloatingWhiteButton';
import useAsset from '../../handlers/AssetHook';
import useAssetChildren from '../../handlers/AssetChildrenHook';
import useTasks from '../../handlers/TasksHook';
import useAssetDeletion from '../../handlers/AssetDeletionHook';
import CulturalAsset from '../../models/CulturalAsset';
import {
  useTheme,
  Button,
  Divider,
  IconButton,
  Paragraph,
  Card,
  Menu,
} from 'react-native-paper';

export default function CulturalAssetDetailScreen({navigation, route}) {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [culturalAsset, setCulturalAsset] = React.useState(null);
  const [parentAsset, setParentAsset] = React.useState(null);
  const [childrenAssets, setChildrenAssets] = React.useState(null);
  const [tasks, setTasks] = React.useState([]);

  const {colors} = useTheme();
  const {requestAsset, result: assetResult} = useAsset();
  const {
    requestAsset: requestAssetParent,
    result: assetParentResult,
  } = useAsset();
  const {requestAssetChildren, result: assetChildrenResult} = useAssetChildren(
    route.params.id,
  );
  const {requestAssetDeletion, result: deletionResult} = useAssetDeletion();
  const {requestTasks, result: taskResult} = useTasks();

  React.useEffect(() => {
    requestAsset(route.params.id);
  }, [requestAsset, route.params.id]);

  React.useEffect(() => {
    requestAssetChildren();
  }, [requestAssetChildren]);

  React.useEffect(() => {
    requestTasks();
  }, [requestTasks]);

  // Set this CulturalAsset from requested id data
  React.useEffect(() => {
    if (assetResult) {
      setCulturalAsset(new CulturalAsset(assetResult.data));

      const parentId = assetResult?.data?.culturalAssetParent;
      if (parentId) {
        requestAssetParent(assetResult.data.culturalAssetParent);
      } else {
        setParentAsset({});
      }
    }
  }, [assetResult, requestAssetParent]);

  // Set parent of this CulturalAsset
  React.useEffect(() => {
    if (assetParentResult?.data) {
      setParentAsset(assetParentResult.data);
    }
  }, [assetParentResult]);

  // Set tasks of this CulturalAsset
  React.useEffect(() => {
    if (taskResult?.data && culturalAsset) {
      if (culturalAsset.data.tasks) {
        const taskIds = culturalAsset.data.tasks?.map((task) => task.id);
        const foundTasks = taskResult.data.content.filter((task) =>
          taskIds.includes(task.id),
        );
        setTasks(foundTasks);
      } else {
        setTasks([]);
      }
    }
  }, [culturalAsset, taskResult]);

  // Set children of this CulturalAsset
  React.useEffect(() => {
    if (assetChildrenResult && culturalAsset) {
      if (assetChildrenResult.data) {
        setChildrenAssets(assetChildrenResult.data.content);
      } else {
        setChildrenAssets([]);
      }
    }
  }, [culturalAsset, assetChildrenResult]);

  // If deletion was successful go back
  React.useEffect(() => {
    if (deletionResult) {
      if (deletionResult.data?.deleted) {
        navigation.goBack();
      } else {
        console.log(
          'Deletion was not successful! Are you the creator of this asset?',
          deletionResult,
        );
      }
    }
  }, [deletionResult, navigation]);

  if (!culturalAsset || !childrenAssets || !parentAsset || !tasks) {
    return <LoadingIndicator />;
  }

  const cleanName = (culturalAsset.data?.name ?? '').replace(' ', '');
  const coverUri = `https://loremflickr.com/g/350/200/${cleanName}`;

  return (
    <Scaffold>
      <Card style={styles.card}>
        <Card.Title
          title={culturalAsset?.data?.name}
          subtitle={getSubtitle()}
          right={buildMenu}
        />
        <Card.Cover source={{uri: coverUri}} />
        <Card.Content style={styles.content}>
          <Paragraph>{culturalAsset?.data?.description}</Paragraph>
        </Card.Content>
        <Divider />
        <Card.Actions>
          <Button onPress={goMap}>Zur Karte</Button>
          {parentAsset?.id && (
            <Button onPress={goAssetGroup}>
              {parentAsset?.name ?? 'Obergruppe'}
            </Button>
          )}
        </Card.Actions>
      </Card>

      {childrenAssets.length !== 0 && (
        <FancyList
          title="Teil-Kulturgüter"
          data={childrenAssets}
          component={CulturalAssetListItem}
        />
      )}

      <ListActions>
        <IconButton
          color={colors.primary}
          icon="plus-circle-outline"
          onPress={goTaskCreation}
        />
      </ListActions>
      <FancyList title="Aufgaben" data={tasks} component={TaskListItem} />

      <View style={styles.center}>
        <FloatingWhiteButton onPress={goMedia} content="Weiter zu den Medien" />
        <FloatingWhiteButton
          onPress={goComments}
          content="Weiter zu den Kommentaren"
        />
      </View>
    </Scaffold>
  );

  function buildMenu(props) {
    return (
      <Menu
        visible={menuVisible}
        onDismiss={hideMenu}
        anchor={
          <IconButton {...props} icon="dots-vertical" onPress={showMenu} />
        }>
        <Menu.Item onPress={goCreation} title="Bearbeiten" />
        <Menu.Item onPress={deleteAsset} title="Löschen" />
      </Menu>
    );
  }

  function getSubtitle() {
    const priority = culturalAsset?.data?.priority;
    const isEndangered = culturalAsset?.data?.isEndangered ?? false;
    const label = isEndangered ? 'In Gefahr!' : 'Nicht in Gefahr.';
    const subtitle = `${label}  |  Priorität: ${priority}`;
    return subtitle;
  }

  function showMenu() {
    setMenuVisible(true);
  }

  function hideMenu() {
    setMenuVisible(false);
  }

  function goMap() {
    navigation.push('CulturalAssetMapScreen', {id: culturalAsset.data.id});
  }

  function goAssetGroup() {
    navigation.push('CulturalAssetDetailScreen', {id: parentAsset.id});
  }

  function deleteAsset() {
    hideMenu();
    requestAssetDeletion(culturalAsset.data.id);
  }

  function goCreation() {
    hideMenu();
    navigation.push('CulturalAssetCreationScreen', {
      screenType: 'update',
      id: culturalAsset.data.id,
    });
  }

  function goTaskCreation() {
    navigation.push('TaskCreationScreen', {
      assetId: culturalAsset.data.id,
    });
  }

  function goMedia() {
    navigation.push('MediaListScreen');
  }

  function goComments() {
    console.log('Go to CommentList');
  }
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  content: {
    paddingVertical: 16,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
