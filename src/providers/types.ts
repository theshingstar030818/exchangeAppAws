
export type AdaAssurance = 'CWANormal' | 'CWAStrict';
export type AdaTransactionCondition = 'CPtxApplying' | 'CPtxInBlocks' | 'CPtxWontApply' | 'CPtxNotTracked';

export type UpdateAdaWalletParams = {
    walletId: string,
    walletMeta: {
      cwName: string,
      cwAssurance: string,
      cwUnit: number,
    }
};

export type OrderType = 'Limit Sell' | 'Limit Buy';
export type OrderTimeInForce = 'Immediate or Cancel' | 'Good Til Cancelled (Default)';

export type Market = {
    ask: number,
    bid: number,
    change: number,
    created: number,
    high24hr: number,
    icon: string,
    isActive: boolean,
    lastPrice: number,
    low24hr: number,
    nameCode: string,
    primaryCurrency: string,
    secondaryCurrency: string,
    spread: number,
    volume: number,
    name: string, 
    marketId: string
}

export type Order = {
    id: string,
    type: OrderType,
    market: string,
    timeInForce: OrderTimeInForce,
    quantity: number,
    price: number,
    subtotal: number,
    commission: number,
    total: number,
    openDate: Date,
    closeDate?: Date
    unitsFilled?: number
    userId?: string
}