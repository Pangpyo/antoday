interface CompanyInfo {
    corpCode: string;
    corpName: string;
    isLiked: boolean;
    logoUrl: string;
    stockCode: string;
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
}