import React from 'react';
import {FancyList} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import UsergroupListItem from '../../components/listItems/UsergroupListItem';
import {usergroupData} from '../../../testdata';
import {Button} from 'react-native-paper';

export default function UsergroupListScreen({navigation}) {
  const goGroupCreation = () => navigation.push('UsergroupCreationScreen');

  return (
    <Scaffold>
      <Button icon="plus-circle-outline" onPress={goGroupCreation} />
      <FancyList
        title="Gruppen"
        data={usergroupData}
        component={UsergroupListItem}
      />
    </Scaffold>
  );
}
