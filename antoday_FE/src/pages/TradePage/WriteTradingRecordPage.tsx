import React, { useState } from "react";
// import { useLocation } from 'react-router';
import styles from "./WriteTradingRecordPage.module.css";
import CheckTradingRecord from "../../components/TradingDairy/template/CheckTradingRecord";
import HomeKeyWords from "../../components/WordCloud/module/HomeKeyWords";
import InputConfirm from "../../components/TradingDairy/template/InputConfirm";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";

const WriteTradingRecordPage: React.FC = () => {
  // const location = useLocation();
  // console.log(location.state);
  const [tradeList, setTradeList] = useState<string[]>([]);
  //params로 넘어오는 tradePk 받아서 주기
  const { tradePk } = useParams();

  const {
    data: tradeResults,
    isLoading,
    isError,
  } = useQuery(["tradeResults", tradePk], async () => {
    if (!tradePk) {
      // tradePk가 빈 문자열인 경우 요청 보내지 않음
      return;
    }

    try {
      const response = await axios.get(
        import.meta.env.VITE_BACK_API_URL + `/api/trade/${tradePk}`
      );

      setTradeList((prev) => response.data);

      return response.data;
    } catch (error) {
      console.error("매매기록 못받아옴:", error);
      throw error;
    }
  });

  console.log("나오나?", tradeResults);

  return (
    <React.Fragment>
      <CheckTradingRecord />
      {/* 워드클라우드 완성 시에 갈아끼우기 */}
      <HomeKeyWords />
      <InputConfirm />
    </React.Fragment>
  );
};

export default WriteTradingRecordPage;
