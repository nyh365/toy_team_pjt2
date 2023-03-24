package com.ssafy.mongttang.dto;

import com.ssafy.mongttang.entity.Challenge;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
public class ResponseThisWeekChallengeDto {
    private String challengeTitle;
    private String challengeContent;
    private String challengeSummary;
    private LocalDateTime challengeStartDate;
    private LocalDateTime challengeEndDate;
    private List<ResponseChallengeBookInfoDto> bookList;

    public ResponseThisWeekChallengeDto(Challenge challenge, List<ResponseChallengeBookInfoDto> bookList) {
        this.challengeTitle = challenge.getChallengeTitle();
        this.challengeContent = challenge.getChallengeContent();
        this.challengeSummary = challenge.getChallengeSummary();
        this.challengeStartDate = challenge.getChallengeStartDate();
        this.challengeEndDate = challenge.getChallengeEndDate();
        this.bookList = bookList;
    }
}
