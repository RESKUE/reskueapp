import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import {FancyList} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import UsergroupListItem from '../../components/listItems/UsergroupListItem';
import {usergroupData} from '../../../testdata';

export default function UsergroupListScreen({navigation}) {
  const goGroupCreation = () => navigation.push('UsergroupCreationScreen');

  return (
    <Scaffold>
      <View style={{flexDirection: 'row-reverse'}}>
        <Button icon="plus-circle-outline" onPress={goGroupCreation} />
      </View>
      <FancyList
        title="Gruppen"
        data={usergroupData}
        component={UsergroupListItem}
      />
    </Scaffold>
  );
}
