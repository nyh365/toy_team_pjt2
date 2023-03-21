package com.ssafy.mongttang.repository;

import com.ssafy.mongttang.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
public interface BookRepository extends JpaRepository<Book,Integer> {

    Book findByBookId(int bookId);
}
