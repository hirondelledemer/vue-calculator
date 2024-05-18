<template>
  <div class="container">
    <CalculatorComponent @calculated="addToHistory" ref="calculator" />
    <div class="historyActions">
      <button class="button" @click="clearHistory">Clear History</button>
      <button class="button" @click="exportHistory">Export History</button>
      <label for="file-upload" class="button fileButton">
        Import History
      </label>
      <input id="file-upload" type="file" @change="importHistory" />
    </div>
  </div>
</template>
  
<script lang="ts">
import { provide, ref } from 'vue';
import CalculatorComponent, { type HistoryEntry } from './CalculatorComponent.vue';

export default {
  components: {
    CalculatorComponent,
  },

  setup() {
    const history = ref<HistoryEntry[]>([]);

    function addToHistory(calculation: HistoryEntry) {
      history.value.push(calculation);
    }

    provide('history', history);

    return {
      history,
      addToHistory,
    };
  },
  methods: {
    exportHistory() {
      const dataStr = JSON.stringify(this.history);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      const exportFileDefaultName = 'history.json';
      let linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    },
    importHistory(event: any) { // todo: types
      console.log(event.target);
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => { // todo:types
          try {
            const importedHistory = JSON.parse(e.target.result);
            this.history = [...this.history, ...importedHistory.filter((entry: HistoryEntry) => entry.result !== null)];
          } catch (error) {
            console.error('Error importing history', error);
          }
        };
        reader.readAsText(file);
      }
    },

    clearHistory() {
      this.history = [];
    }
  }
};
</script>
  
<style scoped>
.container {
  display: flex;
  /* align-items: start; */

}

.historyActions {
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-left: 12px;
}

.button {
  border: 2px solid #545454;
  border-radius: 5px;
  background-color: #2f2f2f;
  color: #ffffff;
  font-size: 15px;
  padding: 6px 12px;
  cursor: pointer;
}

.fileButton {
  display: inline-block;
  text-align: center;
}

input[type="file"] {
  display: none;
}

.button+.button {
  margin-top: 6px
}
</style>