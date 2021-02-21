import React from 'react';
import {StyleSheet} from 'react-native';
import {useTheme, IconButton, Button, Divider, Title} from 'react-native-paper';
import {FancyList, LoadingIndicator} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import UserUnpressableListItem from '../../components/listItems/UserUnpressableListItem';
import ListActions from '../../components/ListActions';
import useUsers from '../../handlers/UsersHook';
import useAllUsergroups from '../../handlers/AllUsergroupsHook';

export default function UsergroupDetailScreen({navigation, route}) {
  const {colors} = useTheme();
  const [usergroup, setUserGroup] = React.useState(null);
  const [users, setUsers] = React.useState(null);
  const {requestAllUsergroups, result: usergroupResult} = useAllUsergroups();
  const {requestUsers, result: userResult} = useUsers();

  React.useEffect(() => {
    requestUsers();
  }, [requestUsers]);

  React.useEffect(() => {
    requestAllUsergroups();
  }, [requestAllUsergroups]);

  const routeUsergroupId = route.params.id;
  React.useEffect(() => {
    if (usergroupResult) {
      console.log(usergroupResult);
      setUserGroup(
        usergroupResult.data.find((group) => group.id === routeUsergroupId),
      );
    }
  }, [usergroupResult, routeUsergroupId]);

  React.useEffect(() => {
    if (userResult && usergroup) {
      const userIds = usergroup.users.map((user) => user.id);
      const foundUsers = userResult?.data.filter((user) =>
        userIds.includes(user.id),
      );
      setUsers(foundUsers);
    }
  }, [usergroup, userResult]);

  const goCreation = () => console.log('Edited Usergroup');
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
