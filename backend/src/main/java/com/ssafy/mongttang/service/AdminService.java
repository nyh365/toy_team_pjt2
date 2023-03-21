package com.ssafy.mongttang.service;

import com.ssafy.mongttang.dto.ReqChallengeCreateFormDto;
import com.ssafy.mongttang.dto.ResponseChallengeInfoDto;
import com.ssafy.mongttang.dto.ResponseChallengeUpdateDto;
import com.ssafy.mongttang.entity.Challenge;
import com.ssafy.mongttang.repository.ChallengRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final ChallengRepository adminRepository;

    @Transactional
    public ResponseChallengeInfoDto addNewChallenge(ReqChallengeCreateFormDto reqChallengeCreateFormDto) {
        return new ResponseChallengeInfoDto(adminRepository.save(reqChallengeCreateFormDto.toEntity()));
    }

    @Transactional
    public ResponseChallengeUpdateDto updateChallenge(int challengeId, ReqChallengeCreateFormDto reqChallengeCreateFormDto) {
        Optional<Challenge> challenge = adminRepository.findById(challengeId);
        if(!challenge.isPresent()) return null;
        challenge.get().update(reqChallengeCreateFormDto);
        return new ResponseChallengeUpdateDto(adminRepository.save(challenge.get()));
    }

    public List<ResponseChallengeUpdateDto> getChallenges() {
        return adminRepository.findAll().stream()
                .map(challenge -> new ResponseChallengeUpdateDto(challenge)).collect(Collectors.toList());
    }

    public int deleteChallenge(int challengeId) {
        Optional<Challenge> challenge = adminRepository.findById(challengeId);
        if(!challenge.isPresent()) return 0;
        adminRepository.deleteById(challengeId);
        return 1;
    }
}
