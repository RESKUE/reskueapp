import React from 'react';
import {useTheme, IconButton} from 'react-native-paper';
import {FancyList} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import CulturalAssetListItem from '../../components/listItems/CulturalAssetListItem';
import {culturalAssetData} from '../../../testdata';
import ListActions from '../../components/ListActions';

export default function CulturalAssetListScreen({navigation}) {
  const goAssetCreation = () => navigation.push('CulturalAssetCreationScreen');
  const {colors} = useTheme();

  return (
    <Scaffold>
      <ListActions>
        <IconButton
          color={colors.primary}
          icon="plus-circle-outline"
          onPress={goAssetCreation}
        />
      </ListActions>
      <FancyList
        title="Kulturgüter"
        data={culturalAssetData}
        component={CulturalAssetListItem}
      />
    </Scaffold>
  );
}
