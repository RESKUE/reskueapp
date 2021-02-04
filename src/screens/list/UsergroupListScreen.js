import React from 'react';
import {FancyList} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import UsergroupListItem from '../../components/listItems/UsergroupListItem';
import {usergroupData} from '../../../testdata';

export default function UsergroupListScreen() {
  return (
    <Scaffold>
      <FancyList
        title="Gruppen"
        data={usergroupData}
        component={UsergroupListItem}
      />
    </Scaffold>
  );
}
