import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme, Checkbox, List, Text} from 'react-native-paper';

export default function SubtaskListItem({data, extraData}) {
  const {colors} = useTheme();

  function onPress() {
    if (extraData?.changeSubtaskStateCallback) {
      extraData.changeSubtaskStateCallback(data.id, !data.state);
    }
  }

  return (
    <List.Item
      key={data.id}
      title={data.text}
      description={data.description}
      left={() => (
        <View style={styles.column}>
          <Checkbox
            testID="subtaskCheckbox"
            color={colors.primary}
            uncheckedColor={colors.primary}
            status={data.state ? 'checked' : 'unchecked'}
            onPress={onPress}
          />
          {data.isRequired && (
            <Text style={[styles.requiredText, {color: colors.redish}]}>
              Pflicht
            </Text>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  column: {
    flexDirection: 'column',
    marginVertical: -8,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  requiredText: {marginTop: -8},
});
