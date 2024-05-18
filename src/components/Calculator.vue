<template>
  <div class="container">
    <div class="display">
      <div class="input-sizer">
        <input class="input" v-model.number="num1" type="number" />
      </div>
      <!-- todo: fix this -->
      {{ operation }}
      <input class="input" v-model.number="num2" type="number" />
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

      <button class="key fn" @click="() => console.log('todo: clear')">
        C
      </button>
      <button class="key num" @click="() => setNumber(0)">
        *
      </button>
      <button class="key fn" @click="() => setOperator(Operation.divide)">
        /
      </button>
      <button class="key fn" @click="calculate">=</button>
    </div>
  </div>
</template>

<script lang="ts">
enum Operation {
  minus = '-',
  plus = '+',
  multiply = '*',
  divide = '/',
}

interface CalculatorData {
  num1: number;
  num2: number;
  operation: Operation | undefined;
  result: null | number | string;
}
export default {
  data(): CalculatorData {
    return {
      num1: 0,
      num2: 0,
      operation: undefined,
      result: null
    };
  },
  setup() {
    return {
      Operation,
    };
  },
  methods: {
    calculate() {
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
      this.num2 = 0;
      this.operation = undefined;
    },
    setOperator: function (operation: Operation) {
      this.operation = operation
    },
    setNumber: function (number: number) {
      if (this.operation) {
        this.num2 = number;
        return;
      }
      this.num1 = number;
    }
  }
}
</script>

<style scoped>
.container {
  width: 320px;
  height: 480px;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid #ebebeb;
  border-radius: 5px;
}


/* .input-sizer {
  display: inline-grid;
  vertical-align: top;
  align-items: center;
  position: relative;
  border: solid 1px;
  padding: .25em .5em;
  margin: 5px;

  &::after,
  .input {
    width: auto;
    min-width: 1em;
    grid-area: 1 / 2;
    font: inherit;
    padding: 0.25em;
    margin: 0;
    resize: none;
    background: none;
    appearance: none;
    border: none;
  }

  &::after {
    content: attr(data-value) ' ';
    visibility: hidden;
    white-space: pre-wrap;
  }
} */

.input {
  border: none;
  background-color: transparent;
  -moz-appearance: textfield;
  color: #ffffff;
  /* todo: make auto */
  width: 50px;

}

.input::-webkit-outer-spin-button,
.input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}


.display {
  display: flex;
  justify-content: end;
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
