package com.ssafy.mongttang.dto;

import com.ssafy.mongttang.entity.Notice;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReqNoticeUpdateFormDto {

    private int noticeId;
    @NotBlank(message = "제목은 필수 입력 값입니다.")
    private String noticeTitle;
    @NotBlank(message = "내용은 필수 입력 값입니다.")
    private String noticeContent;
}
