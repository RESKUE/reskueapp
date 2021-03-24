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
import Scaffold from '../../components/baseComponents/Scaffold';
import CulturalAssetUnpressableListItem from '../../components/listItems/CulturalAssetUnpressableListItem';
import ListActions from '../../components/ListActions';
import CulturalAsset, {Priorities} from '../../models/CulturalAsset';
import useAsset from '../../handlers/AssetHook';

export default function CulturalAssetCreationScreen({navigation, route}) {
  const screenType = route.params?.screenType;

  const [culturalAsset, setCulturalAsset] = React.useState(
    new CulturalAsset({
      name: '',
      description: '',
      priority: 0,
      address: '',
      label: '',
      level: 0,
    }),
  );
  const [parentAsset, setParentAsset] = React.useState(null);

  const {colors} = useTheme();
  const {requestAsset, post, put, result: baseAssetResult} = useAsset();
  const {
    requestAsset: requestParentAsset,
    result: parentAssetResult,
  } = useAsset();

  React.useEffect(() => {
    if (screenType === 'update') {
      console.log('Request asset with id: ' + route.params.id);
      requestAsset(route.params.id);
    } else {
      setParentAsset([]);
    }
  }, [requestAsset, screenType, route.params.id]);

  React.useEffect(() => {
    if (baseAssetResult?.data) {
      setCulturalAsset(new CulturalAsset(baseAssetResult.data));
      if (baseAssetResult.data.culturalAssetParent) {
        requestParentAsset(baseAssetResult.data.culturalAssetParent);
      }
    }
  }, [baseAssetResult, requestParentAsset]);

  React.useEffect(() => {
    const routeParentId = route.params?.parentId;
    if (routeParentId != null) {
      requestParentAsset(routeParentId);
    }
  }, [route.params, requestParentAsset]);

  React.useEffect(() => {
    if (parentAssetResult?.data) {
      setParentAsset([parentAssetResult.data]);
    }
  }, [parentAssetResult]);

  React.useEffect(() => {
    const location = route.params?.location;
    if (location) {
      onChangeLocation(location);
    }
  }, [route.params, onChangeLocation]);

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
  const onChangeLocation = React.useCallback(
    (location) => {
      const updatedCulturalAsset = new CulturalAsset(culturalAsset.data);
      updatedCulturalAsset.data.longitude = location.longitude;
      updatedCulturalAsset.data.latitude = location.latitude;
      setCulturalAsset(updatedCulturalAsset);
    },
    [culturalAsset.data],
  );
  const onChangeAddress = (newAddress) => {
    const updatedCulturalAsset = new CulturalAsset(culturalAsset.data);
    updatedCulturalAsset.data.address = newAddress;
    setCulturalAsset(updatedCulturalAsset);
  };
  const onChangeLabel = (label) => {
    const updatedCulturalAsset = new CulturalAsset(culturalAsset.data);
    updatedCulturalAsset.data.label = label;
    setCulturalAsset(updatedCulturalAsset);
  };
  const onChangePriority = (prio) => {
    const updatedCulturalAsset = new CulturalAsset(culturalAsset.data);
    updatedCulturalAsset.data.priority = prio;
    setCulturalAsset(updatedCulturalAsset);
  };

  function goLocationSelection() {
    navigation.push('LocationSelectionScreen', {
      parent: 'CulturalAssetCreationScreen',
    });
  }

  const goParentSelection = () => {
    navigation.push('CulturalAssetSelectionListScreen', {
      selectionType: 'parent',
    });
  };

  if (parentAsset === null || culturalAsset === null) {
    return <LoadingIndicator />;
  }

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
      <Button
        icon="map-marker"
        mode="contained"
        onPress={goLocationSelection}
        style={styles.buttonSpacing}>
        Wähle Location
      </Button>
      {culturalAsset.data.latitude || culturalAsset.longitude ? (
        <View>
          <Text>{`Breite: ${culturalAsset.data.latitude}`}</Text>
          <Text>{`Länge: ${culturalAsset.data.longitude}`}</Text>
        </View>
      ) : null}
      <TextInput
        label="Adresse"
        value={culturalAsset.data.address}
        onChangeText={onChangeAddress}
        style={styles.buttonSpacing}
      />
      <TextInput
        label="Besonderheiten bei Handhabung"
        value={culturalAsset.data.label}
        onChangeText={onChangeLabel}
        style={styles.inputSpacing}
      />

      <ListActions>
        <IconButton
          color={colors.primary}
          icon="plus-circle-outline"
          onPress={goParentSelection}
        />
      </ListActions>
      <FancyList
        title="Obergruppe"
        data={parentAsset}
        component={CulturalAssetUnpressableListItem}
      />
      <View style={styles.priorityBox}>
        <Text>Wähle Priorität:</Text>
        {Priorities.map((prio, index) => (
          <View key={prio.value} style={styles.chipWrapper}>
            <Chip
              icon="alert-circle"
              mode="flat"
              height={30}
              selected={prio.value === culturalAsset.data.priority}
              onPress={() => onChangePriority(prio.value)}>
              {prio.name}
            </Chip>
          </View>
        ))}
      </View>
      <Button
        icon="check"
        mode="contained"
        onPress={finishCreation}
        style={styles.buttonSpacing}>
        Fertig
      </Button>
    </Scaffold>
  );

  async function finishCreation() {
    if (
      culturalAsset.data.name === '' ||
      !culturalAsset.data.latitude ||
      (!culturalAsset.data.longitude && culturalAsset.data.address === '')
    ) {
      ToastAndroid.show(
        'Es muss ein Name und Location oder Adresse gewählt werden!',
        ToastAndroid.SHORT,
      );
      return;
    }

    if (parentAsset !== []) {
      culturalAsset.data.culturalAssetParent = {id: parentAsset[0].id};
    } else {
      culturalAsset.data.culturalAssetParent = {};
    }

    if (screenType === 'update') {
      const updateResult = await put(culturalAsset.data.id, culturalAsset.data);
      if (updateResult?.data != null) {
        navigation.goBack();
      } else {
        console.log('Update result: ', updateResult);
      }
    } else {
      const creationResult = await post(culturalAsset.data);
      if (creationResult?.data != null) {
        navigation.goBack();
      } else {
        console.log('Creation result: ' + creationResult);
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
