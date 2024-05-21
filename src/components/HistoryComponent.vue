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

const handleCalculated = (calculation: HistoryEntry) => {
  emit('finished', calculation.result)
}

const calculate = () => {
  child.value!.calculate();
}

const getOperationSymbol = (operation: string) => {
  switch (operation) {
    case 'sum': return '+';
    case 'minus': return '-';
    case 'multiply': return '*';
    case 'divide': return '/';
  }
}

const exportHistory = () => {
  child.value!.exportHistory();
}

const importHistory = (event: Event) => {
  child.value!.importHistory(event);
}

const clearHistory = () => {
  child.value!.clearHistory();
}


defineExpose({
  calculate
})
</script>
