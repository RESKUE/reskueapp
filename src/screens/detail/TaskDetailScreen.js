import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  useTheme,
  Button,
  Divider,
  IconButton,
  Paragraph,
  Text,
  Title,
} from 'react-native-paper';
import {FancyList, LoadingIndicator} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import SubtaskListItem from '../../components/listItems/SubtaskListItem';
import CulturalAssetUnpressableListItem from '../../components/listItems/CulturalAssetUnpressableListItem';
import ListActions from '../../components/ListActions';
import FloatingWhiteButton from '../../components/FloatingWhiteButton';
import useAsset from '../../handlers/AssetHook';
import useTask from '../../handlers/TaskHook';
import Task from '../../models/Task';

export default function TaskDetailScreen({navigation, route}) {
  const [task, setTask] = React.useState(null);
  const [asset, setAsset] = React.useState(null);

  const {colors} = useTheme();
  const {requestTask, result: taskResult} = useTask();
  const {requestAsset, result: assetResult} = useAsset();

  React.useEffect(() => {
    requestTask(route.params.id);
  }, [requestTask, route.params]);

  React.useEffect(() => {
    if (taskResult) {
      setTask(new Task(taskResult.data));
      if (taskResult.data?.culturalAsset) {
        requestAsset(taskResult.data.culturalAsset.id);
      } else {
        setAsset([]);
      }
    }
  }, [requestAsset, taskResult]);

  React.useEffect(() => {
    if (assetResult?.data) {
      setAsset(assetResult.data);
    }
  }, [assetResult]);

  const onChangeSubtaskState = (subtaskId, state) => {
    const updatedTask = new Task(task.data);
    const index = updatedTask.data.subtasks.findIndex(
      (subtask) => subtask.id === subtaskId,
    );
    updatedTask.data.subtasks[index].state = state;
    setTask(updatedTask);
  };

  const goMap = () => navigation.push('CulturalAssetMapScreen', {id: asset.id});
  const goAsset = () =>
    navigation.push('CulturalAssetDetailScreen', {id: asset.id});

  const deleteTask = () => {
    console.log('Delete Task');
  };
  const goCreation = () => console.log('Update Task');
  const goMedia = () => navigation.push('MediaListScreen');
  const goComments = () => console.log('Go to CommentList');

  if (task === null || asset === null) {
    return <LoadingIndicator />;
  }

  const getButtons = () => {
    if (task.data.isEndangered === 0) {
      return null;
    } else {
      return (
        <ListActions>
          <Button color={colors.primary}>Beenden</Button>
          <Button color={colors.redish}>Abbrechen</Button>
        </ListActions>
      );
    }
  };

  return (
    <Scaffold>
      <Title style={styles.title}>{task.data.name}</Title>
      <Paragraph>{task.data.description}</Paragraph>
      <View>
        {asset.name ? (
          <View style={styles.buttonContainer}>
            <Button
              color={colors.primary}
              icon="map-marker"
              onPress={goMap}
              style={styles.bold}>
              Location
            </Button>
            <Button
              color={colors.primary}
              icon="apps"
              onPress={goAsset}
              style={styles.bold}>
              {asset.name}
            </Button>
          </View>
        ) : null}
      </View>
      <View>
        <ListActions>
          <IconButton
            color={colors.primary}
            icon="circle-edit-outline"
            onPress={goCreation}
          />
          <IconButton
            color={colors.primary}
            icon="trash-can-outline"
            onPress={deleteTask}
          />
        </ListActions>
      </View>
      {getButtons()}
      <Divider style={styles.divider} />
      <Text>Empfohlene Helferanzahl: {task.data.recommendedHelperUsers}</Text>
      <Divider style={styles.divider} />
      <FancyList
        title="Teilaufgaben"
        data={task.data.subtasks}
        extraData={{changeSubtaskStateCallback: onChangeSubtaskState}}
        component={SubtaskListItem}
      />
      <Divider style={styles.divider} />
      <FancyList
        title="Helfer"
        data={[]}
        component={CulturalAssetUnpressableListItem}
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
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: -24,
    marginLeft: -12,
  },
  bold: {
    fontWeight: 'bold',
  },
  divider: {
    backgroundColor: 'black',
    marginVertical: 10,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
