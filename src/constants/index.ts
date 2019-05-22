export const TRADES_WS_URL = 'wss://stream.binance.com:9443/stream?streams=btcusdt@trade';
export const MINITICKER_WS_URL = 'wss://stream.binance.com:9443/stream?streams=btcusdt@miniTicker';
export const ORDERBOOK_WS_URL = 'wss://stream.binance.com:9443/stream?streams=btcusdt@depth';
export const ORDERBOOK_SNAPSHOT_URL = 'https://www.binance.com/api/v1/depth?symbol=BTCUSDT&limit=500';

export const MAX_BUFFERED_TRADES = 100;
export const MAX_BUFFERED_ASKS = 100;
export const MAX_BUFFERED_BIDS = 100;