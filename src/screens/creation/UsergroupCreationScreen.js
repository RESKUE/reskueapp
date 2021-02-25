import React from 'react';
import {StyleSheet} from 'react-native';
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

  const [usergroup, setUserGroup] = React.useState(emptyUsergroup);
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
    if (usergroupResult?.data) {
      setUserGroup(usergroupResult.data);
    }
  }, [usergroupResult]);

  React.useEffect(() => {
    if (usersResult?.data) {
      const updatedUsergroup = {
        id: usergroup.id,
        name: usergroup.name,
        users: usersResult.data.content,
      };
      setUserGroup(updatedUsergroup);
    }
  }, [usersResult, usergroup]);

  const routeUserId = route.params?.userId;
  React.useEffect(() => {
    if (routeUserId != null) {
      addUser(routeUserId);
    }
  }, [routeUserId, addUser]);

  React.useEffect(() => {
    if (creationResult?.data != null) {
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

  const addUser = React.useCallback(
    (userId) => {
      console.log(userResult);
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
    if (screenType === 'update') {
      console.log(usergroup);
      putUsergroup(usergroup.id, usergroup);
    } else {
      const userIds = usergroup.users.map((user) => {
        user.id;
      });
      const formattedUsergroup = {name: usergroup.name, users: userIds};
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

const emptyUsergroup = {
  name: '',
  users: [],
};

const styles = StyleSheet.create({
  dividerStyle: {marginBottom: 24, backgroundColor: 'black'},
  buttonSpacing: {marginTop: 16},
});
