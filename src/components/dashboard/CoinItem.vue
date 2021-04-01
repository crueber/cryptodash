<template>
    <tr v-if="item.amount">
        <td class="location"><span>{{ item.location }}</span></td>
        <td class="symbol"><img :src="item.symbol_image" /><span>{{ item.symbol }}</span></td>
        <td class="amount"><span>{{ amountCmp }}</span></td>
        <td class="total"><span><FiatValue :value="totalCmp" /></span></td>
    </tr>
</template>

<script>
import FiatValue from '../shared/FiatValue'
import { toCrypto } from '../../utilities/currency'

export default {
  name: 'CoinItem',
  props: {
    item: Object
  },
  components: {
    FiatValue
  },
  computed: {
    amountCmp: function() {
      return this.item.amount ? toCrypto(this.item.amount, 8) : "0"
    },
    totalCmp: function() {
      return this.item.amount ? this.item.symbol_price * this.item.amount : 0
    }
  }
}
</script>

<style scoped>
img { height: 1rem; margin: auto 0; }
.symbol, .location { text-align: center; }
.symbol > span { margin: 0 0 0 5px; position: relative; top: -3px; }
.total > span { padding-left: 1rem; }
.symbol, .amount { opacity: 0.7; }
.price, .total { font-weight: 1000; }
</style>
