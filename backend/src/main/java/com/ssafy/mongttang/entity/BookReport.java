package com.ssafy.mongttang.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "bookreport")
public class BookReport extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookreportId;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bookreport_book_id")
    private Book bookreportBookId;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bookreport_user_id")
    private User bookreportUserId;

    @NotNull
    private String bookreportBookTitle;

    @NotNull
    private String bookreportContent;

    @NotNull
    private int bookreportReportUserId;

    @NotNull
    private String bookreportCategory;

    @Builder
    public BookReport(Book bookreportBookId, User bootreportUserId, String bookreportBookTitle, String bookreportContent, int bookreportReportUserId, String bookreportCategory) {
        this.bookreportBookId = bookreportBookId;
        this.bookreportUserId = bootreportUserId;
        this.bookreportBookTitle = bookreportBookTitle;
        this.bookreportContent = bookreportContent;
        this.bookreportReportUserId = bookreportReportUserId;
        this.bookreportCategory = bookreportCategory;
    }
}
