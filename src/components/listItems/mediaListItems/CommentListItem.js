import React from 'react';
import {Text} from 'react-native';

export default function CommentListItem({data}) {
  return (
    <Text>
      Author: {data.author}
      Text: {data.text}
    </Text>
  );
}
