export default class CulturalAsset {
  constructor(data) {
    this.data = data;
  }

  getPriority() {
    for (var i = 0; i < priorities.length; i++) {
      if (this.data.tags.includes(priorities[i])) {
        return priorities[i];
      }
    }

    return 'Fehler';
  }

  setPriority(prio) {
    var currentPriority = this.getPriority();
    var index = this.data.tags.indexOf(currentPriority);
    if (index > -1) {
      this.data.tags[index] = prio;
    } else {
      this.data.tags.push(prio);
    }
  }

  getEndangered() {
    return this.data.tags.includes('endangered');
  }
  addEndangered() {
    var index = this.data.tags.indexOf('endagered');
    if (index === -1) {
      this.data.tags.push('endangered');
    }
  }
  removeEndangered() {
    var index = this.data.tags.indexOf('endagered');
    if (index > -1) {
      this.data.tags.splice(index, 1);
    }
  }
  getSpecial() {
    return this.data.label === '';
  }
  setSpecial() {
    //Remove special-tag if it exists
    if (this.data.label === '') {
      var index = this.data.tags.indexOf('special');
      if (index > -1) {
        this.data.tags.splice(index, 1);
      }
    }
    //Add special-tag if it doesn't exist
    else {
      var index = this.data.tags.indexOf('special');
      if (index === -1) {
        this.data.tags.push('special');
      }
    }
  }
}

const priorities = [
  'Keine Priorität',
  'Geringe Priorität',
  'Normale Priorität',
  'Hohe Priorität',
  'Höchste Priorität',
];
