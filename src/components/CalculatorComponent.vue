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

<script setup>


import { ref, defineExpose, defineEmits, defineModel } from 'vue'

const num1 = ref(0)
const num2 = ref(0)
const operation = ref('sum')
const result = ref(null)
const history = defineModel('history', { default: [] })
const emit = defineEmits(['calculated'])

function addToHistory(calculation) {
  history.value.push(calculation);
}

function exportHistory() {
  const dataStr = JSON.stringify(history);
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
function importHistory(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedHistory = JSON.parse(e.target.result);
        history.value = [...importedHistory.filter(entry => entry.result !== null)];
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
