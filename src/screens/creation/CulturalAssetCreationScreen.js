import React from 'react';
import {StyleSheet, ToastAndroid, View} from 'react-native';
import {
  Button,
  Chip,
  IconButton,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import {FancyList, LoadingIndicator} from '@ilt-pse/react-native-kueres';
import Priorities from '../../models/AssetPriorities';
import Scaffold from '../../components/baseComponents/Scaffold';
import CulturalAssetCreationListItem from '../../components/listItems/CulturalAssetCreationListItem';
import ListActions from '../../components/ListActions';
import useAsset from '../../handlers/AssetHook';

export default function CulturalAssetCreationScreen({navigation, route}) {
  const {colors} = useTheme();
  const {requestAsset, post, put} = useAsset();
  const {requestAsset: requestParent} = useAsset();

  const [submitting, setSubmitting] = React.useState(false);
  const [parentAsset, setParentAsset] = React.useState(null);
  const [culturalAsset, setCulturalAsset] = React.useState({});

  const assetId = route.params?.id ?? null;
  const updatingExistingAsset = assetId !== null;
  const selectedParent = route.params?.selectedAsset ?? null;
  const selectedLocation = route.params?.location ?? null;

  const fetchExistingData = React.useCallback(async () => {
    const assetResult = await requestAsset(assetId);
    const parentId = assetResult?.data?.culturalAssetParent ?? null;

    if (!assetResult?.data) {
      console.log('Failed to fetch asset:', assetResult?.error);
      return;
    }

    if (parentId !== null) {
      const parentResult = await requestParent(parentId);
      if (!parentResult?.data) {
        console.log('Failed to fetch parent:', assetResult?.error);
        return;
      }
      setParentAsset(parentResult.data);
    }

    setCulturalAsset(assetResult.data);
  }, [assetId, requestAsset, requestParent, setParentAsset, setCulturalAsset]);

  React.useEffect(() => {
    if (updatingExistingAsset) {
      fetchExistingData();
    }
  }, [updatingExistingAsset, fetchExistingData]);

  React.useEffect(() => {
    // Update the parent cultural asset if one has been selected via the asset selection screen.
    if (selectedParent) {
      setParentAsset(selectedParent);
    }
  }, [selectedParent, setParentAsset]);

  React.useEffect(() => {
    // Update the cultural asset location if it has been update via the location selection screen.
    if (
      selectedLocation &&
      culturalAsset.longitude !== selectedLocation.longitude &&
      culturalAsset.latitude !== selectedLocation.latitude
    ) {
      setCulturalAsset({
        ...culturalAsset,
        longitude: selectedLocation.longitude,
        latitude: selectedLocation.latitude,
      });
    }
  }, [selectedLocation, culturalAsset, setCulturalAsset]);

  if (!culturalAsset) {
    return <LoadingIndicator />;
  }

  return (
    <Scaffold testID="assetCreationScreenScaffold">
      <TextInput
        label="Name"
        value={culturalAsset.name}
        onChangeText={onNameChange}
        disabled={submitting}
        testID="assetCreationScreenNameInput"
      />
      <TextInput
        label="Beschreibung"
        value={culturalAsset.description}
        onChangeText={onDescriptionChange}
        disabled={submitting}
        testID="assetCreationScreenDescriptionInput"
      />
      <Button
        icon="map-marker"
        mode="contained"
        onPress={openLocationSelection}
        disabled={submitting}
        style={styles.buttonSpacing}>
        W??hle Location
      </Button>
      {culturalAsset.latitude || culturalAsset.longitude ? (
        <View>
          <Text>{`Breite: ${culturalAsset.latitude}`}</Text>
          <Text>{`L??nge: ${culturalAsset.longitude}`}</Text>
        </View>
      ) : null}
      <TextInput
        label="Adresse"
        value={culturalAsset.address}
        onChangeText={onAddressChange}
        disabled={submitting}
        style={styles.buttonSpacing}
        testID="assetCreationScreenAddressInput"
      />
      <TextInput
        label="Besonderheiten bei Handhabung"
        value={culturalAsset.label}
        onChangeText={onLabelChange}
        disabled={submitting}
        style={styles.inputSpacing}
      />
      <ListActions>
        <IconButton
          color={colors.primary}
          icon="plus-circle-outline"
          onPress={openParentSelection}
          disabled={submitting}
          testID="addParentButton"
        />
      </ListActions>
      <FancyList
        title="Obergruppe"
        placeholder="Hat keine Obergruppe"
        data={parentAsset ? [parentAsset] : []}
        //TODO: Make parent removable
        extraData={{removeCallback: () => {}}}
        component={CulturalAssetCreationListItem}
      />
      <View style={styles.priorityBox}>
        <Text>W??hle Priorit??t:</Text>
        {Priorities.map((prio, index) => (
          <View key={index} style={styles.chipWrapper}>
            <Chip
              icon="alert-circle"
              mode="flat"
              height={30}
              selected={prio.value === culturalAsset.priority}
              onPress={() => onPriorityChange(prio.value)}>
              {prio.name}
            </Chip>
          </View>
        ))}
      </View>
      <Button
        icon="check"
        mode="contained"
        onPress={submit}
        style={styles.buttonSpacing}
        loading={submitting}
        testID="assetCreationScreenSubmitButton">
        Fertig
      </Button>
    </Scaffold>
  );

  function onNameChange(newName) {
    setCulturalAsset({...culturalAsset, name: newName});
  }

  function onDescriptionChange(newDescription) {
    setCulturalAsset({...culturalAsset, description: newDescription});
  }

  function onAddressChange(newAddress) {
    setCulturalAsset({...culturalAsset, address: newAddress});
  }

  function onLabelChange(newLabel) {
    setCulturalAsset({...culturalAsset, label: newLabel});
  }

  function onPriorityChange(newPriority) {
    setCulturalAsset({...culturalAsset, priority: newPriority});
  }

  function openLocationSelection() {
    const latitude = culturalAsset?.latitude ?? null;
    const longitude = culturalAsset?.longitude ?? null;

    if (latitude !== null && longitude !== null) {
      navigation.navigate('LocationSelectionScreen', {
        parent: 'CulturalAssetCreationScreen',
        location: {latitude, longitude},
      });
    } else {
      navigation.navigate('LocationSelectionScreen', {
        parent: 'CulturalAssetCreationScreen',
      });
    }
  }

  function openParentSelection() {
    navigation.navigate('AssetSelectionScreen', {
      previousRouteName: 'CulturalAssetCreationScreen',
      updateId: assetId,
    });
  }

  async function submit() {
    // Validate user input
    if (parentAsset && parentAsset.level >= 3) {
      ToastAndroid.show(
        'F??r diese Obergruppe wurde bereits die maximale Tiefe erreicht. W??hle ein anderes Kulturgut!',
        ToastAndroid.LONG,
      );
      return;
    }
    if (!culturalAsset.name) {
      ToastAndroid.show('Bitte w??hle einen Namen!', ToastAndroid.SHORT);
      return;
    }
    if (!culturalAsset.longitude && !culturalAsset.address) {
      ToastAndroid.show(
        'Bitte w??hle Koordinaten oder eine Adresse aus!',
        ToastAndroid.SHORT,
      );
      return;
    }

    // Adjust data format
    if (parentAsset) {
      culturalAsset.culturalAssetParent = {id: parentAsset.id};
    } else {
      culturalAsset.culturalAssetParent = null;
    }

    // Submit data
    setSubmitting(true);
    if (updatingExistingAsset) {
      const updateResult = await put(culturalAsset.id, culturalAsset);
      if (updateResult?.data) {
        navigation.goBack();
      } else {
        console.log('Update failed:', updateResult?.error);
        ToastAndroid.show('Update fehlgeschlagen!', ToastAndroid.SHORT);
        setSubmitting(false);
      }
    } else {
      const creationResult = await post(culturalAsset);
      if (creationResult?.data) {
        navigation.goBack();
      } else {
        console.log('Creation failed:', creationResult?.error);
        ToastAndroid.show('Erstellung fehlgeschlagen!', ToastAndroid.SHORT);
        setSubmitting(false);
      }
    }
  }
}

const styles = StyleSheet.create({
  inputSpacing: {marginBottom: 24},
  textSpacing: {marginBottom: 16},
  buttonSpacing: {marginTop: 16},
  priorityBox: {marginVertical: 24},
  chipWrapper: {margin: 2, flexWrap: 'wrap'},
});
