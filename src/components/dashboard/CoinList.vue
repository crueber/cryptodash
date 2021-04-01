<template>
  <table>
    <thead>
      <th class="location">Location</th>
      <th class="symbol">Symbol</th>
      <th># Owned</th>
      <th>USD Value</th>
    </thead>
    <tbody>
      <CoinItem v-for="entry, index in entries" :key="index" :item="entry" />
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td><FiatValue :value="totalCmp" /></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import CoinItem from "./CoinItem"
import FiatValue from "../shared/FiatValue"

export default {
  name: 'CoinList',
  components: {
    CoinItem,
    FiatValue
  },
  props: {
    data: Object,
    coins: Array
  },
  computed: {
    entries: function() {
      return this.coins.map((a) => {
        const i = a.split(',')
        return {
          amount: parseFloat(i[1]),
          location: i[2],
          symbol: i[0],
          symbol_price: this.data[i[0]]?.current_price,
          symbol_image: this.data[i[0]]?.image,
          total: (this.data[i[0]]?.current_price || 0) * i.amount
        }
      })
      .filter(i => !!i.symbol_price).sort(function(a,b) { return b.total - a.total})
    },
    totalCmp: function() {
      return this.entries.map(coin => (coin.amount || 0) * coin.symbol_price).reduce((p, c) => { return p + c }, 0)
    }
  }
}
</script>

<style scoped>
table { margin: .75rem auto; width: 80%; }
th { border-bottom: 1px #996666 dashed; }
tbody >>> tr:first-child td { padding-top: 0.5rem;}
tbody >>> td:first-child span { font-size: 10px; position: relative; top: -4px; }
th, tbody >>> td { text-align: right; width: 100px; }
th.symbol, th.location { text-align: center; }
tr:last-child > td:last-child > span { display: inline-block; padding: 0.5rem 0 0 0.5rem; border-top: 1px #996666 dashed; }
.value { font-weight: 1000; }
</style>
