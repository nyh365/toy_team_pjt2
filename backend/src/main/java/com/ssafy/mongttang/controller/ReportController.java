package com.ssafy.mongttang.controller;

import com.ssafy.mongttang.dto.ReqReportBookDto;
import com.ssafy.mongttang.dto.ReqReportCommentDto;
import com.ssafy.mongttang.dto.ResponseReportCommentInfoDto;
import com.ssafy.mongttang.service.ReportService;
import com.ssafy.mongttang.util.TokenUtils;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/report")
@RequiredArgsConstructor
public class ReportController {
    private final ReportService reportService;
    private static final String MESSAGE = "message";
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";



    @ApiOperation(value = "신고된 댓글 조회", notes = "신고된 댓글을 조회한다.")
    @GetMapping("/comment")
    public ResponseEntity<Map<String, Object>> getReportComments () {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        List<ResponseReportCommentInfoDto> result = reportService.getReportComments();
        if(result != null){
            resultMap.put(MESSAGE, SUCCESS);
            resultMap.put("commentreports", result);
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
        }
        resultMap.put(MESSAGE, FAIL);
        return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.BAD_REQUEST);
    }
}
