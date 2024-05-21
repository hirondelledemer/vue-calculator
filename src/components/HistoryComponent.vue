<template>
  <div>
    <CalculatorComponent ref="calculator" @calculated="handleCalculated" />
    <div v-if="!!this.$refs.calculator">
      <ul>
        <li v-for="(entry, index) in this.$refs.calculator.history" :key="index">
          {{ entry.num1 }} {{ getOperationSymbol(entry.operation) }} {{ entry.num2 }} = {{ entry.result }}
        </li>
      </ul>
    </div>
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
  // data() {
  //   return {
  //     history: []
  //   }
  // },
  methods: {
    handleCalculated(calculation) {

      this.$emit('finished', calculation.result)
    },
    calculate() {

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
      this.$refs.calculator.exportHistory();
    },

    importHistory(event) {
      this.$refs.calculator.importHistory(event);
    },
    clearHistory() {
      this.$refs.calculator.clearHistory();
    },
  }
};
</script>
