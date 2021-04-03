<template>
    <div class="header">
        <h1>
            Crypto Dash
        </h1>
        <div class="subheader">
            <div class="left">
                <div class="right">
                    <div class="refresh">
                        <span v-if="time_left > 0">Refreshing in {{ time_left }}s</span>
                        <span v-else>Refresh is imminent</span>
                    </div>
                </div>
                Based on <a href="https://www.coingecko.com/en/api#explore-api">CoinGecko APIs</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        time_left: Number
    }
}
</script>

<style scoped>
.header { margin: 0 auto; padding-bottom: 0.25rem; background: #123; }
.subheader { width: 600px; margin: 0 auto; font-size: 12px; font-weight: 300; }
h1 { color: #f2f2f2; padding: 2rem 0 1rem; margin: 0; text-align: center; }

.right { float: right; text-align: right; opacity: 0.7; }
.right > div { padding-bottom: .1rem; }
</style>