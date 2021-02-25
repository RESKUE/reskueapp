export default class Task {
  constructor(data) {
    this.data = data;
  }

  getTaskStateName() {
    for (const state of TaskStates) {
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

const TaskStates = [
  {value: 0, name: 'Wurde nicht bearbeitet'},
  {value: 1, name: 'In Bearbeitung'},
  {value: 2, name: 'Wurde abgebrochen'},
  {value: 3, name: 'Wurde abgeschlossen'},
];
