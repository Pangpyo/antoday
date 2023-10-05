interface CompanyInfo {
    corpCode?: string;
    corpName?: string;
    isLiked?: boolean;
    logoUrl?: string;
    stockCode?: string;
    corp_name?: string;
    logo_url?: string;
    stock_code?: string;
}

interface TradingRecord {
    tradeAt?: string;
    stockCode?: number;
    logoUrl?: string;
    optionBuySell?: string;
    price?: number;
    cnt?: number;
    keywordList? : string[];
    reason? : string;
    corpName? : string;
    tradePk?: string;
    aiAnalyze? : string;
}

interface stockIntro {
    change? : number;
    corp_name? : string;
    index?: number;
    market? : string;
    percentageChange? : number;
    stock_code? : string
    lowValue? : number;
    highValue? : number;
    low52? : number;
    high52? : number;
}