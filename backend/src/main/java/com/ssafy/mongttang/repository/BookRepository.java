package com.ssafy.mongttang.repository;

import com.ssafy.mongttang.entity.Book;

import com.ssafy.mongttang.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.ArrayList;
import java.util.List;

public interface BookRepository extends JpaRepository<Book,Integer> {

    Book findByBookId(int bookId);

    @Query("select b from Book b where b.bookStatus = 'complete'")
    List<Book> findAllBooks();

    @Query("select b from Book b where b.bookId in (:bookIdList)")
    List<Book> findDiscountBooks(ArrayList<Integer> bookIdList);

    @Query("select b from Book b where b.bookChallengeId.challengeId = :challengeId and b.bookStatus = 'complete' order by b.createdTime desc")
    List<Book> findLatesBooks(int challengeId);

    @Query("select b from Book b where b.bookTitle like concat('%', :bookTitle, '%') and b.bookStatus = 'complete'")
    List<Book> searchBooks(String bookTitle);

    ArrayList<Book> findByBookUserIdAndBookStatus(User user, String complete);
}

