package com.ssafy.mongttang.service;

import com.ssafy.mongttang.dto.ReqReportCommentDto;
import com.ssafy.mongttang.dto.ResponseReportCommentInfoDto;
import com.ssafy.mongttang.entity.Comment;
import com.ssafy.mongttang.entity.CommentReport;
import com.ssafy.mongttang.repository.CommentRepository;
import com.ssafy.mongttang.repository.ReportRepository;
import com.ssafy.mongttang.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final ReportRepository reportRepository;

    private final UserRepository userRepository;



    public List<ResponseReportCommentInfoDto> getReportComments() {
        return reportRepository.findAll().stream().map(commentReport
                -> new ResponseReportCommentInfoDto(commentReport, userRepository.findByUserId(commentReport.getCommentreportReportUserId()))).collect(Collectors.toList());
    }
}
