export default class CulturalAsset {
  constructor(data) {
    this.data = data;
  }
  isSpecial() {
    return this.data.label !== '';
  }
  setSpecial() {
    if (!this.isSpecial()) {
      this.data.filter((tag) => tag !== SPECIAL_KEY);
    } else {
      if (!this.data.tags.includes(SPECIAL_KEY)) {
        this.data.tags.push(SPECIAL_KEY);
      }
    }
  }
}

export const ENDANGERED_KEY = 'endangered';
export const SPECIAL_KEY = 'special';

export const Priorities = [
  {value: 0, name: 'Keine Priorität'},
  {value: 1, name: 'Geringe Priorität'},
  {value: 2, name: 'Normale Priorität'},
  {value: 3, name: 'Hohe Priorität'},
  {value: 4, name: 'Höchste Priorität'},
];
