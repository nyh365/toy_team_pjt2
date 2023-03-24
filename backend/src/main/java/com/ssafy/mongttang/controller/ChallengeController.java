package com.ssafy.mongttang.controller;

import com.ssafy.mongttang.dto.ResponseChallengeBookInfoDto;
import com.ssafy.mongttang.dto.ResponseDiscountBookDto;
import com.ssafy.mongttang.dto.ResponseThisWeekChallengeDto;
import com.ssafy.mongttang.service.BookService;
import com.ssafy.mongttang.service.ChallengeService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/challenge")
@RequiredArgsConstructor
public class ChallengeController {
    private static final String MESSAGE = "message";
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private final ChallengeService challengeService;
    private final BookService bookService;
    @ApiOperation(value = "이번주 챌린지 조회", notes = "이번주 챌린지를 조회한다.", response = Map.class)
    @GetMapping
    public ResponseEntity<Map<String, Object>> getThisWeekChallenge(Principal principal) {
        Map<String, Object> map = new HashMap<>();
        int userId = -1;
        if(principal != null){
            userId = Integer.valueOf(principal.getName());
        }
        List<ResponseThisWeekChallengeDto> thisWeekChallenge = challengeService.getThisWeekChallenge(userId);
        List<ResponseDiscountBookDto> discountBooks = bookService.getDiscountBooks();
        if(discountBooks != null && thisWeekChallenge != null){
            map.put(MESSAGE, SUCCESS);
            map.put("thisWeekChallenge", thisWeekChallenge);
            map.put("discountBooks", discountBooks);
            return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
        } else {
            map.put(MESSAGE, FAIL);
            return new ResponseEntity<Map<String, Object>>(map, HttpStatus.BAD_REQUEST);
        }
    }
    @ApiOperation(value = "챌린지 상세 조회", notes = "챌린지를 상세 조회한다.", response = Map.class)
    @GetMapping("/{challengeId}")
    public ResponseEntity<Map<String, Object>> getChallengeDetail(@PathVariable @ApiParam(value = "상세 조회할 챌린지 아이디", example = "1") int challengeId
                                                                  ,Principal principal) {
        Map<String, Object> map = new HashMap<>();
        int userId = -1;

        if(principal != null){
            userId = Integer.valueOf(principal.getName());
        }

        List<ResponseChallengeBookInfoDto> best = challengeService.getBestBooks(challengeId, userId);
        List<ResponseChallengeBookInfoDto> liked = challengeService.getLikeBooks(challengeId, userId);
        List<ResponseChallengeBookInfoDto> recent = challengeService.getLatesBooks(challengeId, userId);
        if(best != null && liked != null && recent != null){
            map.put(MESSAGE, SUCCESS);
            map.put("best", best);
            map.put("liked", liked);
            map.put("recent", recent);
            return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
        } else {
            map.put(MESSAGE, FAIL);
            return new ResponseEntity<Map<String, Object>>(map, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "이전 챌린지 조회", notes = "이전 챌린지를 조회한다.", response = Map.class)
    @GetMapping("/before")
    public ResponseEntity<Map<String, Object>> getBeforeChallenge(Principal principal) {
        Map<String, Object> map = new HashMap<>();
        int userId = -1;
        if(principal != null){
            userId = Integer.valueOf(principal.getName());
        }
        List<ResponseThisWeekChallengeDto> beforeChallenges = challengeService.getBeforeChallenge(userId);
        if(beforeChallenges != null){
            map.put(MESSAGE, SUCCESS);
            map.put("totalChallenges", beforeChallenges);
            return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
        } else {
            map.put(MESSAGE, FAIL);
            return new ResponseEntity<Map<String, Object>>(map, HttpStatus.BAD_REQUEST);
        }
    }
}
