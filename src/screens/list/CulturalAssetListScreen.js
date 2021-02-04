import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import {FancyList} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import CulturalAssetListItem from '../../components/listItems/CulturalAssetListItem';
import {culturalAssetData} from '../../../testdata';

export default function CulturalAssetListScreen({navigation}) {
  const goAssetCreation = () => navigation.push('CulturalAssetCreationScreen');

  return (
    <Scaffold>
      <View style={{flexDirection: 'row-reverse'}}>
        <Button icon="plus-circle-outline" onPress={goAssetCreation} />
      </View>

      <FancyList
        title="Kulturgüter"
        data={culturalAssetData}
        component={CulturalAssetListItem}
      />
    </Scaffold>
  );
}
