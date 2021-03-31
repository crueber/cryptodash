<template>
    <span>
        <span class="dollars">{{ dollars }}</span>
        <span class="cents">{{ cents }}</span>
    </span>
</template>

<script>
import { toCurrency } from "../utilities/currency"

export default {
    props: {
        value: Number
    },
    computed: {
        dollars: function() {
            return toCurrency(parseInt(this.value)).replace('.00','')
        },
        cents: function() {
            const cents = String(this.value).replace(/^(\d.*\.)|(\d.*)/,'').slice(0,2) ;
            return cents.length === 0 ? '00' :
                    cents.length === 1 ? '0' + cents : cents
        }
    }
}
</script>

<style scoped>
.cents { font-size: 50%; position: relative; top: -5px; left: 1px; text-decoration: underline; }
</style>