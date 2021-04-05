<template>
    <div>
        <div class="date">
            {{updated_at}}
            (
                <span v-if="trend"><a href="#" @click.prevent="toggleTrend">trend</a></span>
                <span v-else><a href="#" @click.prevent="toggleTrend">percentile</a></span>
            )
        </div>
        <table>
            <thead>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
                <th class="small">USD Value</th>
                <th class="small">Cap</th>
                <th class="small">ATH</th>
                <th class="small">24h</th>
                <th class="small">30d</th>
                <th class="small">1y</th>
                <th class="small">7d Sparkline</th>
            </thead>
            <tbody>
                <tr v-for="datum, index in data" :key="index">
                    <td>{{ datum.market_cap_rank }}</td>
                    <td>
                        <a target="_new" :href="'https://www.coingecko.com/en/coins/' + datum.id">
                            <img :src="datum.image" />
                            <span>{{ datum.symbol }}</span>
                        </a>
                    </td>
                    <td><FiatValue :value="datum.current_price" /></td>
                    <td class="small">{{ toCurrency(parseInt(datum.market_cap)).replace(/,\d{3},\d{3}\.\d{2}$/,'M').replace('.00','') }}</td>
                    <td class="small"><FiatValue :value="datum.ath" /></td>
                    <td class="small" v-for="percentage,index in percentages" :key="index">
                        <span v-if="datum[percentage] && !trend" :style="{ color: datum[percentage] && datum[percentage] > 0 ? '#dfd' : '#ebb' }">
                            {{ datum[percentage] > 0 ? "+" : "" }}{{ datum[percentage].toFixed(1) }}%
                        </span>
                        <span v-if="datum[percentage] && datum[percentage] !== 0 && trend">
                            <svg width="10" height="14" viewBox="0 0 10 14" stroke-width="1" :stroke="datum[percentage] > 0 ? '#88a' : '#b66'">
                                <path fill="none"  :d="'M1 7L9 ' + (7 + trendLine(datum[percentage],percentage))"/>
                            </svg>
                            <!-- {{datum[percentage]}} -->
                            <!-- <trend :data="[0, Math.ceil(datum[percentage])]"
                                   :gradient="['#b22', '#8d8']"
                                   min="-100" max="100"
                                   height="14" width="10" padding="1" stroke-width="2" /> -->
                        </span>
                    </td>
                    <td>
                        <trend 
                            :data="datum.sparkline_in_7d.price" 
                            :gradient="['#8d8','#446']" 
                            :height="14" :width="75" :padding="1" 
                            stroke-width="2">
                        </trend>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import FiatValue from '../shared/FiatValue'
import { toCurrency, toCrypto } from '../../utilities/currency'

const update_at_fn = function() { 
    const d = new Date() 
    this.updated_at = ("0" + d.getUTCDate()).slice(-2) + "/" + ("0" + (d.getUTCMonth()+1)).slice(-2) + "/" + d.getUTCFullYear() + " " + d.toLocaleTimeString()
}


export default {
    props: {
        marketData: Object,
        symbols: Array
    },
    components: {
        FiatValue
    },
    created: update_at_fn,
    updated: update_at_fn,
    methods: {
        toCurrency,
        toCrypto,
        toggleTrend: function() { this.trend = !this.trend },
        trendLine: function(percent, type) {
            let amount = Math.abs(percent)

            if (type.includes('24h')) amount = Math.log(amount * (percent > 0 ? 10 : 2))
            else {
                const factor = type.includes('30d') ? 5 : 10
                amount = Math.log(amount * factor)
            }

            return percent > 0 ? -(amount+1) : (amount+1)
        }
    },
    computed: {
        data: function() {
            return Object.values(this.marketData).filter(t => this.symbols.includes(t.symbol)).sort(function(a,b) { return a.market_cap_rank - b.market_cap_rank })
        }
    },
    data: function() {
        return {
            trend: true,
            updated_at: null,
            percentages: [
                'price_change_percentage_24h_in_currency',
                'price_change_percentage_30d_in_currency',
                'price_change_percentage_1y_in_currency'
            ]
        }
    },
    mounted: function() {
        window.EventBus.$on('toggleTrend', () => { this.toggleTrend() })
    }
}
</script>

<style scoped>
img { height: 1rem; margin: auto 0; }
table { margin: 0.25rem auto 1rem; }
td, th { border-bottom: 1px dotted #666 }
td { text-align: right; padding-right: .75rem; }
tr > td:first-child { font-size: 10px; padding-left: 0.5rem }
tr > td:nth-child(2) { text-align: left; }
tr > td:nth-child(2) img { vertical-align: middle;}
tr > td:nth-child(2) span { margin: 0 0 0 0.5rem; font-size: 75%; }
th.small, td.small { font-size: 10px; padding-right: 0.25rem;}
span.small { font-size: 10px; position: relative; top: -5px; left: -2px; text-decoration: underline; }
a { text-decoration: none; }
.date { display: block; text-align: center; padding: 0.25rem 0.25rem 0 0; font-size: 60%; opacity: 0.7; background: #444}
</style>