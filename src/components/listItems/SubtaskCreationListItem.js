import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  useTheme,
  Checkbox,
  IconButton,
  Text,
  TextInput,
} from 'react-native-paper';

export default function SubtaskCreationListItem({data, extraData}) {
  const {colors} = useTheme();

  function setIsRequired(isRequired) {
    extraData.changeIsRequiredCallback(data.id, isRequired);
  }
  function onChangeText(updatedText) {
    extraData.changeTextCallback(data.id, updatedText);
  }
  function deleteSubtask() {
    extraData.removeCallback(data.id);
  }

  return (
    <View style={styles.row}>
      <View style={styles.column}>
        <Checkbox
          testID="subtaskCheckbox"
          color={colors.primary}
          uncheckedColor={colors.primary}
          status={data.isRequired ? 'checked' : 'unchecked'}
          onPress={() => setIsRequired(!data.isRequired)}
        />
        <Text style={styles.optionalText}>Pflicht?</Text>
      </View>
      <TextInput
        label="Name"
        value={data.text}
        onChangeText={(text) => onChangeText(text)}
        style={styles.textInput}
        mode="outlined"
        testID="subTaskInput"
      />
      <IconButton
        testID="deleteSubtaskIconButton"
        icon="close"
        color={colors.primary}
        onPress={deleteSubtask}
        testID="subTaskDeleteButton"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  column: {
    flexDirection: 'column',
    marginVertical: -8,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionalText: {marginTop: -12, color: '#aaaaaa'},
  textInput: {
    alignSelf: 'stretch',
    flex: 4,
    marginLeft: 5,
    height: 45,
    fontSize: 14,
  },
});
