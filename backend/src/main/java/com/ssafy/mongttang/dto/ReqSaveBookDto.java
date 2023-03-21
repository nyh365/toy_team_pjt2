package com.ssafy.mongttang.dto;

import com.ssafy.mongttang.entity.Book;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
public class ReqSaveBookDto {

    @NotNull
    private int challengeId;
    @NotNull(message = "제목은 필수 입력 값입니다.")
    private String bookTitle;
    private String bookSummary;
    private String bookContent;
    @NotNull
    private String isComplete;
}
