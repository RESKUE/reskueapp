import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Paragraph} from 'react-native-paper';

export default function FloatingWhiteButton({onPress, content}) {
  return (
    <Button style={styles.box} onPress={onPress}>
      <Paragraph>{content}</Paragraph>
    </Button>
  );
}

const styles = StyleSheet.create({
  box: {
    width: '80%',
    height: 45,
    borderRadius: 20,
    marginTop: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
