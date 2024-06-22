package com.example.projetJava.services.interfaces;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.repository.query.Param;

import com.example.projetJava.dto.AchatDto;
import com.example.projetJava.dto.AchatTotalDto;

public interface AchatService {
    List<AchatDto> findAll();

    AchatDto findById(String id);

    boolean deleteById(String id);

    boolean createAchat(AchatDto achatDto);

    List<AchatTotalDto> test();

    AchatTotalDto getVenuNow();
}
