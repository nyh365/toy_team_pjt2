package com.ssafy.mongttang.service;

import com.ssafy.mongttang.entity.User;
import com.ssafy.mongttang.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final S3Service s3Service;

    public User nicknameDpcn(String userNickname) {
        return userRepository.findByUserNickname(userNickname);
    }

    public User nicknameModify(int userId, String userNickname) {
        User user = userRepository.findByUserId(userId);
        if(user == null) return null;
        else {
            user.changeNickname(userNickname);
            return userRepository.save(user);
        }
    }

    public User getUser(int userId) {
        return userRepository.findByUserId(userId);
    }

    public User userDelete(int userId) {
        User user = userRepository.findByUserId(userId);
        if(user == null) return null;
        else {
            user.deleteUser();
            return userRepository.save(user);
        }
    }

    public String profileImgModify(int userId, MultipartFile userImg) throws IOException {
        User user = userRepository.findByUserId(userId);
        if(user != null){
            String profilePath = s3Service.uploadProfile(userImg, userId);
            if(profilePath == null) return null;
            user.changeProfileImg(profilePath);
            return userRepository.save(user).getUserProfileImg();
        }
        return null;
    }
}
