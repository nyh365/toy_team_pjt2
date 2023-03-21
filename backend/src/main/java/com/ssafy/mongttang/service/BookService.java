package com.ssafy.mongttang.service;

import com.ssafy.mongttang.dto.ReqCreateBookDto;
import com.ssafy.mongttang.dto.ReqUpdateBookDto;
import com.ssafy.mongttang.entity.Book;
import com.ssafy.mongttang.entity.Challenge;
import com.ssafy.mongttang.entity.Illust;
import com.ssafy.mongttang.entity.User;
import com.ssafy.mongttang.repository.BookRepository;
import com.ssafy.mongttang.repository.ChallengRepository;
import com.ssafy.mongttang.repository.IllustRepository;
import com.ssafy.mongttang.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class BookService {
    private final UserRepository userRepository;
    private final ChallengRepository challengeRepository;
    private final BookRepository bookRepository;
    private final IllustRepository illustRepository;
    private final S3Service s3Service;

    public int createBook(int userId, ReqCreateBookDto reqCreateBookDto, ArrayList<MultipartFile> imgList) throws IOException {
        User user = userRepository.findByUserId(userId);
        Challenge challenge = challengeRepository.findByChallengeId(reqCreateBookDto.getChallengeId());
        if(user == null || challenge == null || !user.getUserRole().equals("ROLE_ARTIST")) return 0;

        Book book = bookRepository.save(new Book(challenge,user,reqCreateBookDto));

        if(book == null) return 0;
        else{
            ArrayList<String> imgPathList = s3Service.uploadBook(imgList, book.getBookChallengeId().getChallengeId(), book.getBookId());
            if(imgPathList == null || imgPathList.isEmpty()) return 0;

            ArrayList<Illust> illustList = savePhoto(book, imgList, imgPathList);
            if(illustList.size() == imgList.size()) return book.getBookId();
            else{
                bookRepository.delete(book);
                s3Service.deleteFolder("books/" + reqCreateBookDto.getChallengeId() + "/" + book.getBookId());

                return 0;
            }
        }
    }

    public int updateBook(int userId, ReqUpdateBookDto reqUpdateBookDto, ArrayList<MultipartFile> imgList) throws IOException {
        User user = userRepository.findByUserId(userId);
        Challenge challenge = challengeRepository.findByChallengeId(reqUpdateBookDto.getChallengeId());
        Book book = bookRepository.findByBookId(reqUpdateBookDto.getBookId());
        if(user == null || challenge == null || book == null || book.getBookStatus().equals("complete")
            || user.getUserId() != book.getBookUserId().getUserId() || !user.getUserRole().equals("ROLE_ARTIST")) return 0;

        book.changeContent(reqUpdateBookDto);

        bookRepository.save(book);
            ArrayList<String> imgPathList = s3Service.uploadBook(imgList, book.getBookChallengeId().getChallengeId(), book.getBookId());
            if(imgPathList == null || imgPathList.isEmpty()) return 0;

            ArrayList<Illust> illustList = updatePhoto(book, imgList, imgPathList);
            if(illustList.size() == imgList.size()) return book.getBookId();
            else{
                bookRepository.delete(book);
                s3Service.deleteFolder("books/" + reqUpdateBookDto.getChallengeId() + "/" + book.getBookId());

                return 0;
            }
    }

    public int deleteBook(int userId, int bookId) {
        Book book = bookRepository.findByBookId(bookId);
        if(book != null && book.getBookStatus().equals("temporary") && userId == book.getBookUserId().getUserId()){
            s3Service.deleteFolder("books/" + book.getBookChallengeId().getChallengeId() + "/" + book.getBookId());
            bookRepository.delete(book);
            return 1;
        }
        return 0;
    }

    public ArrayList<Illust> savePhoto(Book book, ArrayList<MultipartFile> imgList, ArrayList<String> imgPathList){

        ArrayList<Illust> illustList = new ArrayList<>();

        for (int i = 0; i < imgList.size(); i++) {
            String illustOriginalFilename = imgList.get(i).getOriginalFilename();
            String illustFilePath = imgPathList.get(i);
            illustList.add(illustRepository.save(new Illust(book, illustOriginalFilename, illustFilePath, i)));
        }
        return illustList;
    }

    public ArrayList<Illust> updatePhoto(Book book, ArrayList<MultipartFile> imgList, ArrayList<String> imgPathList){
        illustRepository.deleteByIllustBookId(book);

        ArrayList<Illust> illustList = new ArrayList<>();

        for (int i = 0; i < imgList.size(); i++) {
            String illustOriginalFilename = imgList.get(i).getOriginalFilename();
            String illustFilePath = imgPathList.get(i);
            illustList.add(illustRepository.save(new Illust(book, illustOriginalFilename, illustFilePath, i)));
        }
        return illustList;
    }
}
