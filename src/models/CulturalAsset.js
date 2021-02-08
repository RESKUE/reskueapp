export default class CulturalAsset {
  constructor(data) {
    this.data = data;
  }

  getPriority() {
    for (const prio of priorities) {
      if (this.data.tags.includes(prio.value)) {
        return prio.value;
      }
    }

    return 'Fehler';
  }

  setPriority(priorityValue) {
    var currentPriority = this.getPriority();
    var index = this.data.tags.indexOf(currentPriority);
    if (index > -1) {
      this.data.tags[index] = priorityValue;
    } else {
      this.data.tags.push(priorityValue);
    }
  }

  isEndangered() {
    return this.data.tags.includes(ENDANGERED_KEY);
  }
  addEndangered() {
    if (!this.isEndangered()) {
      this.data.tags.push(ENDANGERED_KEY);
    }
  }
  removeEndangered() {
    this.data.filter((tag) => tag !== ENDANGERED_KEY);
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

const ENDANGERED_KEY = 'endangered';
const SPECIAL_KEY = 'special';

const priorities = [
  {value: 'p0', name: 'Keine Priorität'},
  {value: 'p1', name: 'Geringe Priorität'},
  {value: 'p2', name: 'Normale Priorität'},
  {value: 'p3', name: 'Hohe Priorität'},
  {value: 'p4', name: 'Höchste Priorität'},
];
