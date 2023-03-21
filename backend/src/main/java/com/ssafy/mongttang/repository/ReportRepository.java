package com.ssafy.mongttang.repository;

import com.ssafy.mongttang.entity.CommentReport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<CommentReport, Integer> {

}
