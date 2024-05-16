<script setup lang="ts">
import { ref } from 'vue'

let equation = ref('0')
let resultCalled = ref(false);
let lastResult = ref(0);


const useNumber = (num: number) => {
  equation.value = `${resultCalled.value ? num : equation.value.search(/^0/g) ? equation.value + num : (equation.value.search(/^[-]$/g) !== -1 ? equation.value + num : num)}`;
  resultCalled.value = false;
};

const plusOperator = ' + ';
const plus = () => {
  equation.value = checkOperator(equation.value, plusOperator);
}
const minusOperator = ' - ';
const minus = () => {
  equation.value = checkOperator(equation.value, minusOperator);
}
const multiplyOperator = ' x ';
const multiply = () => {
  equation.value = checkOperator(equation.value, multiplyOperator);
}
const divideOperator = ' / ';
const divide = () => {
  equation.value = checkOperator(equation.value, divideOperator);
}


// todo: rename eq
const checkOperator = (eq: string, requestedOperator: string) => {
  if (eq.search(/^0$/g) !== -1) {
    if (requestedOperator.search(/( [/x] )$/g) !== -1) return '0';
    else return requestedOperator.replace(/ /g, '')
  } else {
    if (resultCalled.value) {
      resultCalled.value = false;
      return lastResult.value + requestedOperator;
    } else {
      return eq.replace(/( [+\-/x] )$/g, '') + requestedOperator;
    }
  }
}

const result = () => {
  let finalEqn = equation.value.replace(/( [+\-/x] )$/g, '')
  resultCalled.value = finalEqn.search(/( [+\-/x] )/g) !== -1
  // @ts-expect-error todo: fix
  let eqResult = Function('"use strict";return (' + finalEqn.replace(/( \x+ )/g, ' * ') + ')')();
  equation.value = `${eqResult.toLocaleString()}`;
  lastResult.value = eqResult;
}

const clear = () => equation.value = '0'

</script>

<template>
  <h1>Calculator</h1>
  <div class="calc">
    <div class="display">
      {{ equation }}
    </div>

    <div class="keypad">
      <!-- todo: make keypad similar to design -->
      <button class="key num" v-for="key in [1, 2, 3]" :key="key" @click="useNumber(key)">{{ key }}</button>
      <button class="key fn" @click="plus()">+</button>

      <button class="key num" v-for="key in [4, 5, 6]" :key="key" @click="useNumber(key)">{{ key }}</button>
      <button class="key fn" @click="minus()">-</button>

      <button class="key num" v-for="key in [7, 8, 9]" :key="key" @click="useNumber(key)">{{ key }}</button>
      <button class="key fn" @click="multiply()">x</button>

      <button class="key fn" @click="clear()">C</button>
      <button class="key num" @click="useNumber(0)">0</button>
      <button class="key fn" @click="divide()">/</button>
      <button class="key fn" @click="result()">=</button>
    </div>
  </div>
</template>

<style scoped>
.calc {
  width: 320px;
  height: 480px;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid #ebebeb;
  border-radius: 5px;
}

/* todo: fix styles */
.display {
  flex: 1;
  border: 2px solid #ebebeb;
  margin: 10px;
  text-align: right;
  overflow-wrap: break-word;
  padding: 6px;
  border-radius: 5px;
}

.keypad {
  height: 320px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin: 10px;
}

.key {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  border-radius: 20%;
}

.num {
  background-color: #2f2f2f;
  color: #ffffff;
}

.fn {
  background-color: #464646;
  color: #000000;
}
</style>