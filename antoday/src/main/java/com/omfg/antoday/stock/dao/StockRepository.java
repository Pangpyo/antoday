package com.omfg.antoday.stock.dao;

import com.omfg.antoday.stock.domain.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockRepository extends JpaRepository<Stock, String> {

    List<Stock> findAll();
    Stock findByStockCode(String stockCode);
    List<Stock> findByCorpNameStartingWith(String keyword);
    List<Stock> findByCorpNameContainingOrderByCorpNameAsc(String keyword);
}