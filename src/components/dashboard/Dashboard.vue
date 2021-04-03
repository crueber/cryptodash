<template>
  <div class="market">
    <div v-if="data" class="coinage">
      <div class="coinEntry"><MarketHeader :marketData="data" :symbols="currentSymbols" /></div><br />
      <div class="paging">
        <span></span>
        <span>
          <span v-if="selectedPage === null">Market</span>
          <span v-else><a href="#" @click="marketOnly($event)">Market</a></span>
          <span class="therefore">&therefore;</span>
        </span>
        <span v-for="page, index in pages" :key="page">
          <span v-if="index !== 0" class="therefore">&therefore;</span>
          <span v-if="page === selectedPage">{{ page.slice(0,1).toUpperCase() + page.slice(1) }}</span>
          <a v-else href="#" @click="select(page, $event)">{{ page.slice(0,1).toUpperCase() + page.slice(1) }}</a>
        </span>
      </div>
      <span v-for="record in currentRecords" :key="record.name" class="coinEntry">
        <h3>{{ record.name }}</h3>
        <CoinList :data="data" :coins="record.coins" />
      </span>
      <div class="empty" v-if="currentRecords.length === 0">&mdash;</div>
    </div>
  </div>
</template>

<script>
import CoinList from './CoinList.vue'
import MarketHeader from './MarketHeader.vue'

import { computeSymbols } from '../../utilities/currency'

export default {
  name: "Dashboard",
  components: {
    CoinList,
    MarketHeader
  },
  props: {
    records: Object,
    pages: Array,
    data: Object
  },
  methods: {
    select: function(page, event) {
      event.preventDefault()
      this.selectedPage = page
    },
    marketOnly: function(event) {
      event.preventDefault()
      this.selectedPage = null
    }
  },
  computed: {
    currentRecords: function() {
      return this.selectedPage === null ? [] : this.records[this.selectedPage]
    },
    currentSymbols: function() {
      if (this.selectedPage === null) {
        return Object.keys(this.data)
      }

      return computeSymbols(this.currentRecords)
    }
  },
  data: function() {
    return {
      selectedPage: this.pages[0]
    }
  }
}
</script>

<style scoped>
.market { text-align: center; margin: 0 auto; }
div.coinage { background: #333; margin-top: 0.5rem; }
.coinEntry:first-child { width: 600px; }
.coinEntry { vertical-align: top; width: 600px; margin: 0.5rem 4px; display: inline-block; background: #494949; min-height: 15rem; }
h3 { padding: .5rem .75rem .25rem; margin: 0; font-size: 12px; text-align: center; background: #444; }
.paging { font-size: 75%}
.paging > span { width: 600px; }
.paging > span:first-child { margin-right: 0.5rem; }
.paging a { text-decoration: none; }
.paging .therefore { margin: 0; padding: 0 0.25rem; }
.empty { opacity: 0; height: 0.5rem;}
</style>
