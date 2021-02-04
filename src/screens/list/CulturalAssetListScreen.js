import React from 'react';
import {FancyList} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import CulturalAssetListItem from '../../components/listItems/CulturalAssetListItem';
import {culturalAssetData} from '../../../testdata';

export default function CulturalAssetListScreen({navigation}) {
  return (
    <Scaffold>
      <FancyList
        title="Kulturgüter"
        data={culturalAssetData}
        component={CulturalAssetListItem}
      />
    </Scaffold>
  );
}
