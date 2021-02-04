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
import UserListItem from '../../components/listItems/UserListItem';
import {userData} from '../../../testdata';
import ListActions from '../../components/ListActions';

export default function UsergroupCreationScreen({navigation}) {
  const {colors} = useTheme();
  const [usergroup, setUserGroup] = React.useState({
    name: '',
    users: userData,
  });

  const onChangeName = (name) => {
    const updatedUsergroup = {usergroup};
    updatedUsergroup.name = name;
    updatedUsergroup.users = usergroup.users; //
    setUserGroup(updatedUsergroup);
  };

  const addUsers = () => console.log('Added users');
  const removeUsers = () => console.log('Removed users');

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
          onPress={addUsers}
        />
        <IconButton
          color={colors.primary}
          icon="trash-can-outline"
          onPress={removeUsers}
        />
      </ListActions>
      <Divider style={styles.dividerStyle} />
      <FancyList
        title="Mitglieder"
        data={usergroup.users}
        component={UserListItem}
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
