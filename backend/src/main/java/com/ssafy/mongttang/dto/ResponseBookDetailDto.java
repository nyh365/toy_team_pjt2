package com.ssafy.mongttang.dto;

import com.ssafy.mongttang.entity.Book;
import lombok.Getter;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;

@Getter
public class ResponseBookDetailDto {
    @NotNull
    private int bookId;
    @NotNull
    private String bookTitle;
    @NotNull
    private String bookSummary;
    @NotNull
    private int artistId;
    @NotNull
    private String artistNickname;
    @NotNull
    private String artistProfileImg;
    @NotNull
    private String illustPath;
    @NotNull
    private String isLiked;
    @NotNull
    private boolean isReported;
    @NotNull
    private boolean isReportedMany;
    private ArrayList<ResponseCommentDto> comments;

    public ResponseBookDetailDto(Book book, String illustPath, boolean isReported, boolean isReportedMany, ArrayList<ResponseCommentDto> comments) {
        this.bookId = book.getBookId();
        this.bookTitle = book.getBookTitle();
        this.bookSummary = book.getBookSummary();
        this.artistId = book.getBookUserId().getUserId();
        this.artistNickname = book.getBookUserId().getUserNickname();
        this.artistProfileImg = book.getBookUserId().getUserProfileImg();
        this.illustPath = illustPath;
        this.isReported = isReported;
        this.isReportedMany =isReportedMany;
        this.comments = comments;
    }
}
