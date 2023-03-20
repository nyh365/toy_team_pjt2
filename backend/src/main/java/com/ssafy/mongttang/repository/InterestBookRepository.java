package com.ssafy.mongttang.repository;

import com.ssafy.mongttang.entity.InterestBook;
import com.ssafy.mongttang.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.awt.print.Book;

public interface InterestBookRepository extends JpaRepository<InterestBook, Integer> {


    InterestBook findByInterestbookUserIdAndInterestbookBookId(User user, int bookId);
//    InterestBook findByUserIdAndBookId(User user, Book book);
}
