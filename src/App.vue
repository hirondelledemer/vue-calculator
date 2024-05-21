<template>
  <div id="app">
    <CalculatorComponent @calculated="addToHistory" ref="calculator" />
    <ResultComponent :result="currentResult" @calculate="calculate" />
    <HistoryComponent :history="history" @imported="importHistory" @cleared="clearHistory" />
  </div>
</template>

<script>
import CalculatorComponent from './components/CalculatorComponent.vue';
import ResultComponent from './components/ResultComponent.vue';
import HistoryComponent from './components/HistoryComponent.vue';

export default {
  components: {
    CalculatorComponent,
    ResultComponent,
    HistoryComponent
  },
  data() {
    return {
      history: [],
      currentResult: null
    };
  },
  methods: {
    addToHistory(calculation) {
      this.history.push(calculation);
      this.currentResult = calculation.result;
    },
    calculate() {
      this.$refs.calculator.calculate();
    },
    importHistory(importedHistory) {
      this.history = [...this.history, ...importedHistory.filter(entry => entry.result !== null)];
    },
    clearHistory() {
      this.history = [];
    }
  }
};
</script>
