package com.ssafy.mongttang.repository;

import com.ssafy.mongttang.entity.Book;
import com.ssafy.mongttang.entity.User;
import org.hibernate.sql.Select;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.ArrayList;
import java.util.List;

public interface BookRepository extends JpaRepository<Book,Integer> {

    Book findByBookId(int bookId);

    @Query("select b from Book b where b.bookStatus = 'complete'")
    List<Book> findAllBooks();
    ArrayList<Book> findByBookUserIdAndBookStatus(User user, String complete);
}
