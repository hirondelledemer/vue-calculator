<template>
  <div>
    <HistoryComponent @finished="addResult" ref="child" />
    <button @click="calculateResult">Calculate</button>
    <div v-if="currentResult !== null">
      Result: {{ currentResult }}
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
<!-- todo -->
<!-- types to emit 
design -->