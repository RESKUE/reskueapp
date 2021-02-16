export default class Task {
  constructor(data) {
    this.data = data;
  }

  getTaskStateName() {
    for (const state of taskState) {
      if (this.data.state === state.value) {
        return state.name;
      }
    }

    return 'Fehler';
  }

  getHelpersNeeded() {
    return this.data.numOfHelpersRecommended - this.data.helper.length;
  }

  hasSubtasks() {
    return this.data.substasks.length === 0;
  }

  isCulturalAssetEndangered() {
    //TODO: Get CulturalAsset from id and return asset.isEndangered()
    return false;
  }
}

const taskState = [
  {value: 0, name: 'Nicht angefangen'},
  {value: 1, name: 'Angefangen'},
  {value: 2, name: 'Abgebrochen'},
  {value: 3, name: 'Abgeschlossen'},
];
