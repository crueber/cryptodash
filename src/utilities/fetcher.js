
export async function getMarketData() {
    const data = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&price_change_percentage=24h,30d,1y&per_page=20&page=1&sparkline=true")
    const dataObj = {}

    if (!data.ok) throw new Error()
    const dataJson = await data.json()
    dataJson.forEach(i => dataObj[i.symbol] = i)

    return dataObj
}

let tickerActive = null
export function marketTicker(tick, seconds = 600) {
    if (tickerActive) return;

    let countdown = seconds
    tickerActive = setInterval(() => {
        countdown--

        if (countdown > 0 || !document.hasFocus()) return tick(false, countdown)

        countdown = seconds
        tick(true, countdown)
    }, 1000)
}
