import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import styles from "./EditingReasonKeyword.module.css";
import EditingSubmitButton from "../atom/EditingSubmitButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

interface EditingReasonKeywordProps {
  editedTradeAt?: Date;
  editedCorpName?: string;
  editedOptionBuySell?: string;
  editedPrice?: number;
  editedCnt?: number;
  keywordList?: string[];
  reason?: string;
  stockCode?: number;
  tradePk?: string;
}

const EditingReasonKeyword: React.FC<EditingReasonKeywordProps> = ({
  editedTradeAt,
  editedCorpName,
  editedOptionBuySell,
  editedPrice,
  editedCnt,
  keywordList,
  reason,
  stockCode,
  tradePk,
}) => {
  const [keyword, setKeyword] = useState<string>("");
  const [tags, setTags] = useState<string[]>(keywordList);
  const [editedReason, setEditedReason] = useState<string>(reason);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleTagButtonClick = (event: FormEvent) => {
    event.preventDefault();

    if (keyword) {
      setTags([...tags, `#${keyword}`]);
      // setKeyword("");
      // setKeywords([...keywords, keyword]);
    }
  };

  const handleTagClick = (clickedTag: string) => {
    const clickedKeyword = clickedTag.substring(1);

    const updatedTags = tags.filter((tag) => tag !== clickedTag);
    setTags(updatedTags);

    // const updatedKeywords = keywords.filter(
    //   (keyword) => keyword !== clickedKeyword
    // );
    // setKeywords(updatedKeywords);
  };

  const handleReason = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedReason(event.target.value);
  };

  useEffect(() => {
    console.log("뭘까", tags);
  }, [tags]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.pageTitle}>매수/매도 키워드</div>
      <div className={styles.choosenKeywords}>
        {tags.map((tag, index) => (
          <div className={styles.choosenKeyword}>
            <span
              key={index}
              className={`${styles.keyword} ${styles.h2} ${styles.horizontal}`}
              onClick={() => handleTagClick(tag)}
            >
              <div style={{ marginRight: "0.2rem", marginTop: "0.15rem" }}>
                #
              </div>
              {tag}&nbsp;
            </span>
            <FontAwesomeIcon
              icon={faCircleXmark}
              size="sm"
              color="var(--main-blue-color)"
            />
          </div>
        ))}
      </div>
      <form className={styles.keywordContainer} onSubmit={handleTagButtonClick}>
        <input
          type="text"
          // className={styles.KeywordInput}
          value={keyword}
          onChange={handleInputChange}
          className={styles.inputBox}
          placeholder="키워드를 입력하세요"
        />
        <input type="submit" value="등록" className={styles.confirmButton} />
      </form>
      <div className={styles.gap}>
        <div className={styles.pageTitle}>매수/매도 이유</div>
        <textarea
          className={styles.textArea}
          value={editedReason}
          onChange={handleReason}
        />
      </div>
      <EditingSubmitButton
        editedTradeAt={editedTradeAt}
        editedCorpName={editedCorpName}
        editedOptionBuySell={editedOptionBuySell}
        editedPrice={editedPrice}
        editedCnt={editedCnt}
        keywords={tags}
        editedReason={editedReason}
        stockCode={stockCode}
        tradePk={tradePk}
      />
    </div>
  );
};

export default EditingReasonKeyword;
