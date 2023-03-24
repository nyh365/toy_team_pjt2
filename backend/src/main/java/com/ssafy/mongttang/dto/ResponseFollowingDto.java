package com.ssafy.mongttang.dto;

import com.ssafy.mongttang.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseFollowingDto {
    private int userId;
    private String userNickname;
    private String profileImgURL;

    public ResponseFollowingDto(User user){
        this.userId = user.getUserId();
        this.userNickname = user.getUserNickname();
        this.profileImgURL = user.getUserProfileImg();
    }
}
