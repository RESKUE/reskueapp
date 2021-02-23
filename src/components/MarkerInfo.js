import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme, Text, IconButton} from 'react-native-paper';

export default function MarkerInfo({
  visible = true,
  title,
  text,
  icon,
  onPress,
}) {
  const {colors} = useTheme();

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text>{text}</Text>
      </View>
      <IconButton color={colors.primary} icon={icon} onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '700',
    fontSize: 18,
  },
});
