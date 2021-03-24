import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {FancyList, LoadingIndicator} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import CulturalAssetListItem from '../../components/listItems/CulturalAssetListItem';
import TaskListItem from '../../components/listItems/TaskListItem';
import ListActions from '../../components/ListActions';
import FloatingWhiteButton from '../../components/FloatingWhiteButton';
import useAsset from '../../handlers/AssetHook';
import useAssetChildren from '../../handlers/AssetChildrenHook';
import useAssetTasks from '../../handlers/AssetTasksHook';
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
  const {requestAsset, remove, put, result: assetResult} = useAsset();
  const {
    requestAsset: requestAssetParent,
    result: assetParentResult,
  } = useAsset();
  const {requestAssetChildren, result: assetChildrenResult} = useAssetChildren(
    route.params.id,
  );
  const {requestAssetTasks, result: taskResult} = useAssetTasks();

  useFocusEffect(
    React.useCallback(() => {
      requestAsset(route.params.id);
      requestAssetChildren();
      requestAssetTasks(route.params.id);
    }, [requestAsset, requestAssetChildren, requestAssetTasks, route.params]),
  );

  // Set this CulturalAsset from requested id data
  React.useEffect(() => {
    if (assetResult) {
      setCulturalAsset(new CulturalAsset(assetResult.data));

      const parentId = assetResult?.data?.culturalAssetParent;
      if (parentId) {
        requestAssetParent(parentId);
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
      setTasks(taskResult?.data.content);
    } else {
      setTasks([]);
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
          <Paragraph style={styles.bold}>
            Beachte im Umgang: {culturalAsset?.data?.label}
          </Paragraph>
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
        <Card.Content>
          <Paragraph>{culturalAsset?.data?.address}</Paragraph>
        </Card.Content>
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
          <IconButton
            {...props}
            icon="dots-vertical"
            onPress={showMenu}
            testID="assetDetailScreenMenuButton"
          />
        }>
        <Menu.Item
          onPress={toggleIsEndangered}
          title={
            culturalAsset.data.isEndangered
              ? 'Entferne in Gefahr'
              : 'Markiere in Gefahr'
          }
        />
        <Menu.Item
          onPress={goUpdate}
          title="Bearbeiten"
          testID="assetDetailScreenEditButton"
        />
        <Menu.Item
          onPress={deleteAsset}
          title="Löschen"
          testID="assetDetailScreenDeleteButton"
        />
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

  function goUpdate() {
    hideMenu();
    navigation.push('CulturalAssetCreationScreen', {
      screenType: 'update',
      id: culturalAsset.data.id,
    });
  }

  async function deleteAsset() {
    hideMenu();
    const result = await remove(culturalAsset.data.id);
    if (result?.data?.deleted) {
      navigation.goBack();
    } else {
      console.log('Asset deletion failed:', result, result?.error);
    }
  }

  async function toggleIsEndangered() {
    hideMenu();
    const isEndangeredAsInt = !culturalAsset.data.isEndangered ? 1 : 0;
    const putBody = {isEndangered: isEndangeredAsInt};
    const result = await put(culturalAsset.data.id, putBody);
    if (result?.data) {
      requestAsset(route.params.id);
    } else {
      console.log('isEndangered toggle failed:', result, result?.error);
    }
  }

  function goTaskCreation() {
    navigation.push('TaskCreationScreen', {
      assetId: culturalAsset.data.id,
    });
  }

  function goMedia() {
    navigation.push('MediaListScreen', {assetId: culturalAsset.data.id});
  }

  function goComments() {
    navigation.push('CommentListScreen', {assetId: culturalAsset.data.id});
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
  bold: {
    fontWeight: 'bold',
  },
});
