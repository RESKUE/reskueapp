export default class CulturalAsset {
  constructor(data) {
    this.data = data;
  }
}

export const Priorities = [
  {value: 0, name: 'Keine Priorität'},
  {value: 1, name: 'Geringe Priorität'},
  {value: 2, name: 'Normale Priorität'},
  {value: 3, name: 'Hohe Priorität'},
  {value: 4, name: 'Höchste Priorität'},
];
