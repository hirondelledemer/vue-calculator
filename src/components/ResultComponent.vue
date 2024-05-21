<template>
  <div>
    <HistoryComponent @calculated="addResult" ref="calculator" />
    <button @click="calculateResult">Calculate</button>
    <div v-if="result !== null">
      Result: {{ currentResult }}
    </div>
  </div>
</template>

<script>
import HistoryComponent from './HistoryComponent.vue';

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

    addResult(result) {

      console.log('here')
      this.currentResult = result;
    },


    calculateResult() {
      console.log(this.$refs)
      this.$refs.calculator.calculate();
    },
  }
};
</script>
