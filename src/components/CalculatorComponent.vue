<template>
  <div>
    <input v-model.number="num1" type="number" placeholder="Enter first number" />
    <select v-model="operation">
      <option value="sum">+</option>
      <option value="minus">-</option>
      <option value="multiply">*</option>
      <option value="divide">/</option>
    </select>
    <input v-model.number="num2" type="number" placeholder="Enter second number" />
  </div>
</template>

<script setup lang="ts">

import { ref, defineEmits, defineModel } from 'vue'

export type Result = number | null | string;
export interface HistoryEntry {
  num1: number;
  num2: number;
  operation: string;
  result: Result;
}

const num1 = ref<number>(0)
const num2 = ref<number>(0)
const operation = ref<string>('sum')
const result = ref<Result>(null)
const history = defineModel<HistoryEntry[]>('history', { default: [] })

const emit = defineEmits(['calculated'])

function addToHistory(calculation: HistoryEntry) {
  history.value.push(calculation);
}

function exportHistory() {
  const dataStr = JSON.stringify(history.value);
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
  const exportFileDefaultName = 'history.json';
  let linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}
function clearHistory() {
  history.value = [];
}
function importHistory(event: Event) {
  const target = event.target as HTMLInputElement;


  if (target && !!target.files) {
    const file = target.files[0]
    const reader = new FileReader();

    reader.onload = (e: any) => {
      try {
        const importedHistory = JSON.parse(e.target.result);
        history.value = [...importedHistory.filter((entry: HistoryEntry) => entry.result !== null)];
      } catch (error) {
        console.error('Error importing history', error);
      }
    };
    reader.readAsText(file);
  }
}
function calculate() {
  switch (operation.value) {
    case 'sum':
      result.value = num1.value + num2.value;
      break;
    case 'minus':
      result.value = num1.value - num2.value;
      break;
    case 'multiply':
      result.value = num1.value * num2.value;
      break;
    case 'divide':
      if (num2.value !== 0) {
        result.value = num1.value / num2.value;
      } else {
        result.value = 'Error: Division by zero';
      }
      break;
  }

  addToHistory({
    num1: num1.value,
    num2: num2.value,
    operation: operation.value,
    result: result.value
  });


  emit('calculated', {
    num1: num1.value,
    num2: num2.value,
    operation: operation.value,
    result: result.value
  })
}

defineExpose({
  history,
  calculate,
  importHistory,
  clearHistory,
  addToHistory,
  exportHistory,

})
</script>
