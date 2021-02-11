import React from 'react';
import {useTheme, IconButton} from 'react-native-paper';
import {FancyList} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import UserSelectionListItem from '../../components/listItems/UserSelectionListItem';
import ListActions from '../../components/ListActions';
import useAllUsers from '../../handlers/AllUsersHook';

export default function UserSelectionListScreen() {
  const {colors} = useTheme();
  const {requestAllUsers, result: userResult} = useAllUsers();

  React.useEffect(() => {
    console.log(userResult.source, 'response received');
  }, [userResult]);

  React.useEffect(() => {
    requestAllUsers();
  }, [requestAllUsers]);

  return (
    <Scaffold>
      <ListActions>
        <IconButton
          color={colors.primary}
          icon="reload"
          onPress={() => requestAllUsers()}
        />
      </ListActions>
      <FancyList
        title="Wähle Mitglied"
        data={userResult.data}
        component={UserSelectionListItem}
      />
    </Scaffold>
  );
}
