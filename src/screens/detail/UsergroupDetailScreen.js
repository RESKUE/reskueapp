import React from 'react';
import {StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Card, IconButton, Menu} from 'react-native-paper';
import {FancyList, LoadingIndicator} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import UserUnpressableListItem from '../../components/listItems/UserUnpressableListItem';
import useUsergroup from '../../handlers/UsergroupHook';

export default function UsergroupDetailScreen({navigation, route}) {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [usergroup, setUserGroup] = React.useState(null);
  const [users, setUsers] = React.useState(null);
  const {
    requestUsergroup,
    requestUsergroupUsers,
    requestUsergroupDeletion,
    usergroupResult,
    usersResult,
  } = useUsergroup();

  useFocusEffect(
    React.useCallback(() => {
      requestUsergroup(route.params.id);
      requestUsergroupUsers(route.params.id);
    }, [requestUsergroup, requestUsergroupUsers, route.params]),
  );

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

  if (usergroup === null || users === null) {
    return <LoadingIndicator />;
  }

  return (
    <Scaffold>
      <Card style={styles.card}>
        <Card.Title title={usergroup.name} right={buildMenu} />
      </Card>
      <FancyList
        title="Mitglieder"
        placeholder="Keine Mitglieder vorhanden"
        data={users}
        component={UserUnpressableListItem}
      />
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
        <Menu.Item onPress={goUpdate} title="Bearbeiten" />
        <Menu.Item onPress={deleteUsergroup} title="Löschen" />
      </Menu>
    );
  }

  function showMenu() {
    setMenuVisible(true);
  }

  function hideMenu() {
    setMenuVisible(false);
  }

  function goUpdate() {
    hideMenu();
    navigation.push('UsergroupCreationScreen', {
      screenType: 'update',
      id: usergroup.id,
    });
  }

  async function deleteUsergroup() {
    hideMenu();
    const result = await requestUsergroupDeletion(usergroup.id);
    if (result.data?.deleted) {
      navigation.goBack();
    } else {
      console.log('Usergroup deletion failed:', result?.data, result?.error);
    }
  }
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
});
