package com.ssafy.mongttang.repository;

import com.ssafy.mongttang.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer>{
    User findByUserNickname(String userNickname);
    User findByUserId(int userId);
}

