<template>
  <div id="app">
    <!-- <ResultComponent :result="currentResult" @calculate="calculate" /> -->
    <HistoryComponent />
  </div>
</template>
  
<script>
// import ResultComponent from './components/Result.vue';
import HistoryComponent from './components/HistoryComponent.vue';

export default {
  components: {
    // ResultComponent,
    HistoryComponent
  },
};
</script>
  