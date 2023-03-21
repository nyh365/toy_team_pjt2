package com.ssafy.mongttang.entity;

import com.ssafy.mongttang.dto.AuthProvider;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@Entity
@DynamicInsert
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user")
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    @Column(length = 30)
    @NotNull
    private String userEmail;

    @Column(length = 11)
    private String userRole;

    @Column(length = 50)
    private String userNickname;

    @Enumerated(EnumType.STRING)
    @Column(length = 6)
    private AuthProvider userProvider;

    @Column
    private String userProviderId;

    @Column
    private String userInfo;

    @Column
    @ColumnDefault("defaultImg")
    private String userProfileImg;

    @Builder
    public User(int userId, String userEmail, String userNickname, AuthProvider userProvider, String userProviderId ){
        this.userId = userId;
        this.userEmail = userEmail;
        this.userNickname = userNickname;
        this.userRole = "ROLE_READER";
        this.userProvider = userProvider;
        this.userProviderId = userProviderId;
        this.userProfileImg = "defaultImg";
    }

    public void changeNickname(String nickname) {
        this.userNickname = nickname;
    }

    public void changeProfileImg(String userProfileImg) {
        this.userProfileImg = userProfileImg;
    }

    public void deleteUser() {
        changeNickname("(알 수 없음)");
        this.userProviderId = "del";
    }
}
