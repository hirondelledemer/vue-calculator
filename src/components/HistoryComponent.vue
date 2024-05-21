<template>
  <div>
    <CalculatorComponent ref="child" @calculated="handleCalculated" v-model:history="modelValue" />
    <div>
      <ul>
        <li v-for="(entry, index) in modelValue" :key="index">
          {{ entry.num1 }} {{ getOperationSymbol(entry.operation) }} {{ entry.num2 }} = {{ entry.result }}
        </li>
      </ul>
    </div>
    <button @click="exportHistory">Export History</button>
    <input type="file" @change="importHistory" />
    <button @click="clearHistory">Clear History</button>
  </div>
</template>

<script setup>

import { ref, defineExpose, defineEmits } from 'vue'

import CalculatorComponent from './CalculatorComponent.vue';
const emit = defineEmits(['finished'])
const child = ref(null);
const modelValue = ref([]);

function handleCalculated(calculation) {


  emit('finished', calculation.result)
}

function calculate() {

  child.value.calculate();
}

function getOperationSymbol(operation) {
  switch (operation) {
    case 'sum': return '+';
    case 'minus': return '-';
    case 'multiply': return '*';
    case 'divide': return '/';
  }
}

function exportHistory() {
  child.value.exportHistory();
}

function importHistory(event) {
  child.value.importHistory(event);
}

function clearHistory() {
  child.value.clearHistory();
}


defineExpose({
  calculate
})
</script>
