<template>
    <div>
        <ul>
            <li v-for="(entry, index) in history" :key="index">
                {{ entry.num1 }} {{ entry.operation }} {{ entry.num2 }} = {{ entry.result }}
            </li>
        </ul>
        <button @click="exportHistory">Export History</button>
        <input type="file" @change="importHistory" />
        <button @click="clearHistory">Clear History</button>
    </div>
</template>
  
<script lang="ts">

export default {
    props: ['history'],
    methods: {
        exportHistory() {
            const dataStr = JSON.stringify(this.history);
            const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
            const exportFileDefaultName = 'history.json';
            let linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
        },
        importHistory(event: any) { // todo: types
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e: any) => { // todo:types
                    try {
                        const importedHistory = JSON.parse(e.target.result);
                        this.$emit('imported', importedHistory);
                    } catch (error) {
                        console.error('Error importing history', error);
                    }
                };
                reader.readAsText(file);
            }
        },
        clearHistory() {
            this.$emit('cleared');
        }
    }
};
</script>
  