package com.ssafy.mongttang.repository;

import com.ssafy.mongttang.entity.Comment;
import com.ssafy.mongttang.entity.CommentReport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

}
