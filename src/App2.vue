<template>
    <div id="app">
        <!-- <div>

            <CalculatorComponent @calculated="addToHistory" ref="calculator" />
        </div> -->
        <div>

            <ResultComponent :result="currentResult" @calculate="calculate" />
        </div>
        <div>

            <HistoryComponent @imported="importHistory" @calculated="addToHistory" />
        </div>
    </div>
</template>
  
<script>
import ResultComponent from './components/Result.vue';
import HistoryComponent from './components/History.vue';

export default {
    components: {
        ResultComponent,
        HistoryComponent
    },
    data() {
        return {
            currentResult: null
        };
    },
    methods: {
        addToHistory(calculation) { //todo: rename
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
  