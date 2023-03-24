package com.ssafy.mongttang.service;

import com.ssafy.mongttang.dto.BookInfo;
import com.ssafy.mongttang.dto.ResponseFollowerDto;
import com.ssafy.mongttang.dto.ResponseFollowingDto;
import com.ssafy.mongttang.dto.ResponseProfileDto;
import com.ssafy.mongttang.entity.*;
import com.ssafy.mongttang.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class ProfileService {

    private final FollowRepository followRepository;
    private final UserRepository userRepository;
    private final InterestBookRepository interestBookRepository;
    private final BookRepository bookRepository;
    private final IllustRepository illustRepository;
    private final PaidBookRepositoy paidBookRepositoy;

    public Follow createFollow(int followFromId, int followToId) {
        User followFrom = userRepository.findByUserId(followFromId);
        User followTo = userRepository.findByUserId(followToId);
        if(followFrom == null || followTo == null) return null;
        else{
            Follow follow = followRepository.findByFollowFromAndFollowTo(followFrom,followTo);
            if(follow == null){
                return followRepository.save(new Follow(followFrom,followTo));
            }
            return null;
        }
    }

    public int cancleFollow(int followFromId, int followToId) {
        User followFrom = userRepository.findByUserId(followFromId);
        User followTo = userRepository.findByUserId(followToId);
        if(followFrom == null || followTo == null) return 0;
        else{
            Follow follow = followRepository.findByFollowFromAndFollowTo(followFrom,followTo);
            if(follow == null) return 0;
            else{
                followRepository.delete(follow);
                return 1;
            }
        }
    }

    public List<ResponseFollowingDto> getFollowing(int userId) {
        User user = userRepository.findByUserId(userId);
        if(user == null) return null;
        else {
            List<Follow> followList = followRepository.findByFollowFrom(user);
            List<ResponseFollowingDto> followings = new ArrayList<>();
            for (Follow follow : followList) {
                ResponseFollowingDto responseFollowingDto = new ResponseFollowingDto(follow.getFollowTo());
                followings.add(responseFollowingDto);
            }
            return followings;
        }
    }

    public List<ResponseFollowerDto> getFollower(int userId) {
        User user = userRepository.findByUserId(userId);
        if(user == null) return null;
        else {
            List<Follow> followList = followRepository.findByFollowTo(user);
            List<ResponseFollowerDto> followers = new ArrayList<>();
            for (Follow follow : followList) {
                ResponseFollowerDto responseFollowerDto = new ResponseFollowerDto(follow.getFollowFrom());
                followers.add(responseFollowerDto);
            }
            return followers;
        }
    }


    public InterestBook createInterest(int userId, int bookId) {
        User user = userRepository.findByUserId(userId);
        //동화 있는지 확인
        Book book = bookRepository.findByBookId(bookId);

        if(user == null || book == null) return null;
        else{
            InterestBook interestBook = interestBookRepository.findByInterestbookUserIdAndInterestbookBookId(user,book);
            if(interestBook == null){
                return interestBookRepository.save(new InterestBook(user, book));
            }
            return null;
        }
    }

    public int cancleInterest(int userId, int bookId) {
        User user = userRepository.findByUserId(userId);
        //동화 있는지 확인
        Book book = bookRepository.findByBookId(bookId);

        if(user == null || book == null) return 0;
        else{
            InterestBook interestBook = interestBookRepository.findByInterestbookUserIdAndInterestbookBookId(user, book);
            if(interestBook == null) return 0;
            else{
                interestBookRepository.delete(interestBook);
                return 1;
            }
        }
    }

    public ResponseProfileDto getProfile(int userId, int lookUserId) {
        //보고자 하는 사용자의 정보
        User user = userRepository.findByUserId(userId);
        ResponseProfileDto responseProfileDto = new ResponseProfileDto(user, followRepository.findByFollowTo(user).size(),followRepository.findByFollowFrom(user).size());

        //내 프로필일 경우
        if(userId == lookUserId){
            //완료된 책목록
            ArrayList<BookInfo> inCompleteBookInfos = new ArrayList<>();
            ArrayList<Book> inCompleteBooks = bookRepository.findByBookUserIdAndBookStatus(user,"temporary");
            for (Book book : inCompleteBooks) {
                inCompleteBookInfos.add(new BookInfo(illustRepository.findByIllustBookIdAndIllustPageNumber(book,0).getIllustFilePath(),book.getBookId()));
            }

            //구매한 책목록
            ArrayList<BookInfo> paidBookInfos = new ArrayList<>();
            ArrayList<PaidBook> paidBooks = paidBookRepositoy.findByPaidbookUserId(user);
            for (PaidBook paidBook: paidBooks) {
                paidBookInfos.add(new BookInfo(illustRepository.findByIllustBookId_BookIdAndIllustPageNumber(paidBook.getBookId(),0).getIllustFilePath(),paidBook.getBookId()));
            }

            responseProfileDto.addMyprofileInfo(inCompleteBookInfos,paidBookInfos);
        }

        //다른 사람의 프로필일 경우
        else {
            User lookUser = userRepository.findByUserId(lookUserId);

            boolean isFollow = true;
            if(followRepository.findByFollowFromAndFollowTo(lookUser,user) == null) isFollow = false;

            responseProfileDto.addIsFollow(isFollow);
        }

        //해당 프로필 회원의 동화
        ArrayList<BookInfo> myBookInfos = new ArrayList<>();
        ArrayList<Book> myBooks = bookRepository.findByBookUserIdAndBookStatus(user,"complete");
        for (Book book : myBooks) {
            myBookInfos.add(new BookInfo(illustRepository.findByIllustBookIdAndIllustPageNumber(book,0).getIllustFilePath(),book.getBookId()));
        }

        //해당 프로필 회원의 관심 동화
        ArrayList<BookInfo> interestBookInfos = new ArrayList<>();
        ArrayList<InterestBook> interestBooks = interestBookRepository.findByInterestbookUserId(user);
        for (InterestBook interestBook : interestBooks) {
            interestBookInfos.add(new BookInfo(illustRepository.findByIllustBookIdAndIllustPageNumber(interestBook.getInterestbookBookId(),0).getIllustFilePath(),interestBook.getInterestbookBookId().getBookId()));
        }

        responseProfileDto.addMyBooksAndInterestBooks(myBookInfos,interestBookInfos);

        return responseProfileDto;
    }
}
