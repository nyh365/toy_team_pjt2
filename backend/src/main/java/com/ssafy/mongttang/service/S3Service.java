package com.ssafy.mongttang.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;

@Slf4j
@RequiredArgsConstructor
@Component
public class S3Service {
    private final AmazonS3Client amazonS3Client;

    //application.yml에 설정
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    //이미지 업로딩. dirName은 폴더명이며 dirName/멀티파트파일의 이름+현재시간의 이름으로 파일이 생성된다. 반환값은 경로값이다.
    public String uploadFile(MultipartFile multipartFile, String dirName) throws IOException {
        log.info("[uploadImage] 이미지 업로드 시작." );
        String fileName = dirName + "/" + multipartFile.getName() + LocalDateTime.now();

        ObjectMetadata objectMetaData = new ObjectMetadata();
        objectMetaData.setContentType(multipartFile.getContentType());
        objectMetaData.setContentLength(multipartFile.getSize());

        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, multipartFile.getInputStream(), objectMetaData));
        log.info("[uploadImage] 이미지 업로드 완료. 저장된 경로 : {}", fileName);
        return fileName;
    }

    //폴더명을 포함한 파일 이름(경로)를 받아 삭제한다.
    public void deleteFile(String fileName) {
        log.info("[deleteImage] 이미지 삭제 시작. 대상 파일 : {}", fileName);
        amazonS3Client.deleteObject(new DeleteObjectRequest(bucket, fileName));
        log.info("[uploadImage] 이미지 삭제 완료." );
    }
}


