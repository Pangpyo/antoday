package com.omfg.antoday.user.dao;

import com.omfg.antoday.user.domain.User;
import com.omfg.antoday.user.domain.UserStockLike;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserStockLikeRepository extends JpaRepository<UserStockLike, Long> {

    Page<UserStockLike> findByUser(User user, PageRequest pageRequest);
}
