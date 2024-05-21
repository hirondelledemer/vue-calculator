<template>
  <div id="app">
    <ResultComponent :result="currentResult" @calculate="calculate" />
    <HistoryComponent @finished="addResult" ref="calculator" />
  </div>
</template>

<script>
import ResultComponent from './components/ResultComponent.vue';
import HistoryComponent from './components/HistoryComponent.vue';

export default {
  components: {
    ResultComponent,
    HistoryComponent
  },
  data() {
    return {
      currentResult: null
    };
  },
  methods: {
    addResult(result) {
      this.currentResult = result;
    },
    calculate() {
      console.log(this.$refs)
      this.$refs.calculator.calculate();
    },
  }
};
</script>
