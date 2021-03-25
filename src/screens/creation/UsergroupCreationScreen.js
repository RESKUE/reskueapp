import React from 'react';
import {StyleSheet, ToastAndroid} from 'react-native';
import {
  useTheme,
  IconButton,
  Button,
  Divider,
  TextInput,
} from 'react-native-paper';
import {FancyList, LoadingIndicator} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import UserCreationListItem from '../../components/listItems/UserCreationListItem';
import ListActions from '../../components/ListActions';
import useUsers from '../../handlers/UsersHook';
import useUsergroup from '../../handlers/UsergroupHook';
import useUsergroupCreation from '../../handlers/UsergroupCreationHook';

export default function UsergroupCreationScreen({navigation, route}) {
  const {colors} = useTheme();

  const {
    requestUsergroup,
    requestUsergroupUsers,
    usergroupResult,
    usersResult,
  } = useUsergroup();

  const screenType = route.params?.screenType;

  const [usergroup, setUserGroup] = React.useState({
    name: '',
    users: [],
  });
  const [usersLoaded, setUsersLoaded] = React.useState(false);

  const {
    postUsergroup,
    putUsergroup,
    result: creationResult,
  } = useUsergroupCreation();
  const {requestUsers, result: userResult} = useUsers();

  React.useEffect(() => {
    if (screenType === 'update') {
      console.log('Request usergroup with id: ' + route.params.id);
      requestUsergroup(route.params.id);
      requestUsergroupUsers(route.params.id);
    }
  }, [requestUsergroup, requestUsergroupUsers, screenType, route.params]);

  React.useEffect(() => {
    requestUsers();
  }, [requestUsers]);

  React.useEffect(() => {
    if (usergroupResult?.data && !usersLoaded) {
      setUserGroup(usergroupResult.data);
    }
  }, [usergroupResult, usersLoaded]);

  React.useEffect(() => {
    if (usersResult?.data && !usersLoaded) {
      setUsers(usersResult.data.content);
    }
  }, [setUsers, usersResult, usersLoaded]);

  const routeUserId = route.params?.userId;
  React.useEffect(() => {
    if (routeUserId != null) {
      addUser(routeUserId);
    }
  }, [addUser, routeUserId]);

  React.useEffect(() => {
    if (creationResult?.data) {
      navigation.goBack();
    } else {
      console.log(creationResult);
    }
  }, [creationResult, navigation]);

  const onChangeName = (name) => {
    const updatedUsergroup = {
      id: usergroup.id,
      name: name,
      users: usergroup.users,
    };
    setUserGroup(updatedUsergroup);
  };

  const setUsers = React.useCallback(
    (userList) => {
      const updatedUsergroup = {
        id: usergroup.id,
        name: usergroup.name,
        users: userList,
      };
      setUserGroup(updatedUsergroup);
      setUsersLoaded(true);
    },
    [usergroup],
  );

  const addUser = React.useCallback(
    (userId) => {
      const addedUser = userResult.data.content.find(
        (user) => user.id === userId,
      );
      const updatedUserList = [...usergroup.users, addedUser];
      const updatedUsergroup = {
        id: usergroup.id,
        name: usergroup.name,
        users: updatedUserList,
      };
      setUserGroup(updatedUsergroup);
    },
    [userResult, usergroup],
  );

  function removeUser(userId) {
    const updatedUserList = usergroup.users.filter(
      (user) => user.id !== userId,
    );
    const updatedUsergroup = {
      id: usergroup.id,
      name: usergroup.name,
      users: updatedUserList,
    };
    setUserGroup(updatedUsergroup);
  }

  const goUserSelection = () => {
    navigation.push('UserSelectionListScreen');
  };
  const finishCreation = () => {
    if (usergroup.name === '') {
      ToastAndroid.show('Es muss ein Name gewählt werden!', ToastAndroid.SHORT);
      return;
    }
    const userIds = [];
    usergroup.users.forEach((user) => {
      userIds.push({id: user.id});
    });
    const formattedUsergroup = {name: usergroup.name, users: userIds};
    if (screenType === 'update') {
      putUsergroup(usergroup.id, formattedUsergroup);
    } else {
      postUsergroup(formattedUsergroup);
    }
  };

  if (userResult === null) {
    return <LoadingIndicator />;
  }

  return (
    <Scaffold>
      <TextInput
        label="Name"
        value={usergroup.name}
        onChangeText={onChangeName}
      />
      <ListActions>
        <IconButton
          color={colors.primary}
          icon="account-plus-outline"
          onPress={goUserSelection}
        />
      </ListActions>
      <Divider style={styles.dividerStyle} />
      <FancyList
        title="Mitglieder"
        placeholder="Keine Mitglieder ausgewählt"
        data={usergroup.users}
        extraData={{removeCallback: removeUser}}
        component={UserCreationListItem}
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
  dividerStyle: {marginBottom: 24, backgroundColor: 'black'},
  buttonSpacing: {marginTop: 16},
});
