<template>
    <div>
        <button @click="calculateResult">Calculate</button>
        <div v-if="result !== null">
            Result: {{ result }}
        </div>
    </div>
</template>
  
<script>
export default {
    props: ['result'],
    methods: {
        calculateResult() {
            this.$emit('calculate');
        }
    }
};
</script>
  