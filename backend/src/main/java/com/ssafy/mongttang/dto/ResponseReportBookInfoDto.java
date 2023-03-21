package com.ssafy.mongttang.dto;

import com.ssafy.mongttang.entity.BookReport;
import com.ssafy.mongttang.entity.CommentReport;
import com.ssafy.mongttang.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ResponseReportBookInfoDto {
    private int bookId;
    private String bookTitle;
    private int artistId;
    private String artistNickname;
    private String reportCategory;
    private String reportContent;
    private String reporterNickname;

    private String bookStatus;

    public ResponseReportBookInfoDto(BookReport bookReport, User user) {
        this.bookId = bookReport.getBookreportBookId().getBookId();
        this.bookTitle = bookReport.getBookreportBookId().getBookTitle();
        this.artistId = bookReport.getBookreportUserId().getUserId();
        this.artistNickname = bookReport.getBookreportUserId().getUserNickname();
        this.reportCategory = bookReport.getBookreportCategory();
        this.reportContent = bookReport.getBookreportContent();
        this.reporterNickname = user.getUserNickname();
        this.bookStatus = bookReport.getBookreportBookId().getBookStatus();
    }
}
