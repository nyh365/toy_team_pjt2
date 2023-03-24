package com.ssafy.mongttang.dto;

import com.ssafy.mongttang.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Getter
@NoArgsConstructor
public class ResponseProfileDto {

    private int userId;
    private String profileImgURL;
    private String userNickname;
    private String userInfo;
    private int numOfFollower;
    private int numOfFollowing;

    private boolean isFollow;
    private ArrayList<BookInfo> myBooks;
    private ArrayList<BookInfo> inCompleteBooks;
    private ArrayList<BookInfo> interestBooks;
    private ArrayList<BookInfo> paidBooks;

    public ResponseProfileDto(User user, int numOfFollower, int numOfFollowing) {
        this.userId = user.getUserId();
        this.profileImgURL = user.getUserProfileImg();
        this.userNickname = user.getUserNickname();
        this.userInfo = user.getUserInfo();
        this.numOfFollower = numOfFollower;
        this.numOfFollowing = numOfFollowing;
    }

    public void addMyprofileInfo(ArrayList<BookInfo> inCompleteBooks, ArrayList<BookInfo> paidBooks) {
        this.inCompleteBooks = inCompleteBooks;
        this.paidBooks = paidBooks;
    }

    public void addIsFollow(boolean isFollow){
        this.isFollow = isFollow;
    }

    public void addMyBooksAndInterestBooks(ArrayList<BookInfo> myBookInfos, ArrayList<BookInfo> interestBookInfos) {
        this.myBooks = myBookInfos;
        this.interestBooks = interestBookInfos;
    }
}


