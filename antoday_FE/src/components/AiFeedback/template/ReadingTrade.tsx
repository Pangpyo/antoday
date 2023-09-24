
import BasicInfo from '../module/BasicInfo';
import ReasonKeywords from '../module/ReasonKeywords';
import ReasonTexts from '../module/ReasonTexts';
import styles from './ReadingTrade.module.css'


const ReadingTrade : React.FC<TradingRecord> = ({
  corpName,
  tradeAt,
  logoUrl,
  optionBuySell,
  price,
  cnt,
  keywordList,
  reason
}) => {

  return ( 
    <div>
      <div className={styles.basicContainer}>
        <div>매매일지</div>
        {/* <BasicButton content={'수정'}/> */}
        {/* <BasicButton content={'삭제'}/> */}
      </div>
      <BasicInfo 
      corpName={corpName}
      tradeAt={tradeAt}
      logoUrl={logoUrl}
      optionBuySell={optionBuySell}
      price={price}
      cnt={cnt}
      />
      <ReasonKeywords
      keywordList={keywordList}
      />
      <ReasonTexts
      reason={reason}
      />
    </div>
  );
}

export default ReadingTrade;