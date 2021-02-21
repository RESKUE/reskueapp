import React from 'react';
import {useTheme, IconButton} from 'react-native-paper';
import {FancyList, LoadingIndicator} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import UserSelectionListItem from '../../components/listItems/UserSelectionListItem';
import ListActions from '../../components/ListActions';
import useUsers from '../../handlers/UsersHook';

export default function UserSelectionListScreen() {
  const {colors} = useTheme();
  const {requestUsers, result: userResult} = useUsers();

  React.useEffect(() => {
    requestUsers();
  }, [requestUsers]);

  if (userResult === null) {
    return <LoadingIndicator />;
  }

  return (
    <Scaffold>
      <ListActions>
        <IconButton
          color={colors.primary}
          icon="reload"
          onPress={() => requestUsers()}
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
