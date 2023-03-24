package com.ssafy.mongttang.repository;

import com.ssafy.mongttang.entity.Book;
import com.ssafy.mongttang.entity.BookReport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookReportRepository  extends JpaRepository<BookReport, Integer> {
    BookReport findBookReportByBookreportBookIdAndAndBookreportReportUserId(Book book, int userId);
}
