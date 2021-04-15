import React from 'react';
import Config from 'react-native-config';
import {StyleSheet, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {
  AuthContext,
  FancyList,
  LoadingIndicator,
} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import CulturalAssetListItem from '../../components/listItems/CulturalAssetListItem';
import TaskListItem from '../../components/listItems/TaskListItem';
import ListActions from '../../components/ListActions';
import FloatingWhiteButton from '../../components/FloatingWhiteButton';
import Priorities from '../../models/AssetPriorities';
import useAsset from '../../handlers/AssetHook';
import useAssetChildren from '../../handlers/AssetChildrenHook';
import useAssetTasks from '../../handlers/AssetTasksHook';
import useMedias from '../../handlers/MediasHook';
import {
  useTheme,
  Button,
  Divider,
  IconButton,
  Paragraph,
  Card,
  Menu,
  Caption,
} from 'react-native-paper';

export default function CulturalAssetDetailScreen({navigation, route}) {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [culturalAsset, setCulturalAsset] = React.useState(null);
  const [parentAsset, setParentAsset] = React.useState(null);
  const [childrenAssets, setChildrenAssets] = React.useState(null);
  const [tasks, setTasks] = React.useState(null);
  const [cover, setCover] = React.useState();

  const assetId = route.params.id;

  const {clientRoles} = React.useContext(AuthContext);
  const {colors} = useTheme();
  const {requestAsset, remove, put, result: assetResult} = useAsset();
  const {
    requestAsset: requestAssetParent,
    result: assetParentResult,
  } = useAsset();
  const {
    requestAssetChildren,
    result: assetChildrenResult,
  } = useAssetChildren();
  const {requestAssetTasks, result: taskResult} = useAssetTasks();
  const {get: requestCover, result: coverResult} = useMedias();

  const fetchData = React.useCallback(() => {
    requestAsset(assetId);
    requestAssetChildren(assetId);
    requestAssetTasks(assetId);
    requestCover(`culturalAsset/${assetId}/media?filter=mimeType~image`);
  }, [
    requestAsset,
    requestAssetChildren,
    requestAssetTasks,
    requestCover,
    assetId,
  ]);

  useFocusEffect(fetchData);

  // Set this CulturalAsset and requests its parent
  React.useEffect(() => {
    if (assetResult) {
      setCulturalAsset(assetResult.data);

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
    if (taskResult?.data) {
      setTasks(taskResult?.data.content ?? []);
    }
  }, [taskResult]);

  // Set children of this CulturalAsset
  React.useEffect(() => {
    if (assetChildrenResult?.data) {
      setChildrenAssets(assetChildrenResult.data.content ?? []);
    }
  }, [assetChildrenResult]);

  // Assemble and store this assets cover image URI
  React.useEffect(() => {
    if (coverResult?.data) {
      const images = coverResult.data.content ?? [];
      const firstMediaId = images[0]?.id;
      if (firstMediaId) {
        const uri = `${Config.APP_REST_BASE_URL}/media/${firstMediaId}`;
        setCover(uri);
      }
    }
  }, [coverResult, setCover]);

  if (!culturalAsset || !childrenAssets || !parentAsset || !tasks) {
    return <LoadingIndicator />;
  }

  return (
    <Scaffold>
      <Card style={styles.card}>
        <Card.Title
          title={culturalAsset.name}
          subtitle={getSubtitle()}
          right={buildMenu}
        />
        <Divider />
        {cover && <Card.Cover source={{uri: cover}} />}
        <Card.Content style={styles.content}>
          <Caption>Beschreibung:</Caption>
          <Paragraph>{culturalAsset.description || '-'}</Paragraph>
        </Card.Content>
        <Divider />
        <Card.Content style={styles.content}>
          <Caption>Besonderheit:</Caption>
          <Paragraph>{culturalAsset.label || '-'}</Paragraph>
        </Card.Content>
        <Divider />
        <Card.Content style={styles.content}>
          <Caption>Adresse:</Caption>
          <Paragraph>{culturalAsset.address || '_'}</Paragraph>
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
      <FancyList
        title="Aufgaben"
        placeholder="Keine Aufgaben vorhanden"
        data={tasks}
        component={TaskListItem}
      />

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
    if (clientRoles.includes('administrator')) {
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
              culturalAsset.isEndangered
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
    } else {
      return null;
    }
  }

  function getSubtitle() {
    const priority =
      Priorities.find((e) => e.value === culturalAsset.priority)?.name ??
      'Unbekannt';
    const isEndangered = !!culturalAsset.isEndangered;
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
    navigation.navigate('CulturalAssetMapScreen', {id: culturalAsset.id});
  }

  function goAssetGroup() {
    navigation.navigate({
      name: 'CulturalAssetDetailScreen',
      key: parentAsset.id,
      params: {id: parentAsset.id},
    });
  }

  function goUpdate() {
    hideMenu();
    navigation.navigate('CulturalAssetCreationScreen', {
      screenType: 'update',
      id: culturalAsset.id,
    });
  }

  async function deleteAsset() {
    hideMenu();
    const result = await remove(culturalAsset.id);
    if (result?.data?.deleted) {
      navigation.goBack();
    } else {
      console.log('Asset deletion failed:', result, result?.error);
    }
  }

  async function toggleIsEndangered() {
    hideMenu();
    const isEndangeredAsInt = !culturalAsset.isEndangered ? 1 : 0;
    const putBody = {isEndangered: isEndangeredAsInt};
    const result = await put(culturalAsset.id, putBody);
    if (result?.data) {
      requestAsset(assetId);
    } else {
      console.log('isEndangered toggle failed:', result, result?.error);
    }
  }

  function goTaskCreation() {
    navigation.navigate('TaskCreationScreen', {
      selectedAsset: culturalAsset,
    });
  }

  function goMedia() {
    navigation.navigate('MediaListScreen', {assetId: culturalAsset.id});
  }

  function goComments() {
    navigation.navigate('CommentListScreen', {assetId: culturalAsset.id});
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
