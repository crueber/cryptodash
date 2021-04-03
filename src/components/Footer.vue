<template>
    <div class="footer">
      <div class="left">
        <a href="#" @click="emit('refresh', $event)">Refresh Market Data</a>
        <a href="#" @click="emit('edit', $event)">Edit Coin Data</a>
      </div>
    </div>
</template>

<script>
export default {
    methods: {
      emit: function(e, event) {
        event.preventDefault()
        this.$emit(e)
      }
    }
}
</script>

<style scoped>
.footer { width: 600px; margin: 0.75rem auto 0; font-size: 12px; }
.footer > .left a { text-decoration: none; border: 1px solid #88e; padding: 5px 6px 3px 6px; margin-right: 0.5rem;}
</style>