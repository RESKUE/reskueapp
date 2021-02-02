import {React} from 'react';
import {Text} from 'react-native';

export default function CulturalAssetListScreen() {
  return <Text>Login Screen</Text>;
}

const culturalAssetData = [
	{
		id: 0,
		name: 'Louvre',
		description: 'Museum in Paris',
		tags: [],
		comments: [{}],
		media: [{}],
		label: '',
		longitude: 32.0,
		latitude: 32.0,
		level: 1,
		parent: {},
		children: [{id: 1},{id: 2}],
		tasks: [{}],
	},
	{
		id: 1,
		name: 'Mona Lisa',
		description: 'Gemälde von Leonardo da Vinci',
		tags: ['special','very important'],
		comments: [{}],
		media: [{}],
		label: 'Muss vor Wasser geschützt werden',
		longitude: 32.0,
		latitude: 32.0,
		level: 0,
		parent: {id: 0},
		children: [{}],
		tasks: [{}],
	},
	{
		id: 2,
		name: 'Sitzender Schreiber',
		description: 'Kalksteinstatue im Louvre',
		tags: [],
		comments: [{}],
		media: [{}],
		label: '',
		longitude: 32.0,
		latitude: 32.0,
		level: 0,
		parent: {id: 0},
		children: [{}],
		tasks: [{}],
	},
	{
		id: 3,
		name: 'Die Erschaffung Adams',
		description: 'Deckenfresko in der Sixtinischen Kapelle',
		tags: ['important'],
		comments: [{}],
		media: [{}],
		label: '',
		longitude: 20.0,
		latitude: 55.0,
		level: 0,
		parent: {},
		children: [{}],
		tasks: [{}],
	},
];