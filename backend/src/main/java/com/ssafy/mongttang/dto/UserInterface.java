package com.ssafy.mongttang.dto;

import lombok.Builder;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

public interface UserInterface {
     int userId = 0;

    String userEmail = null;

    String userRole = null;

    String userNickname = null;

    AuthProvider userProvider = null;

    String userProviderId = null;

    String userInfo = null;
    String userProfileImg = null;



}
