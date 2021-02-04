import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Chip, TextInput} from 'react-native-paper';
import Scaffold from '../../components/baseComponents/Scaffold';

export default function CulturalAssetCreationScreen({navigation, route}) {
  const [culturalAsset, setCulturalAsset] = React.useState({
    name: '',
    description: '',
    tags: [],
    comments: [{}],
    media: [{}],
    label: '',
    longitude: 0.0,
    latitude: 0.0,
    level: 0,
    parent: {},
    children: [],
    tasks: [{}],
  });

  const [address, setAddress] = React.useState('');
  const [priority, setPriority] = React.useState(0);

  const onChangeName = (name) => {
    const updatedCulturalAsset = {culturalAsset};
    updatedCulturalAsset.name = name;
    setCulturalAsset(updatedCulturalAsset);
  };
  const onChangeDescription = (description) => {
    const updatedCulturalAsset = {culturalAsset};
    updatedCulturalAsset.description = description;
    setCulturalAsset(updatedCulturalAsset);
  };
  const onChangeAddress = (address) => setAddress(address);
  const onChangePeculiarity = (peculiarity) => {
    const updatedCulturalAsset = {culturalAsset};
    updatedCulturalAsset.label = peculiarity;
    setCulturalAsset(updatedCulturalAsset);
  };
  const onChangeParent = (parentId) => {
    const updatedCulturalAsset = {culturalAsset};
    updatedCulturalAsset.parent = {id: parentId};
    setCulturalAsset(updatedCulturalAsset);
  };

  const finishCreation = () => navigation.goBack();

  return (
    <Scaffold>
      <TextInput
        label="Name"
        value={culturalAsset.name}
        onChangeText={onChangeName}
      />
      <TextInput
        label="Beschreibung"
        value={culturalAsset.description}
        onChangeText={onChangeDescription}
      />
      <TextInput
        label="Adresse"
        value={address}
        onChangeText={onChangeAddress}
      />

      <TextInput
        label="Obergruppe"
        value={culturalAsset.parent.id}
        onChangeParent={onChangeParent}
        style={styles.inputSpacing}
      />
      <TextInput
        label="Besonderheiten"
        value={culturalAsset.label}
        onChangeText={onChangePeculiarity}
      />
      <View style={styles.priorityBox}>
        <Text>Wähle Priorität:</Text>
        {priorities.map((prio, index) => (
          <View key={prio} style={styles.chipWrapper}>
            <Chip
              icon="alert-circle"
              mode="flat"
              height={30}
              selected={index === priority}
              onPress={() => setPriority(index)}>
              {prio}
            </Chip>
          </View>
        ))}
      </View>
      <Button icon="camera" mode="contained" style={styles.buttonSpacing}>
        Füge Medien hinzu
      </Button>
      <Button icon="check" mode="contained" onPress={finishCreation}>
        Fertig
      </Button>
    </Scaffold>
  );
}

const priorities = [
  'Keine Priorität',
  'Geringe Priorität',
  'Normale Priorität',
  'Hohe Priorität',
  'Höchste Priorität',
];

const styles = StyleSheet.create({
  inputSpacing: {marginTop: 24},
  buttonSpacing: {marginBottom: 16},
  priorityBox: {marginVertical: 24},
  chipWrapper: {margin: 2, flexWrap: 'wrap'},
});
