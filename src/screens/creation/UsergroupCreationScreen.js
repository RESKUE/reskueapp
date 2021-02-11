import React from 'react';
import {StyleSheet} from 'react-native';
import {
  useTheme,
  IconButton,
  Button,
  Divider,
  TextInput,
} from 'react-native-paper';
import {FancyList} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import UserEditableListItem from '../../components/listItems/UserEditableListItem';
import ListActions from '../../components/ListActions';
import useAllUsers from '../../handlers/AllUsersHook';

export default function UsergroupCreationScreen({navigation, route}) {
  const {colors} = useTheme();
  const [usergroup, setUserGroup] = React.useState({
    name: '',
    users: [],
  });
  const {requestAllUsers, result: userResult} = useAllUsers();

  React.useEffect(() => {
    console.log(userResult.source, 'user response received');
  }, [userResult]);

  React.useEffect(() => {
    requestAllUsers();
  }, [requestAllUsers]);

  const routeUserId = route.params?.userId;
  React.useEffect(() => {
    if (routeUserId != null) {
      addUser(routeUserId);
    }
  }, [routeUserId, addUser]);

  const onChangeName = (name) => {
    const updatedUsergroup = {usergroup};
    updatedUsergroup.name = name;
    updatedUsergroup.users = usergroup.users;
    setUserGroup(updatedUsergroup);
  };

  const addUser = React.useCallback(
    (userId) => {
      const addedUser = userResult.data.find((user) => user.id === userId);
      const updatedUserList = [...usergroup.users, addedUser];
      const updatedUsergroup = {name: usergroup.name, users: updatedUserList};
      setUserGroup(updatedUsergroup);
    },
    [userResult, usergroup],
  );

  const goUserSelection = () => {
    navigation.push('UserSelectionListScreen');
  };
  const finishCreation = () => navigation.goBack();

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
        component={UserEditableListItem}
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
