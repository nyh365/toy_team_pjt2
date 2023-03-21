package com.ssafy.mongttang.repository;

import com.ssafy.mongttang.entity.Book;
import com.ssafy.mongttang.entity.InterestBook;
import com.ssafy.mongttang.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface InterestBookRepository extends JpaRepository<InterestBook, Integer> {


    InterestBook findByInterestbookUserIdAndInterestbookBookId(User user, Book book);
//    InterestBook findByUserIdAndBookId(User user, Book book);
}
