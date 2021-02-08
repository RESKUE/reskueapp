import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Chip, TextInput} from 'react-native-paper';
import Scaffold from '../../components/baseComponents/Scaffold';
import CulturalAsset from '../../models/CulturalAsset';
import {culturalAssetData} from '../../../testdata';

export default function CulturalAssetCreationScreen({navigation, route}) {
  const testData = culturalAssetData.find((asset) => asset.id === -1);

  const [culturalAsset, setCulturalAsset] = React.useState(
    new CulturalAsset(testData),
  );

  const onChangeName = (name) => {
    const updatedCulturalAsset = new CulturalAsset(culturalAsset.data);
    updatedCulturalAsset.data.name = name;
    setCulturalAsset(updatedCulturalAsset);
  };
  const onChangeDescription = (description) => {
    const updatedCulturalAsset = new CulturalAsset(culturalAsset.data);
    updatedCulturalAsset.data.description = description;
    setCulturalAsset(updatedCulturalAsset);
  };
  const onChangeAddress = (newAddress) => {
    const updatedCulturalAsset = new CulturalAsset(culturalAsset.data);
    updatedCulturalAsset.data.address = newAddress;
    setCulturalAsset(updatedCulturalAsset);
  };
  const onChangeParent = (parentId) => {
    const updatedCulturalAsset = new CulturalAsset(culturalAsset.data);
    updatedCulturalAsset.data.parent = {id: parentId};
    setCulturalAsset(updatedCulturalAsset);
  };
  const onChangePeculiarity = (peculiarity) => {
    const updatedCulturalAsset = new CulturalAsset(culturalAsset.data);
    updatedCulturalAsset.data.label = peculiarity;
    updatedCulturalAsset.setSpecial();
    setCulturalAsset(updatedCulturalAsset);
  };
  const onChangePriority = (prio) => {
    const updatedCulturalAsset = new CulturalAsset(culturalAsset.data);
    updatedCulturalAsset.setPriority(prio);
    setCulturalAsset(updatedCulturalAsset);
  };

  const finishCreation = () => {
    console.log(culturalAsset);
    navigation.goBack();
  };

  return (
    <Scaffold>
      <TextInput
        label="Name"
        value={culturalAsset.data.name}
        onChangeText={onChangeName}
      />
      <TextInput
        label="Beschreibung"
        value={culturalAsset.data.description}
        onChangeText={onChangeDescription}
      />
      <TextInput
        label="Adresse"
        value={culturalAsset.data.address}
        onChangeText={onChangeAddress}
      />

      <TextInput
        label="Obergruppe"
        value={culturalAsset.data.parent.id}
        onChangeParent={onChangeParent}
        style={styles.inputSpacing}
      />
      <TextInput
        label="Besonderheiten"
        value={culturalAsset.data.label}
        onChangeText={onChangePeculiarity}
      />
      <View style={styles.priorityBox}>
        <Text>Wähle Priorität:</Text>
        {priorities.map((prio, index) => (
          <View key={prio.value} style={styles.chipWrapper}>
            <Chip
              icon="alert-circle"
              mode="flat"
              height={30}
              selected={prio.value === culturalAsset.getPriority()}
              onPress={() => onChangePriority(prio.value)}>
              {prio.name}
            </Chip>
          </View>
        ))}
      </View>
      <Button icon="camera" mode="contained">
        Füge Medien hinzu
      </Button>
      <Button
        icon="check"
        mode="contained"
        onPress={finishCreation}
        style={styles.buttonSpacing}>
        Fertig
      </Button>
    </Scaffold>
  );
}

const priorities = [
  {value: 'p0', name: 'Keine Priorität'},
  {value: 'p1', name: 'Geringe Priorität'},
  {value: 'p2', name: 'Normale Priorität'},
  {value: 'p3', name: 'Hohe Priorität'},
  {value: 'p4', name: 'Höchste Priorität'},
];

const styles = StyleSheet.create({
  inputSpacing: {marginTop: 24},
  buttonSpacing: {marginTop: 16},
  priorityBox: {marginVertical: 24},
  chipWrapper: {margin: 2, flexWrap: 'wrap'},
});
