<template>
  <div>
    <input class="input" v-model.number="num1" type="number" placeholder="Enter first number" />
    <select class="select" v-model="operation">
      <option value="sum">+</option>
      <option value="minus">-</option>
      <option value="multiply">*</option>
      <option value="divide">/</option>
    </select>
    <input class="input" v-model.number="num2" type="number" placeholder="Enter second number" />
  </div>
</template>

<script setup lang="ts">

import { ref, defineEmits, defineModel } from 'vue'
import { Operation } from '../utils/types'

export type Result = number | null | string;
export interface HistoryEntry {
  num1: number;
  num2: number;
  operation: Operation;
  result: Result;
}

const num1 = ref<number>(0)
const num2 = ref<number>(0)
const operation = ref<Operation>(Operation.sum)
const result = ref<Result>(null)
const history = defineModel<HistoryEntry[]>('history', { default: [] })

const emit = defineEmits(['calculated'])

const addToHistory = (calculation: HistoryEntry) => {
  history.value.push(calculation);
}

const exportHistory = () => {
  const dataStr = JSON.stringify(history.value);
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
  const exportFileDefaultName = 'history.json';
  let linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}

const clearHistory = () => {
  history.value = [];
}

const importHistory = (event: Event) => {
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

const calculateResult = () => {
  switch (operation.value) {
    case Operation.sum:
      result.value = num1.value + num2.value;
      break;
    case Operation.minus:
      result.value = num1.value - num2.value;
      break;
    case Operation.multiply:
      result.value = num1.value * num2.value;
      break;
    case Operation.divide:
      if (num2.value !== 0) {
        result.value = num1.value / num2.value;
      } else {
        result.value = 'Error: Division by zero';
      }
      break;
  }
}

const calculate = () => {
  calculateResult()
  const historyEntry: HistoryEntry = {
    num1: num1.value,
    num2: num2.value,
    operation: operation.value,
    result: result.value
  }
  emit('calculated', historyEntry);
  addToHistory(historyEntry);
}

const setValuesFromHistory = (index: number) => {
  const historyEntry = history.value[index];
  num1.value = historyEntry.num1
  num2.value = historyEntry.num2
  operation.value = historyEntry.operation
  operation.value = historyEntry.operation
  result.value = historyEntry.result
  calculateResult();
  emit('calculated', historyEntry);
}

defineExpose({
  history,
  calculate,
  importHistory,
  clearHistory,
  addToHistory,
  exportHistory,
  setValuesFromHistory
})
</script>


<style scoped>
.select {
  appearance: none;
  background: none;
  color: inherit;
  box-shadow: none;


  border-radius: 20%;
  background-color: #464646;
  color: #ffffff;
  padding: 4px 12px;
  margin: 0 12px;
  font-size: 18px;
}

.input {
  background-color: transparent;
  -moz-appearance: textfield;
  color: #ffffff;

  width: 50px;
  border-radius: 5px;
  padding: 4px;
  font-size: 18px;

}

.input::-webkit-outer-spin-button,
.input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>