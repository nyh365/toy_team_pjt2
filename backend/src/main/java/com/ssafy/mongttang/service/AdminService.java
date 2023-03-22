package com.ssafy.mongttang.service;

import com.ssafy.mongttang.dto.ReqChallengeCreateFormDto;
import com.ssafy.mongttang.dto.ResponseChallengeInfoDto;
import com.ssafy.mongttang.dto.ResponseChallengeUpdateDto;
import com.ssafy.mongttang.entity.Book;
import com.ssafy.mongttang.entity.Challenge;
import com.ssafy.mongttang.entity.Comment;
import com.ssafy.mongttang.repository.BookRepository;
import com.ssafy.mongttang.repository.ChallengRepository;
import com.ssafy.mongttang.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final ChallengRepository challengRepository;
    private final BookRepository bookRepository;
    private final CommentRepository commentRepository;

    @Transactional
    public ResponseChallengeInfoDto addNewChallenge(ReqChallengeCreateFormDto reqChallengeCreateFormDto) {
        return new ResponseChallengeInfoDto(challengRepository.save(reqChallengeCreateFormDto.toEntity()));
    }

    @Transactional
    public ResponseChallengeUpdateDto updateChallenge(int challengeId, ReqChallengeCreateFormDto reqChallengeCreateFormDto) {
        Optional<Challenge> challenge = challengRepository.findById(challengeId);
        if(!challenge.isPresent()) return null;
        challenge.get().update(reqChallengeCreateFormDto);
        return new ResponseChallengeUpdateDto(challengRepository.save(challenge.get()));
    }

    public List<ResponseChallengeUpdateDto> getChallenges() {
        return challengRepository.findAll().stream()
                .map(challenge -> new ResponseChallengeUpdateDto(challenge)).collect(Collectors.toList());
    }

    public int deleteChallenge(int challengeId) {
        Optional<Challenge> challenge = challengRepository.findById(challengeId);
        if(!challenge.isPresent()) return 0;
        challengRepository.deleteById(challengeId);
        return 1;
    }

    public Book deleteBook(int bookId) {
        Book book = bookRepository.findByBookId(bookId);
        if(book == null) return null;
        book.changeStatus();
        return bookRepository.save(book);
    }

    public Comment deleteComment(int commentId) {
        Comment comment = commentRepository.findCommentByCommentId(commentId);
        if(comment == null) return null;
        comment.changeStatus();
        return commentRepository.save(comment);
    }
}
