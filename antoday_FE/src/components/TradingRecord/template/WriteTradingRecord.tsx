  import React, { useState, useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  import DatePicker from "react-datepicker";
  import "react-datepicker/dist/react-datepicker.css";
  import styles from './WriteTradingRecord.module.css';
  import SearchingCompany from './SearchingCompany';
  import axios from 'axios';
  import { accessTokenAtom } from '../../../recoil/auth';
  import { useRecoilState } from 'recoil';
import KeywordInput from '../../TradingDairy/modules/KeywordInput';


  interface WriteTradingRecordPageProps {
    closeWritePage: () => void;
  }

  interface Company {
    stockCode: number;
    corpName: string;
    logoUrl: string;
  }


  const WriteTradingRecord: React.FC<WriteTradingRecordPageProps> = ({ closeWritePage }) => {
    const navigate = useNavigate();
    const adjustInitialDate = (date: Date): Date => {
      let adjusted = new Date(date);
      if (adjusted.getDay() !== 0 && adjusted.getDay() !== 6 && date.getHours() < 9) {
        adjusted.setDate(adjusted.getDate() - 1);
      }
      while (adjusted.getDay() === 0 || adjusted.getDay() === 6) {
        adjusted.setDate(adjusted.getDate() - 1);
      }
      
      return adjusted;
    }
    const today = new Date();
    const initialAdjustedDate = adjustInitialDate(today);
    const [selectedDate, setSelectedDate] = useState<Date>(initialAdjustedDate);
    const [selectedOption, setSelectedOption] = useState<string>('매수');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
    const [stockPrice, setStockPrice] = useState<number | null>(null);
    const [adjustedPrice, setAdjustedPrice] = useState<number | null>(null);
    const [stockQuantity, setStockQuantity] = useState(0);
    const [ownedCompanies, setOwnedCompanies] = useState<Company[]>([]);
    const [token, setToken] = useRecoilState(accessTokenAtom);
    const [forceRender, setForceRender] = useState(0);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [isChoose,setIsChoose] = useState<boolean>(false);


    const tradingData = {
      selectedDate,
      selectedCompany,
      selectedOption,
      adjustedPrice,
      stockQuantity,
    };

    const formatDateToCustom = (date: Date) => {
      if (!date) return '';
            const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = "03";
      const minutes = "41";
      const seconds = "16";
      
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    }
    


    const gotowritetradingrecord = async () => {
      let errorMessage = null;
    
      if (!selectedCompany) {
        errorMessage = "회사를 선택해주세요.";
        console.log('회사선택안함');
      } else if (stockQuantity <= 0) {
        errorMessage = "주식 개수를 지정해주세요.";
        console.log('주식개수안함');
      }
      if (errorMessage) {
        setAlertMessage(errorMessage);
        return;
      }
    
      const apiUrl = `${import.meta.env.VITE_BACK_API_URL}/api/trade`;
      console.log(tradingData.stockQuantity,  selectedOption === '매도' ? 1 : 0, tradingData.adjustedPrice, selectedCompany?.stockCode, formatDateToCustom(selectedDate))
      try {
        const response = await axios.post(apiUrl, {
          cnt: tradingData.stockQuantity,
          optionBuySell: selectedOption === '매도' ? 1 : 0,
          price: tradingData.adjustedPrice,
          stockCode: selectedCompany?.stockCode,
          tradeAt: selectedDate ? formatDateToCustom(selectedDate) : null,

          keywords: [
            "string"
          ],
          reason: "string",
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        const tradePk = response.data.tradePk;
        console.log("확인", tradePk)
        navigate(`/writetradingrecord/${tradePk}`);
        setAlertMessage(null);
        return true;
      } catch (error) {
        console.error('Fetch stock price error:', error);
        return false;
      }
    };
    

    const getIncrementValue = () => {
      if (adjustedPrice === null) return 0;

      if (adjustedPrice < 5000) return 5;
      if (adjustedPrice >= 5000 && adjustedPrice < 20000) return 10;
      if (adjustedPrice >= 20000 && adjustedPrice < 50000) return 50;
      if (adjustedPrice >= 50000) return 100;
  };

    const fetchOwnedCompanies = () => {
      axios.get((`${import.meta.env.VITE_BACK_API_URL}/api/trade/corp`),
      {headers : {
        Authorization: `Bearer ${token}`
      }})
      .then((response) => {
        setOwnedCompanies(response.data);
        // console.log(ownedCompanies)
      })
      .catch((error) => {
        console.error('Fetch owned companies error:', error);
      });
    };

    const fetchStockPrice = (stockCode: number, status: string) => {
      let apiUrl = '';
      const formattedDate = selectedDate 
    ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`
    : ''; 
      console.log(selectedDate)
      if (status === '매수') {
        apiUrl = `${import.meta.env.VITE_DATA_API_URL}/corp/price/${stockCode}`; 
        axios.get(apiUrl, {
          params: {
            target_date: formattedDate
          },
          headers: {
            Authorization : `Bearer ${token}`
          }
        })
        .then((response) => {
          const fetchedPrice = response.data.price;
          setStockPrice(fetchedPrice);
          setAdjustedPrice(fetchedPrice);
          // console.log(fetchedPrice);
        })
        .catch((error) => {
          console.error('Fetch stock price error:', error);
        });
      } else if (status === '매도') {
        apiUrl = `${import.meta.env.VITE_BACK_API_URL}/api/corp/price`; 
        axios.get(apiUrl, {
            params: {
                status: status,
            },
            headers: {
                Authorization : `Bearer ${token}`
            }
        })
        .then((response) => {
            const companyData = response.data.find((company: Company) => company.corpName === selectedCompany?.corpName);
            if (companyData) {
                const fetchedPrice = companyData.lastBuyPrice;
                setStockPrice(fetchedPrice);
                setAdjustedPrice(fetchedPrice);
            } else {
                console.error("Couldn't find matching company data for selected company.");
            }
        })
        .catch((error) => {
            console.error('Fetch stock price error:', error);
        });
    }

      
    };

    // const handleOptionChange = (option: string) => {
    //   if (selectedOption !== option) {
    //     setSelectedOption(option);
    //     setSelectedCompany(null);
    //   }
    // };

    useEffect(() => {
      if (selectedOption === '매도') {
        fetchOwnedCompanies();
      }

      if (selectedDate && selectedOption && selectedCompany) {
        fetchStockPrice(selectedCompany.stockCode, selectedOption);
        // setSelectedCompany(selectedCompany)
      } if (selectedCompany == null) {
        setStockPrice(null);
        setAdjustedPrice(null);
        console.log('test',stockPrice, adjustedPrice);
      };
      
      
    }, [selectedDate, selectedOption, selectedCompany]);



    const handleSearchCompany = (keyword: string) => {
      // setSearchKeyword(keyword);
      // setSelectedCompany(null);
      
      if (keyword !== '') {
        axios.get(`${import.meta.env.VITE_BACK_API_URL}/api/corp/search`, {
          params: {
            keyword: keyword,
            page: currentPage - 1,
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          const { content, totalPages } = response.data;
          setSearchResults(content);
          setTotalPages(totalPages);
        })
        .catch((error) => {
          console.error('Search error:', error);
        });
      } else {
        // setSearchResults([]);
      }
    };
    
    const adjustPrice = (increment: number) => {
      if (adjustedPrice !== null) {
        const newPrice = adjustedPrice + increment;
        setAdjustedPrice(newPrice);
        }
      };

    const handlePageChange = (newPage: number) => {
      setCurrentPage(newPage);
      handleSearchCompany(searchKeyword);
    };

    const handleButtonClick = async () => {
      const success = await gotowritetradingrecord();
      if (success) {
          closeWritePage();
      }
    };


    const handleClick = (option: string) => {
      if (selectedOption !== option) {
          setSelectedOption(option);
          setSelectedCompany(null);
          setForceRender((prev) => prev + 1);
          console.log(selectedCompany)
      }
  };

    

  const handleSelectCompany = (company: Company) => {
    setSelectedCompany(company);
    setSearchResults([]);      
    setSearchKeyword(''); 
    setIsChoose(true);     
};

const resetChooseState = () => {
  setIsChoose(false);
};

    // console.log(searchResults);
    return (
      <div>
        <div className={styles.horizontal}>
          <p>날짜</p>
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date) => setSelectedDate(date)}
            filterDate={(date: Date) => {
                return date.getDay() !== 0 && date.getDay() !== 6;
            }}
            placeholderText="날짜 선택"
            maxDate={initialAdjustedDate}
          />  

          <button
            className={`${selectedOption === '매수' ? styles.bold : styles.normal} ${styles.button}`}
            onClick={() => handleClick('매수')}
          >
            매수
          </button>
          <button
            className={`${selectedOption === '매도' ? styles.bold : styles.normal} ${styles.button}`}
            onClick={() => handleClick('매도')}
          >
            매도
          </button>
        </div>
    
        <div>
        <div>
  
</div>
{selectedOption === '매수' && <SearchingCompany onSearch={handleSearchCompany} resetChoose={resetChooseState} searchResults={searchResults} selectedCompany={selectedCompany} setSelectedCompany={setSelectedCompany} choose={isChoose} handleSelectCompany={handleSelectCompany} handlePageChange= {handlePageChange} totalPages={totalPages}/>}
        {selectedCompany && selectedOption === '매도' ? (
          <div>
            <div key={selectedCompany?.stockCode} className={styles.corpcontainer}>
              <img src={selectedCompany?.logoUrl} alt={selectedCompany?.corpName} />
              <span>{selectedCompany?.corpName}</span>
            </div>
          </div>
        ) : null}
        {ownedCompanies.length > 0 && selectedOption === '매도' && !selectedCompany ? (
          <div>
            <h2>보유한 주식</h2>
            {ownedCompanies.map((company) => (
              <div 
                key={company.stockCode} 
                className={styles.corpcontainer}
                onClick={() => handleSelectCompany(company)}
              >
                <img src={company.logoUrl} alt={company.corpName} />
                <span>{company.corpName}</span>
              </div>
            ))}
          </div>
        ) : (selectedOption === '매도' && ownedCompanies.length === 0 ? (
          <div>보유주식이 없습니다.</div>
        ) : null)}

    <>
      <div>
        <input
          type="number"
          value={stockQuantity === 0 ? "" : stockQuantity}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "") {
                setStockQuantity(0);
            } else {
                setStockQuantity(parseInt(value, 10));
            }
        }}
        />
        주
      </div>
      <div className={styles.horizontal}>
        <div>평단가</div>
        <div>
          <button onClick={() => adjustPrice(-getIncrementValue())}>-</button>
          {adjustedPrice !== null ? `${adjustedPrice}원` : "0 원"}
          <button onClick={() => adjustPrice(getIncrementValue())}>+</button>
        </div>
      </div>
      <button onClick={closeWritePage}>취소</button>
      <button onClick={handleButtonClick}>추가</button>
      {alertMessage && <p>{alertMessage}</p>}
    </>

        </div>
      </div>
    );
  };

  export default WriteTradingRecord;