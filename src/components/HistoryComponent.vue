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
import CalculatorComponent from './CalculatorComponent.vue';

interface HistoryEntry {
  num1: number;
  num2: number;
  operation: string; // todo
  result: number; // todo
}

interface HistoryData {
  history: HistoryEntry[];
}


export default {
  components: {
    CalculatorComponent,
  },
  data(): HistoryData {
    return {
      history: [],
    };
  },
  setup() {
    const history2 = ref<HistoryEntry[]>([]);

    function addToHistory2(calculation: HistoryEntry) {
      history2.value.push(calculation);
      // title.value = 'Another string called from `ParentComponent.vue` in `ChildComponent.vue`';
    }

    // Provide the title to ChildComponent outside the setup function
    provide('history2', history2);

    return {
      history2,
      addToHistory2,
    };
  },
  methods: {
    addToHistory(calculation: HistoryEntry) {
      this.history.push(calculation);
      this.addToHistory2(calculation);
      this.$emit('calculated', calculation)
    },

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