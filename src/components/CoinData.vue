<template>
    <div class="edit">
        <h4>Current Personal Data</h4>
        <textarea ref="textarea" name="data" id="coindata" v-model="data" @keyup.ctrl.enter="save"></textarea><br />
        <div v-show="error">Unable to save. Make sure you are entering valid JSON.</div>
        <button @click="save">Save</button>
    </div>
</template>

<script>
export default {
    props: {
        records: Array
    },
    mounted: function() {
        this.$refs.textarea.focus()
    },
    data: function() {
        return {
            error: false,
            data: JSON.stringify(this.records, null, 2)
        }
    },
    methods: {
        save: function() {
            try {
                const data = JSON.parse(this.data)
                this.$emit('save', data)
                this.error = false
            } catch { this.error = true }
        }
    }
}
</script>


<style scoped>
.edit { text-align: center; margin: 0.5rem auto; background: #333; padding: 0.5rem 0; }
textarea { width: 600px; height: 30rem; margin: 0.5rem auto; background: transparent; color: white; border: 1px solid #666 }
h4 { margin: 0 auto; }
</style>
