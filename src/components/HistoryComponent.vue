<template>
  <div>
    <CalculatorComponent ref="child" @calculated="handleCalculated" v-model:history="historyValue" />
    <div class="history">
      <div v-for="(entry, index) in historyValue" :key="index">
        {{ entry.num1 }} {{ getOperationSymbol(entry.operation) }} {{ entry.num2 }} = {{ entry.result }}
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
const emit = defineEmits(['finished'])
const child = ref<InstanceType<typeof CalculatorComponent>>();
const historyValue = ref<HistoryEntry[]>([]);

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
