import React from 'react';
import {useTheme, IconButton} from 'react-native-paper';
import {FancyList} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import UsergroupListItem from '../../components/listItems/UsergroupListItem';
import ListActions from '../../components/ListActions';
import useAllUsergroups from '../../handlers/AllUsergroupsHook';

export default function UsergroupListScreen({navigation}) {
  const {colors} = useTheme();
  const {requestAllUsergroups, result: usergroupResult} = useAllUsergroups();

  React.useEffect(() => {
    requestAllUsergroups();
  }, [requestAllUsergroups]);

  const goGroupCreation = () => navigation.push('UsergroupCreationScreen');

  return (
    <Scaffold>
      <ListActions>
        <IconButton
          color={colors.primary}
          icon="plus-circle-outline"
          onPress={goGroupCreation}
        />
      </ListActions>
      <FancyList
        title="Gruppen"
        data={usergroupResult?.data || []}
        component={UsergroupListItem}
      />
    </Scaffold>
  );
}
