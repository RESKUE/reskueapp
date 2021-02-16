export default class Subtask {
  constructor(data) {
    this.data = data;
  }

  getSubtaskStateName() {
    for (const state of SubtaskStates) {
      if (this.data.state === state.value) {
        return state.name;
      }
    }

    return 'Fehler';
  }

  isNeededToComplete() {
    return this.data.isRequired && this.data.state === 0;
  }
}

const SubtaskStates = [
  {value: 0, name: 'Nicht fertig'},
  {value: 1, name: 'Fertig'},
];
