package com.ssafy.mongttang.dto;

import com.ssafy.mongttang.entity.Book;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ResponseChallengeBookInfoDto {
    private int bookId;
    private String bookTitle;
    private String bookSummary;
    private int artistId;
    private String artistNickname;
    private String bookImgUrl;
    private String profileImgURL;
    private int numOfComment;

    private int numOfLike;

    private boolean isLiked;
    public ResponseChallengeBookInfoDto(Book book, String coverImgURL, int numOfComment, int numOfLike, boolean isLiked) {
        this.bookId = book.getBookId();
        this.bookTitle = book.getBookTitle();
        this.bookSummary = book.getBookSummary();
        this.artistId = book.getBookUserId().getUserId();
        this.artistNickname = book.getBookUserId().getUserNickname();
        this.bookImgUrl = coverImgURL;
        this.profileImgURL = book.getBookUserId().getUserProfileImg();
        this.numOfComment = numOfComment;
        this.numOfLike = numOfLike;
        this.isLiked = isLiked;
    }
}
