import React from 'react';
import {StyleSheet} from 'react-native';
import {useTheme, IconButton, Button, Divider, Title} from 'react-native-paper';
import {FancyList, LoadingIndicator} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import UserUnpressableListItem from '../../components/listItems/UserUnpressableListItem';
import ListActions from '../../components/ListActions';
import useUsergroup from '../../handlers/UsergroupHook';

export default function UsergroupDetailScreen({navigation, route}) {
  const {colors} = useTheme();
  const [usergroup, setUserGroup] = React.useState(null);
  const [users, setUsers] = React.useState(null);
  const {
    requestUsergroup,
    requestUsergroupUsers,
    usergroupResult,
    usersResult,
  } = useUsergroup();

  React.useEffect(() => {
    requestUsergroup(route.params.id);
  }, [requestUsergroup, route.params]);

  React.useEffect(() => {
    requestUsergroupUsers(route.params.id);
  }, [requestUsergroupUsers, route.params]);

  React.useEffect(() => {
    if (usergroupResult?.data) {
      setUserGroup(usergroupResult.data);
    }
  }, [usergroupResult]);

  React.useEffect(() => {
    if (usersResult?.data) {
      setUsers(usersResult.data.content);
    }
  }, [usersResult]);

  const goCreation = () =>
    navigation.push('UsergroupCreationScreen', {
      screenType: 'update',
      id: usergroup.id,
    });
  const deleteUsergroup = () => console.log('Deleted Usergroup');
  const finishCreation = () => navigation.goBack();

  if (usergroup === null || users === null) {
    return <LoadingIndicator />;
  }

  return (
    <Scaffold>
      <Title style={styles.title}>{usergroup.name}</Title>
      <ListActions>
        <IconButton
          color={colors.primary}
          icon="circle-edit-outline"
          onPress={goCreation}
        />
        <IconButton
          color={colors.primary}
          icon="trash-can-outline"
          onPress={deleteUsergroup}
        />
      </ListActions>
      <Divider style={styles.dividerStyle} />
      <FancyList
        title="Mitglieder"
        data={users}
        component={UserUnpressableListItem}
      />
      <Button
        icon="check"
        mode="contained"
        onPress={finishCreation}
        style={styles.buttonSpacing}>
        Fertig
      </Button>
    </Scaffold>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10,
  },
  dividerStyle: {marginBottom: 24, backgroundColor: 'black'},
  buttonSpacing: {marginTop: 16},
});
