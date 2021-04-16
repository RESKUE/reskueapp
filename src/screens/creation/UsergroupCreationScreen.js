import React from 'react';
import {StyleSheet, ToastAndroid} from 'react-native';
import {useTheme, IconButton, Button, TextInput} from 'react-native-paper';
import {FancyList, LoadingIndicator} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import UserCreationListItem from '../../components/listItems/UserCreationListItem';
import ListActions from '../../components/ListActions';
import useUsers from '../../handlers/UsersHook';
import useUsergroup from '../../handlers/UsergroupHook';

export default function UsergroupCreationScreen({navigation, route}) {
  const selectedUserId = route.params?.userId ?? null;
  const usergroupId = route.params?.id ?? null;
  const updatingExistingUsergroup = usergroupId !== null;

  const {colors} = useTheme();
  const {getUsergroup, putUsergroup, postUsergroup} = useUsergroup();
  const {requestUsers, result: userResult} = useUsers();
  const {getUsergroupUsers} = useUsers();

  const [submitting, setSubmitting] = React.useState(false);
  const [usergroup, setUsergroup] = React.useState();

  const fetchExistingData = React.useCallback(async () => {
    console.log('Request usergroup with id:', usergroupId);

    const usergroupResult = await getUsergroup(usergroupId);
    const usergroupUsersResult = await getUsergroupUsers(usergroupId);

    setUsergroup({
      ...(usergroupResult?.data ?? {}),
      users: usergroupUsersResult?.data?.content ?? [],
    });
  }, [usergroupId, getUsergroup, setUsergroup, getUsergroupUsers]);

  React.useEffect(() => {
    if (updatingExistingUsergroup) {
      fetchExistingData();
    }
  }, [updatingExistingUsergroup, fetchExistingData]);

  React.useEffect(() => {
    requestUsers();
  }, [requestUsers]);

  // A new user has been selected via the user selection screen
  React.useEffect(() => {
    if (selectedUserId !== null) {
      addUser(selectedUserId);
    }
  }, [addUser, selectedUserId]);

  const addUser = React.useCallback(
    (userId) => {
      const addedUser = userResult.data.content.find(
        (user) => user.id === userId,
      );
      const updatedUserList = [...(usergroup?.users ?? []), addedUser];
      setUsergroup({...usergroup, users: updatedUserList});
    },
    [userResult, usergroup],
  );

  if (userResult === null) {
    return <LoadingIndicator />;
  }

  return (
    <Scaffold>
      <TextInput
        label="Name"
        value={usergroup?.name}
        onChangeText={onNameChange}
        disabled={submitting}
      />
      <ListActions>
        <IconButton
          color={colors.primary}
          icon="account-plus-outline"
          onPress={openUserSelection}
          disabled={submitting}
        />
      </ListActions>
      <FancyList
        title="Mitglieder"
        placeholder="Keine Mitglieder ausgewählt"
        data={usergroup?.users ?? []}
        extraData={{removeCallback: removeUser}}
        component={UserCreationListItem}
      />
      <Button
        icon="check"
        mode="contained"
        onPress={submit}
        loading={submitting}
        style={styles.buttonSpacing}>
        Fertig
      </Button>
    </Scaffold>
  );

  function onNameChange(name) {
    setUsergroup({...usergroup, name});
  }

  function removeUser(userId) {
    const updatedUserList = usergroup.users.filter(
      (user) => user.id !== userId,
    );
    setUsergroup({...usergroup, users: updatedUserList});
  }

  function openUserSelection() {
    navigation.navigate('UserSelectionListScreen');
  }

  async function submit() {
    // Validate date
    if (!usergroup?.name) {
      ToastAndroid.show('Es muss ein Name gewählt werden!', ToastAndroid.SHORT);
      return;
    }

    // Prepare data for the backend
    const userIds = [];
    if (usergroup.users) {
      usergroup.users.forEach((user) => {
        userIds.push({id: user.id});
      });
    }
    const formattedUsergroup = {name: usergroup?.name, users: userIds};

    // Send data
    setSubmitting(true);
    if (updatingExistingUsergroup) {
      const result = await putUsergroup(usergroupId, formattedUsergroup);
      if (result?.data) {
        navigation.goBack();
      } else {
        console.log('Usergroup update failed:', result?.error);
        ToastAndroid.show('Update fehlgeschlagen!', ToastAndroid.SHORT);
        setSubmitting(false);
      }
    } else {
      const result = await postUsergroup(formattedUsergroup);
      if (result?.data) {
        navigation.goBack();
      } else {
        console.log('Usergroup creation failed:', result?.error);
        ToastAndroid.show('Erstellung fehlgeschlagen!', ToastAndroid.SHORT);
        setSubmitting(false);
      }
    }
  }
}

const styles = StyleSheet.create({
  buttonSpacing: {marginTop: 16},
});
