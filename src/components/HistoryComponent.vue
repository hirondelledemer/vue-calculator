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

<script setup lang="ts">

import { ref, defineEmits } from 'vue'

import CalculatorComponent, { type HistoryEntry } from './CalculatorComponent.vue';
const emit = defineEmits(['finished'])
const child = ref<InstanceType<typeof CalculatorComponent>>();
const modelValue = ref<HistoryEntry[]>([]); //todo rename

function handleCalculated(calculation: HistoryEntry) {
  emit('finished', calculation.result)
}

function calculate() {
  child.value!.calculate();
}

function getOperationSymbol(operation: string) {
  switch (operation) {
    case 'sum': return '+';
    case 'minus': return '-';
    case 'multiply': return '*';
    case 'divide': return '/';
  }
}

function exportHistory() {
  child.value!.exportHistory();
}

function importHistory(event: Event) {
  child.value!.importHistory(event);
}

function clearHistory() {
  child.value!.clearHistory();
}


defineExpose({
  calculate
})
</script>
