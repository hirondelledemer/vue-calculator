<template>
  <div>
    <button @click="calculateResult">Calculate</button>
    <div v-if="result !== null">
      Result: {{ result }}
    </div>
  </div>
</template>
  
<script>
// todo: add types
export default {
  props: ['result'],
  methods: {
    calculateResult() {
      this.$emit('calculate');
    }
  }
};
</script>
  