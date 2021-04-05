<template>
  <div id="app">
    <Header :time_left="time_left" />
    <CoingeckoError v-if="error" />
    <Dashboard v-if="!error" v-show="!edit" :data="data" :records="pageRecords" :pages="pages" />
    <CoinData v-show="edit" :records="records" @save="saveCoins" />
    <Footer @refresh="initData" @edit="editCoins" />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Dashboard from './components/dashboard/Dashboard.vue'
import CoinData from './components/CoinData.vue'
import CoingeckoError from './components/errors/Coingecko'

import { getMarketData, marketTicker } from './utilities/fetcher'

import defaultCoins from './data/defaultCoins.json'

const storage = window.localStorage

export default {
  name: 'App',
  components: {
    Dashboard,
    CoinData,
    Header,
    Footer,
    CoingeckoError
  },
  methods: {
    initData: async function() {
      this.refreshed_date = new Date()

      try { 
        const dataObj = await getMarketData.apply(this, []) 

        this.data = dataObj
        this.calls += 1
        if (this.error) this.error = false
      } catch { this.error = true }
    },
    marketTick: function(refreshNow, timeLeft) {
      this.time_left = timeLeft
      if (refreshNow) this.initData()
    },
    editCoins: function() {
      this.edit = !this.edit
    },
    saveCoins: function(coins) {
      storage.setItem("coins", JSON.stringify(coins))
      this.records = coins
      this.edit = false
    }
  },
  mounted: function() {
    this.initData()
    marketTicker(this.marketTick)

    document.addEventListener('keyup', (e) => {
        if (this.edit) {
          if (e.keyCode === 27) return this.editCoins()
        }
        const keyFromCode = String.fromCharCode(e.keyCode);
        switch (keyFromCode.toLowerCase()) {
          case 'e': this.editCoins(); break;
          case 't': window.EventBus.$emit('toggleTrend'); break;
          case 'm': window.EventBus.$emit('toggleMarket'); break;
        }
    })
  },
  computed: {
    pages: function() {
      const pages = new Set()
      Object.keys(this.pageRecords).forEach(i => pages.add(i))
      return [...pages]
    },
    pageRecords: function() {
      const pageRecords = {}
      this.records.forEach((r) => {
        const page = Array.isArray(r.page) ? r.page : (r.page ? [r.page] : ['Default'])
        page.forEach(i => {
          if (pageRecords[i]) pageRecords[i].push(r)
          else pageRecords[i] = [r]
        })
      })
      return pageRecords
    }
  },
  data: function () {
    if (storage.getItem("coins") === null) storage.setItem("coins", JSON.stringify(defaultCoins))
    const records = JSON.parse(storage.getItem("coins"))

    return {
      calls: 0,
      data: null,
      edit: false,
      error: false,
      refreshed_date: null,
      time_left: null,
      records
    }
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ccc;
  margin: 0;
}
#app >>> a { color: #88e }
@media only screen and (max-width: 608px) {
  #app { width: 608px; }
}
</style>
