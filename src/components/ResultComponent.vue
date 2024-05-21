<template>
  <div>
    <HistoryComponent @finished="addResult" ref="child" />
    <button @click="calculateResult">Calculate</button>
    <div v-if="result !== null">
      Result: {{ currentResult }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HistoryComponent from './HistoryComponent.vue';

const currentResult = ref(null)
const child = ref(null)

function addResult(result) {

  console.log('here')
  currentResult.value = result;
}

function calculateResult() {
  child.value.calculate();
}

</script>
