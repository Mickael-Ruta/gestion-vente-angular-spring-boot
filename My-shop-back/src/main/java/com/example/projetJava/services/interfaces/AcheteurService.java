package com.example.projetJava.services.interfaces;

import java.util.List;

import com.example.projetJava.dto.AcheteurDto;
import com.example.projetJava.entity.Acheteur;

public interface AcheteurService {

    List<AcheteurDto> getAllAcheteur();

    AcheteurDto getAcheteurById(String id);

    Acheteur udpdateAcheteur(String id, AcheteurDto acheteurDto);

    boolean deleteAcheteurById(String id);

    Acheteur createAcheteur(AcheteurDto acheteurdto);

}
