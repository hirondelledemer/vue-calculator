<template>
    <div id="app">
        <div>

            <CalculatorComponent @calculated="addToHistory" ref="calculator" />
        </div>
        <div>

            <ResultComponent :result="currentResult" @calculate="calculate" />
        </div>
        <div>

            <HistoryComponent :history="history" @imported="importHistory" @cleared="clearHistory" />
        </div>
    </div>
</template>
  
<script>
import CalculatorComponent from './components/Calculator.vue';
import ResultComponent from './components/Result.vue';
import HistoryComponent from './components/History.vue';

export default {
    components: {
        CalculatorComponent,
        ResultComponent,
        HistoryComponent
    },
    data() {
        return {
            history: [],
            currentResult: null
        };
    },
    methods: {
        addToHistory(calculation) {

            console.log(calculation)
            this.history.push(calculation);
            this.currentResult = calculation.result;
        },
        calculate() {
            this.$refs.calculator.calculate();
        },
        importHistory(importedHistory) {
            this.history = [...this.history, ...importedHistory.filter(entry => entry.result !== null)];
        },
        clearHistory() {
            this.history = [];
        }
    }
};
</script>
  