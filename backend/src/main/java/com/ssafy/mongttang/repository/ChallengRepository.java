package com.ssafy.mongttang.repository;

import com.ssafy.mongttang.entity.Challenge;
import com.ssafy.mongttang.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChallengRepository extends JpaRepository<Challenge, Integer> {
    Challenge findByChallengeId(int challengeId);
}
