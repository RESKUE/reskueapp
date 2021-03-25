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
}

const TaskStates = [
  {value: 0, name: 'Nicht bearbeitet'},
  {value: 1, name: 'In Bearbeitung'},
  {value: 2, name: 'Abgebrochen'},
  {value: 3, name: 'Abgeschlossen'},
];
