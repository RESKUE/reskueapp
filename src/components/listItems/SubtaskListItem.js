import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme, Checkbox, List, Text} from 'react-native-paper';

export default function SubtaskListItem({data, extraData}) {
  const {colors} = useTheme();

  function onPress() {
    extraData.changeSubtaskStateCallback(data.id);
  }

  return (
    <List.Item
      key={data.id}
      title={data.text}
      description={data.description}
      left={() => (
        <View style={styles.column}>
          <Checkbox
            color={colors.primary}
            uncheckedColor={colors.primary}
            status={data.state ? 'checked' : 'unchecked'}
            onPress={onPress}
          />
          {data.isRequired ? (
            <Text color={colors.redish} style={styles.requiredText}>
              Pflicht
            </Text>
          ) : null}
        </View>
      )}
      onPress={onPress}
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
  optionalText: {marginTop: -12},
});
