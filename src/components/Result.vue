<template>
  <div>
    <HistoryComponent @calculated="addToHistory" />
    <button @click="calculateResult">Calculate</button>
    <div v-if="currentResult !== null">
      Result: {{ currentResult }}
    </div>
  </div>
</template>
  
<script>

// todo: add types

import HistoryComponent from './History.vue';
export default {
  components: {
    HistoryComponent
  },
  data() {
    return {
      currentResult: null
    };
  },
  methods: {
    calculateResult() {
      this.$refs.calculator.calculate();
    },
    addToHistory(calculation) { //todo: rename
      this.currentResult = calculation.result;
    },
  }
};
</script>
  