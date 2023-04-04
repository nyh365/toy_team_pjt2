package com.ssafy.mongttang.dto;

import com.ssafy.mongttang.entity.Book;
import lombok.Getter;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;

@Getter
public class ResponseBookEditDto {
    @NotNull
    private int challengeId;
    @NotNull
    private int bookId;
    @NotNull
    private String bookTitle;
    @NotNull
    private String bookSummary;
    @NotNull
    private String bookContent;
    @NotNull
    private int artistId;
    private ArrayList<IllustInfo> illusts;

    public ResponseBookEditDto(Book book, ArrayList<IllustInfo> illusts) {
        this.challengeId = book.getBookChallengeId().getChallengeId();
        this.bookId = book.getBookId();
        this.bookTitle = book.getBookTitle();
        this.bookSummary = book.getBookSummary();
        this.bookContent = book.getBookContent();
        this.artistId = book.getBookUserId().getUserId();
        this.illusts = illusts;
    }
}
