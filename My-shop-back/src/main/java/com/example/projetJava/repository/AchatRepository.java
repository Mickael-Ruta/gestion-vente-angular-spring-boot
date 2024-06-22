package com.example.projetJava.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.projetJava.dto.AchatTotalDto;
import com.example.projetJava.entity.Achat;

@Repository
public interface AchatRepository extends JpaRepository<Achat, String> {

    @Query("select new com.example.projetJava.dto.AchatTotalDto (sum(a.prixTotal),a.dateAchat) from Achat a group by a.dateAchat ")
    List<AchatTotalDto> test();

    @Query("select new com.example.projetJava.dto.AchatTotalDto(sum(a.prixTotal),a.dateAchat) from Achat a where a.dateAchat = :date group by a.dateAchat")
    AchatTotalDto venduNow(@Param(value = "date") LocalDate date);
}
