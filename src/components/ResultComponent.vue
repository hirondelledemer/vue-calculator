<template>
  <div class="container">
    <div>
      <HistoryComponent @finished="addResult" ref="child" />
    </div>
    <div class="result">
      <button class="button" @click="calculateResult">Calculate</button>
      <div v-if="currentResult !== null">
        Result: {{ currentResult }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HistoryComponent from './HistoryComponent.vue';
import { type Result } from './CalculatorComponent.vue';

const currentResult = ref<Result>(null)
const child = ref<InstanceType<typeof HistoryComponent>>()

const addResult = (result: Result) => {
  currentResult.value = result;
}

const calculateResult = () => {
  child.value!.calculate();
}
</script>


<style scoped>
.container {
  display: flex;
  justify-content: space-around;
}

.result {
  margin-left: 12px;
  display: flex;
  align-items: baseline;
}

.button {
  border: 2px solid #545454;
  border-radius: 5px;
  background-color: #2f2f2f;
  color: #ffffff;
  font-size: 15px;
  padding: 6px 12px;
  cursor: pointer;
  margin-right: 12px;
}
</style>