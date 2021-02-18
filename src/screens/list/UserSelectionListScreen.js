import React from 'react';
import {useTheme, IconButton} from 'react-native-paper';
import {FancyList, LoadingIndicator} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import UserSelectionListItem from '../../components/listItems/UserSelectionListItem';
import ListActions from '../../components/ListActions';
import useAllUsers from '../../handlers/AllUsersHook';

export default function UserSelectionListScreen() {
  const {colors} = useTheme();
  const {requestAllUsers, result: userResult} = useAllUsers();

  React.useEffect(() => {
    requestAllUsers();
  }, [requestAllUsers]);

  if (userResult === null) {
    return <LoadingIndicator />;
  }

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
