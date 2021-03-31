<template>
    <div class="footer">
      <div class="left">
        <a href="#" @click="emit('refresh', $event)">Refresh Market Data</a>
        <a href="#" @click="emit('edit', $event)">Edit Coin Data</a>
      </div>
      <div class="right">
        <div v-if="refreshed_at">Data last refreshed at: {{ refreshed_at }}</div>
        <div class="refresh">Next Refresh in {{ time_left }}s</div>
      </div>
    </div>
</template>

<script>
export default {
    props: {
        refreshed_at: String,
        time_left: Number
    },
    methods: {
      emit: function(e, event) {
        event.preventDefault()
        this.$emit(e)
      }
    }
}
</script>

<style scoped>
.footer { width: 600px; margin: 0.5rem auto 0; font-size: 12px; }
.footer > .left { float: left; margin-top: 0.25rem; }
.footer > .left a { text-decoration: none; border: 1px solid #88e; padding: 5px 6px 3px 6px; margin-right: 0.5rem;}
.footer > .right { float: right; text-align: right; opacity: 0.7; }
.footer > .right > div { padding-bottom: .1rem; }
</style>