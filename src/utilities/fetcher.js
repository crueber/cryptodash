
export async function getMarketData() {
    const data = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&price_change_percentage=24h,30d,1y&per_page=20&page=1&sparkline=false")
    const dataObj = {}

    if (!data.ok) throw new Error()
    const dataJson = await data.json()
    dataJson.forEach(i => dataObj[i.symbol] = i)

    return dataObj
}

const calculateNextRefresh = () => {
    return new Date() - 0 + (10 * 60 * 1000)
}

let tickerActive = null
export function marketTicker(tick) {
    if (tickerActive) return;
    let tock = 0
    let nextRefresh = calculateNextRefresh()

    tickerActive = setInterval(() => {
        if (!document.hasFocus() && tock < 10) return tock++;
        tock = 0;

        const now = new Date() - 0
        const seconds_left = parseInt((nextRefresh - now) / 1000)

        if (seconds_left > 0) return tick(false, seconds_left)

        nextRefresh = calculateNextRefresh()
        tick(true, seconds_left)
    }, 250)
}
