package com.ssafy.mongttang.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.awt.print.Book;

@Getter
@Entity
@DynamicInsert
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "interestbook")
public class InterestBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "INT UNSIGNED")
    private int interestbookId;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "interestbook_user_id")
    private User interestbookUserId;

    @NotNull
    private int interestbookBookId;

    //    @NotNull
//    @ManyToOne
//    @JoinColumn(name = "interestbook_user_id")
//    private Book interestbook_book_id;

    public InterestBook(User user, int bookId) {
        this.interestbookUserId = user;
        this.interestbookBookId = bookId;
    }

//    public InterestBook(User user, book book) {
//        this.interestbook_user_id = user;
//        this.interestbook_book_id = book;
//    }


}
