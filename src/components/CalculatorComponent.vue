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

<script>
export default {
  data() {
    return {
      num1: 0,
      num2: 0,
      operation: 'sum',
      result: null
    };
  },
  methods: {
    calculate() {
      switch (this.operation) {
        case 'sum':
          this.result = this.num1 + this.num2;
          break;
        case 'minus':
          this.result = this.num1 - this.num2;
          break;
        case 'multiply':
          this.result = this.num1 * this.num2;
          break;
        case 'divide':
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
    }
  }
};
</script>
