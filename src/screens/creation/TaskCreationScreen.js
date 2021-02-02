import React from 'react';
import {Text} from 'react-native';

export default function TaskCreationScreen() {
  return <Text>Login Screen</Text>;
}

const taskData = [
  {
    id: 100,
    name: 'Gemälde löschen',
    description: 'Eine Beschreibung',
    tags: ['rescue'],
    comments: [{}],
    media: [{}],
    state: 0,
    numOfHelpersRecommended: 2,
    subtasks: [{id: 150}, {id: 151}, {id: 152}, {id: 153}],
    culturalAsset: {id: 1},
    helper: [{}],
    contact: {},
  },
];

const subtaskData = [
  {
    id: 150,
    state: 0,
    text: 'Bereich räumen',
    isRequired: false,
    task: {id: 100},
  },
  {
    id: 151,
    state: 0,
    text: 'Feuer löschen',
    isRequired: true,
    task: {id: 100},
  },
  {
    id: 152,
    state: 0,
    text: 'Gemälde abhängen',
    isRequired: false,
    task: {id: 100},
  },
  {
    id: 152,
    state: 0,
    text: 'Gemälde zur Restaurierung schicken',
    isRequired: false,
    task: {id: 100},
  },
];
