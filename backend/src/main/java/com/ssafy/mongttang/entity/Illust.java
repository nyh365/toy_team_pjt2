package com.ssafy.mongttang.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "illust")
public class Illust {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int illustId;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "illust_book_id")
    private Book illustBookId;

    @NotNull
    private String illustOriginalFilename;
    @NotNull
    private String illustFilePath;

    @NotNull
    private int illustPageNumber;

    @Builder

    public Illust(Book illustBookId, String illustOriginalFilename, String illustFilePath, int illustPageNumber) {
        this.illustBookId = illustBookId;
        this.illustOriginalFilename = illustOriginalFilename;
        this.illustFilePath = illustFilePath;
        this.illustPageNumber = illustPageNumber;
    }
}
