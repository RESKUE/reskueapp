import React from 'react';
import {FancyList} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import CulturalAssetListItem from '../../components/listItems/CulturalAssetListItem';
import {culturalAssetData} from '../../../testdata';
import {Button} from 'react-native-paper';

export default function CulturalAssetListScreen({navigation}) {
  const goAssetCreation = () => navigation.push('CulturalAssetCreationScreen');

  return (
    <Scaffold>
      <Button icon="plus-circle-outline" onPress={goAssetCreation} />
      <FancyList
        title="Kulturgüter"
        data={culturalAssetData}
        component={CulturalAssetListItem}
      />
    </Scaffold>
  );
}
