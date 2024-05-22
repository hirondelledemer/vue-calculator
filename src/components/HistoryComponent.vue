<template>
  <div>
    <CalculatorComponent ref="child" @calculated="handleCalculated" v-model:history="historyValue" />
    <div class="history">
      <div class="historyEntry" v-for="(entry, index) in historyValue" :key="index"
        @click="() => setValuesFromHistory(index)">
        <div>
          {{ entry.num1 }} {{ getOperationSymbol(entry.operation) }} {{ entry.num2 }} = {{ entry.result }}
        </div>
        <div class="historyEntryArrow">
          &#x21A9;
        </div>
      </div>
    </div>
    <div class="actions">
      <button v-if="historyValue.length !== 0" class="button" @click="exportHistory">Export History</button>
      <label for="file-upload" class="button fileButton">
        Import History
      </label>
      <input id="file-upload" type="file" @change="importHistory" />
      <button v-if="historyValue.length !== 0" class="button" @click="clearHistory">Clear History</button>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref, defineEmits } from 'vue'

import CalculatorComponent, { type HistoryEntry } from './CalculatorComponent.vue';
import { Operation } from '../utils/types';

const emit = defineEmits(['finished'])
const child = ref<InstanceType<typeof CalculatorComponent>>();
const historyValue = ref<HistoryEntry[]>([]);

const handleCalculated = (calculation: HistoryEntry) => {
  emit('finished', calculation.result)
}

const calculate = () => {
  child.value!.calculate();
}

const getOperationSymbol = (operation: Operation) => {
  switch (operation) {
    case Operation.sum: return '+';
    case Operation.minus: return '-';
    case Operation.multiply: return '*';
    case Operation.divide: return '/';
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

const setValuesFromHistory = (index: number) => {
  child.value!.setValuesFromHistory(index);
}

defineExpose({
  calculate
})
</script>

<style scoped>
.button {
  border: 2px solid #545454;
  border-radius: 5px;
  background-color: #2f2f2f;
  color: #ffffff;
  font-size: 15px;
  padding: 6px 12px;
  cursor: pointer;
  margin-top: 12px
}

.history {
  margin-top: 12px;
}

.historyEntry {
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  &:hover {
    color: #ffffff
  }
}

.historyEntryArrow {
  margin-left: 6px;
}

.fileButton {
  display: inline-block;
  text-align: center;
}

input[type="file"] {
  display: none;
}

.actions {
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: 12px;
}
</style>
