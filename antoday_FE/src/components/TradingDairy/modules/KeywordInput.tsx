import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "../modules/KeywordInput.module.css";
import ReasonInput from "./ReasonInput";

const KeywordInput: React.FC<TradingRecord> = ({
  tradeAt,
  stockCode,
  logoUrl,
  optionBuySell,
  price,
  cnt,
  tradePk,
}) => {
  const [keyword, setKeyword] = useState<string>("");
  const [keywordList, setKeywordList] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleTagButtonClick = (event: FormEvent) => {
    event.preventDefault();

    if (keyword) {
      setTags([...tags, `#${keyword}`]);
      setKeyword("");
      setKeywordList([...keywordList, keyword]);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.pageTitle}>매수/매도 키워드</div>
      <div>
        {tags.map((tag, index) => (
          <span key={index} className={styles.keyword}>{tag}&nbsp;</span>
        ))}
      </div>
      <form className={styles.keywordContainer} onSubmit={handleTagButtonClick}>
        <input
          type="text"
          // className={styles.KeywordInput}
          value={keyword}
          onChange={handleInputChange}
          className={styles.inputBox}
        />
        <input type="submit" value="등록" className={styles.confirmButton} />
      </form>
      <ReasonInput
        tradeAt={tradeAt}
        stockCode={stockCode}
        logoUrl={logoUrl}
        optionBuySell={optionBuySell}
        price={price}
        cnt={cnt}
        keywordList={keywordList}
        tradePk={tradePk}
      />
    </div>
  );
};

export default KeywordInput;
