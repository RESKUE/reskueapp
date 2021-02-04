import React, {useState} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {Button, Chip, HelperText, TextInput} from 'react-native-paper';
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
      <SafeAreaView>
        <ScrollView>
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
            style={{marginTop: 25}}
          />
          <TextInput
            label="Besonderheiten"
            value={culturalAsset.label}
            onChangeText={onChangePeculiarity}
          />
          <View style={{flex: 1, marginTop: 25, marginBottom: 25}}>
            <Text style={{marginLeft: 10}}>Wähle Priorität:</Text>
            {priorities.map((prio, index) => {
              return (
                <View
                  style={{
                    margin: 2,
                    flexWrap: 'wrap',
                  }}>
                  <Chip
                    icon="alert-circle"
                    key={prio}
                    mode="flat"
                    height={30}
                    selected={index === priority}
                    onPress={() => setPriority(index)}>
                    {prio}
                  </Chip>
                </View>
              );
            })}
          </View>
          <Button icon="camera" mode="contained" style={{marginBottom: 20}}>
            Füge Medien hinzu
          </Button>
          <Button
            icon="check"
            mode="contained"
            onPress={finishCreation}
            style={{marginBottom: 50}}>
            Fertig
          </Button>
        </ScrollView>
      </SafeAreaView>
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
