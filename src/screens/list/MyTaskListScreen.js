import React from 'react';
import {FancyList} from '@ilt-pse/react-native-kueres';
import Scaffold from '../../components/baseComponents/Scaffold';
import MyTaskListItem from '../../components/listItems/MyTaskListItem';

export default function MyTaskListScreen() {
  return (
    <Scaffold>
      <FancyList
        title="Meine Aufgaben"
        data={taskData}
        component={MyTaskListItem}
      />
    </Scaffold>
  );
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
  {
    id: 101,
    name: 'Gemälde restaurieren',
    description:
      'Das Gemälde hat Schaden genommen und muss restauriert werden.',
    tags: ['resilience'],
    comments: [{}],
    media: [{}],
    state: 0,
    numOfHelpersRecommended: 1,
    subtasks: [{id: 151}, {id: 152}],
    culturalAsset: {id: 1},
    helper: [{}],
    contact: {},
  },
  {
    id: 102,
    name: 'Statue abstauben',
    description: 'Eine Beschreibung',
    tags: ['resilience'],
    comments: [{}],
    media: [{}],
    state: 0,
    numOfHelpersRecommended: 1,
    subtasks: [],
    culturalAsset: {id: 2},
    helper: [{}],
    contact: {},
  },
  {
    id: 103,
    name: 'Blumen gießen',
    description: '',
    tags: ['resilience'],
    comments: [{}],
    media: [{}],
    state: 0,
    numOfHelpersRecommended: 1,
    subtasks: [],
    culturalAsset: {id: 3},
    helper: [{}],
    contact: {},
  },
];
