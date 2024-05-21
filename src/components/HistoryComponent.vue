<template>
  <div>
    <CalculatorComponent @calculated="addToHistory" ref="calculator" />
    <ul>
      <li v-for="(entry, index) in history" :key="index">
        {{ entry.num1 }} {{ getOperationSymbol(entry.operation) }} {{ entry.num2 }} = {{ entry.result }}
      </li>
    </ul>
    <button @click="exportHistory">Export History</button>
    <input type="file" @change="importHistory" />
    <button @click="clearHistory">Clear History</button>
  </div>
</template>

<script>

import CalculatorComponent from './CalculatorComponent.vue';

export default {
  components: {
    CalculatorComponent,
  },

  data() {
    return {
      history: [],
    };
  },

  methods: {
    addToHistory(calculation) {
      this.history.push(calculation);
      this.$emit('finished', calculation.result)
    },
    calculate() {
      // todo: make it smarter
      this.$refs.calculator.calculate();
    },
    getOperationSymbol(operation) {
      switch (operation) {
        case 'sum': return '+';
        case 'minus': return '-';
        case 'multiply': return '*';
        case 'divide': return '/';
      }
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
    clearHistory() {
      this.history = [];
    },
    importHistory(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const importedHistory = JSON.parse(e.target.result);
            this.history = [...this.history, ...importedHistory.filter(entry => entry.result !== null)];
          } catch (error) {
            console.error('Error importing history', error);
          }
        };
        reader.readAsText(file);
      }
    },
  }
};
</script>
