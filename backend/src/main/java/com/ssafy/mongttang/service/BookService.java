package com.ssafy.mongttang.service;

import com.ssafy.mongttang.dto.*;
import com.ssafy.mongttang.entity.*;
import com.ssafy.mongttang.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.parameters.P;
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
    private final BookLikeRepository bookLikeRepository;
    private final CommentRepository commentRepository;
    private final CommentLikeRepository commentLikeRepository;
    private final CommentReportRepository commentReportRepository;
    private final S3Service s3Service;

    public int createBook(int userId, ReqCreateBookDto reqCreateBookDto, ArrayList<MultipartFile> imgList) throws IOException {
        User user = userRepository.findByUserId(userId);
        Challenge challenge = challengeRepository.findByChallengeId(reqCreateBookDto.getChallengeId());
        if(user == null || challenge == null) return 0;

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
            || user.getUserId() != book.getBookUserId().getUserId()) return 0;

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

    public BookLike createBookLike(int userId, int bookId) {
        User user = userRepository.findByUserId(userId);
        Book book = bookRepository.findByBookId(bookId);

        if(user == null || book == null) return null;
        else{
            BookLike bookLike = bookLikeRepository.findByBooklikeBookIdAndBooklikeUserId(book,userId);
            if(bookLike == null) {
                return bookLikeRepository.save(new BookLike(book, userId,book.getBookChallengeId().getChallengeId()));
            }
            return bookLike;
        }
    }

    public int cancleBookLike(int userId, int bookId) {
        User user = userRepository.findByUserId(userId);
        Book book = bookRepository.findByBookId(bookId);

        if(user == null || book == null) return 0;
        else{
            BookLike bookLike = bookLikeRepository.findByBooklikeBookIdAndBooklikeUserId(book, userId);
            if(bookLike == null) return 0;
            else{
                bookLikeRepository.delete(bookLike);
                return 1;
            }
        }
    }

    public ArrayList<ResponseCommentDto> createComment(ReqCreateCommentDto reqCreateCommentDto) {
        User user = userRepository.findByUserId(reqCreateCommentDto.getCommentUserId());
        Book book = bookRepository.findByBookId(reqCreateCommentDto.getCommentBookId());
        commentRepository.save(new Comment(book, user, reqCreateCommentDto.getCommentContent()));

        ArrayList<Comment> commentList = commentRepository.findByCommentBookId(book);
        ArrayList<ResponseCommentDto> comments = new ArrayList<>();

        for(Comment comment : commentList){
            int numOfLike = commentLikeRepository.countByCommentlikeCommentId(comment);
            CommentLike commentLike = commentLikeRepository.findByCommentlikeCommentIdAndCommentlikeUserId(comment,reqCreateCommentDto.getCommentUserId());
            boolean isLiked = true;
            if(commentLike == null) isLiked = false;

            CommentReport commentReport = commentReportRepository.findCommentReportByCommentreportCommentId_CommentIdAndCommentreportReportUserId(comment.getCommentId(),reqCreateCommentDto.getCommentUserId());
            boolean isReported = true;
            if(commentReport == null) isReported = false;

            comments.add(new ResponseCommentDto(comment,numOfLike,isLiked,isReported));
        }

        return comments;
    }

    public ArrayList<ResponseCommentDto> updateComment(ReqUpdateCommentDto reqUpdateCommentDto) {
        User user = userRepository.findByUserId(reqUpdateCommentDto.getCommentUserId());
        Book book = bookRepository.findByBookId(reqUpdateCommentDto.getCommentBookId());
        Comment comment = commentRepository.findCommentByCommentId(reqUpdateCommentDto.getCommentId());

        if(comment != null && comment.getCommentUserId() == user && comment.getCommentBookId() == book){
            comment.changeContent(reqUpdateCommentDto.getCommentContent());
            commentRepository.save(comment);

            ArrayList<Comment> commentList = commentRepository.findByCommentBookId(book);
            ArrayList<ResponseCommentDto> comments = new ArrayList<>();

            for(Comment ment : commentList){
                int numOfLike = commentLikeRepository.countByCommentlikeCommentId(ment);
                CommentLike commentLike = commentLikeRepository.findByCommentlikeCommentIdAndCommentlikeUserId(ment,reqUpdateCommentDto.getCommentUserId());
                boolean isLiked = true;
                if(commentLike == null) isLiked = false;

                CommentReport commentReport = commentReportRepository.findCommentReportByCommentreportCommentId_CommentIdAndCommentreportReportUserId(ment.getCommentId(),reqUpdateCommentDto.getCommentUserId());
                boolean isReported = true;
                if(commentReport == null) isReported = false;

                comments.add(new ResponseCommentDto(ment,numOfLike,isLiked,isReported));
            }
            return comments;
        }
        return null;
    }

    public ArrayList<ResponseCommentDto> deleteComment(int commentId, int commentUserId) {
        User user = userRepository.findByUserId(commentUserId);
        Comment comment = commentRepository.findCommentByCommentId(commentId);

        if(comment != null && comment.getCommentUserId() == user){
            commentRepository.delete(comment);

            ArrayList<Comment> commentList = commentRepository.findByCommentBookId(comment.getCommentBookId());
            ArrayList<ResponseCommentDto> comments = new ArrayList<>();

            for(Comment ment : commentList){
                int numOfLike = commentLikeRepository.countByCommentlikeCommentId(ment);
                CommentLike commentLike = commentLikeRepository.findByCommentlikeCommentIdAndCommentlikeUserId(ment,commentUserId);
                boolean isLiked = true;
                if(commentLike == null) isLiked = false;

                CommentReport commentReport = commentReportRepository.findCommentReportByCommentreportCommentId_CommentIdAndCommentreportReportUserId(ment.getCommentId(),commentUserId);
                boolean isReported = true;
                if(commentReport == null) isReported = false;

                comments.add(new ResponseCommentDto(ment,numOfLike,isLiked,isReported));
            }
            return comments;
        }
        return null;
    }

    public CommentLike createCommentLike(int userId, int commentId) {

        User user = userRepository.findByUserId(userId);
        Comment comment = commentRepository.findCommentByCommentId(commentId);

        if(user == null || comment == null) return null;
        else{
            CommentLike commentLike = commentLikeRepository.findByCommentlikeCommentIdAndCommentlikeUserId(comment,userId);
            if(commentLike == null) {
                return commentLikeRepository.save(new CommentLike(comment, userId));
            }
            return commentLike;
        }
    }

    public int deleteCommentLike(int userId, int commentId) {
        Comment comment = commentRepository.findCommentByCommentId(commentId);

        CommentLike commentLike = commentLikeRepository.findByCommentlikeCommentIdAndCommentlikeUserId(comment,userId);
        if(commentLike == null)  return 0;
        commentLikeRepository.delete(commentLike);
        return 1;
    }
}
