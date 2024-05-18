<template>
  <div id="app">
    <ResultComponent :result="currentResult" @calculate="calculate" />
  </div>
</template>
  
<script>
import ResultComponent from './components/Result.vue';

export default {
  components: {
    ResultComponent,
  },
};
</script>
  