package com.ssafy.mongttang.service;


import com.ssafy.mongttang.dto.ReqReportCommentDto;
import com.ssafy.mongttang.dto.ResponseReportCommentInfoDto;
import com.ssafy.mongttang.entity.Comment;
import com.ssafy.mongttang.entity.CommentReport;
import com.ssafy.mongttang.repository.CommentReportRepository;
import com.ssafy.mongttang.repository.CommentRepository;
import com.ssafy.mongttang.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final CommentRepository commentRepository;
    private final CommentReportRepository commentReportRepository;
    private final UserRepository userRepository;

    public int reportComment(int commentId, int userId, ReqReportCommentDto reqReportCommentDto) {
        Comment comment = commentRepository.findCommentByCommentId(commentId);
        if(comment == null) return 0;

        CommentReport commentReport = commentReportRepository.findCommentReportByCommentreportCommentId_CommentIdAndCommentreportReportUserId(comment.getCommentId(), userId);
        if(commentReport != null) return - 1;

        commentReport = commentReportRepository.save(reqReportCommentDto.toEntity(comment, userId));
        if(commentReport == null) return 0;
        else return 1;
    }

    public List<ResponseReportCommentInfoDto> getReportComments() {
        return commentReportRepository.findAll().stream().map(commentReport
                -> new ResponseReportCommentInfoDto(commentReport, userRepository.findByUserId(commentReport.getCommentreportReportUserId()))).collect(Collectors.toList());
    }
}
