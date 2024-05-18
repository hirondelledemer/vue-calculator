<template>
  <div class="container">
    <div class="display">
      <div v-for="(entry, index) in providedHistory" :key="index">
        {{ entry.num1 }} {{ entry.operation }} {{ entry.num2 }} = {{ entry.result }}
      </div>
      <div class="inputs">
        <div class="input-sizer">
          <input class="input" v-model.number="num1" type="number" />
        </div>
        {{ operation }}
        <input class="input" v-model.number="num2" type="number" />

      </div>
    </div>

    <div class="keypad">
      <button class="key num" v-for="key in [1, 2, 3]" :key="key" @click="setNumber(key)">{{ key }}</button>
      <button class="key fn" @click="() => setOperator(Operation.plus)">
        +
      </button>

      <button class="key num" v-for="key in [4, 5, 6]" :key="key" @click="setNumber(key)">{{ key }}</button>
      <button class="key fn" @click="() => setOperator(Operation.minus)">
        -
      </button>
      <button class="key num" v-for="key in [7, 8, 9]" :key="key" @click="setNumber(key)">{{ key }}</button>
      <button class="key fn" @click="() => setOperator(Operation.multiply)">
        *
      </button>

      <button class="key fn" @click="clear">
        C
      </button>
      <button class="key num" @click="() => setNumber(0)">
        0
      </button>
      <button class="key fn" @click="() => setOperator(Operation.divide)">
        /
      </button>
      <button class="key fn" @click="calculate">=</button>
    </div>
  </div>
</template>

<script lang="ts">
import { inject } from 'vue';

export enum Operation {
  minus = '-',
  plus = '+',
  multiply = '*',
  divide = '/',
}

interface CalculatorData {
  num1: number | undefined;
  num2: number | undefined;
  operation: Operation | undefined;
  result: null | number | string;
}

export interface HistoryEntry {
  num1: number;
  num2: number;
  operation: Operation;
  result: number;
}
export default {

  data(): CalculatorData {
    return {
      num1: undefined,
      num2: undefined,
      operation: undefined,
      result: null
    };
  },
  setup() {
    const providedHistory = inject<HistoryEntry[]>('history');
    return {
      Operation,
      providedHistory,
    };
  },
  methods: {
    calculate() {
      this.num1 = this.num1 || 0;
      this.num2 = this.num2 || 0;

      switch (this.operation) {
        case Operation.plus:
          this.result = this.num1 + this.num2;
          break;
        case Operation.minus:
          this.result = this.num1 - this.num2;
          break;
        case Operation.multiply:
          this.result = this.num1 * this.num2;
          break;
        case Operation.divide:
          if (this.num2 !== 0) {
            this.result = this.num1 / this.num2;
          } else {
            this.result = 'Error: Division by zero';
          }
          break;

      }

      this.$emit('calculated', {
        num1: this.num1,
        num2: this.num2,
        operation: this.operation,
        result: this.result
      });

      this.num1 = typeof this.result === 'number' ? this.result : 0;
      this.num2 = undefined;
      this.operation = undefined;
    },
    setOperator: function (operation: Operation) {
      this.operation = operation
    },
    setNumToInput: function (value: number | undefined, valueToAdd: number) {
      const num = value || 0;
      return num >= 0 ? num * 10 + valueToAdd : num * 10 - valueToAdd;
    },
    setNumber: function (number: number) {

      if (this.operation) {
        this.num2 = this.setNumToInput(this.num2, number);
        return;
      }
      this.num1 = this.setNumToInput(this.num1, number);

    },
    clear: function () {
      this.num1 = undefined
      this.num2 = undefined
      this.result = null;
    }
  }
}
</script>

<style scoped>
.container {
  width: 320px;
  height: 416px;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid #ebebeb;
  border-radius: 5px;
}


.input {
  border: none;
  background-color: transparent;
  -moz-appearance: textfield;
  color: #ffffff;
  /* todo: make auto width */
  width: 50px;

}

.input::-webkit-outer-spin-button,
.input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}


.display {
  display: flex;
  flex-direction: column;
  border: 2px solid #ebebeb;
  margin: 10px;
  text-align: right;
  overflow-wrap: break-word;
  padding: 6px;
  border-radius: 5px;
  max-height: 150px;
  overflow: auto;
}

.inputs {
  display: flex;
  justify-content: end;
  margin-top: 6px;
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
  cursor: pointer;
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
