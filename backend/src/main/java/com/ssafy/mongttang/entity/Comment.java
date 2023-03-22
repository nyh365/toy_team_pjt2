package com.ssafy.mongttang.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@NoArgsConstructor
@DynamicInsert
@Table(name = "comment")
public class Comment extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int commentId;

    @NotNull
    private int commentBookId;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_user_id")
    private User commentUserId;

    private String commentContent;

    @NotNull
    @Column(columnDefinition = "boolean default true")
    private Boolean commentStatus;

    public void changeStatus(){
        this.commentStatus = false;
    }

}
