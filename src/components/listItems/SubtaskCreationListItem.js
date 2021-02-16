import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme, IconButton, List, Text} from 'react-native-paper';

export default function SubtaskCreationListItem({data}) {
  const {colors} = useTheme();
  function markOptional() {
    console.log('Mark optional', data.id);
  }
  function deleteSubtask() {
    console.log('Delete subtask', data.id);
  }

  return (
    <List.Item
      key={data.id}
      title={data.text}
      description={data.description}
      left={(props) => (
        <View style={styles.column}>
          <IconButton
            icon="checkbox-blank-outline"
            color={colors.primary}
            onPress={markOptional}
          />
          <Text style={styles.optionalText}>optional</Text>
        </View>
      )}
      right={(props) => (
        <IconButton
          icon="close"
          color={colors.primary}
          onPress={deleteSubtask}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  column: {
    flexDirection: 'column',
    marginVertical: -8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionalText: {marginTop: -12, color: '#aaaaaa'},
});
