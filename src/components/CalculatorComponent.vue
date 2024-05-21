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
      result: null,
      history: []
    };
  },
  methods: {
    addToHistory(calculation) {
      this.history.push(calculation);
    },
    exportHistory() {
      const dataStr = JSON.stringify(this.history);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      const exportFileDefaultName = 'history.json';
      let linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    },
    clearHistory() {
      this.history = [];
    },
    importHistory(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const importedHistory = JSON.parse(e.target.result);
            this.history = [...this.history, ...importedHistory.filter(entry => entry.result !== null)];
          } catch (error) {
            console.error('Error importing history', error);
          }
        };
        reader.readAsText(file);
      }
    },
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

      this.addToHistory({
        num1: this.num1,
        num2: this.num2,
        operation: this.operation,
        result: this.result
      });

      this.$emit('calculated', {
        num1: this.num1,
        num2: this.num2,
        operation: this.operation,
        result: this.result
      })
    }
  }
};
</script>
