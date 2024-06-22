package com.example.projetJava.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.example.projetJava.dto.AcheteurDto;
import com.example.projetJava.entity.Acheteur;

public class AcheteurMapper {

    public static AcheteurDto toDto(Acheteur acheteur) {
        AcheteurDto acheteurDto = new AcheteurDto();

        acheteurDto.setId((acheteur.getId()));
        acheteurDto.setNom((acheteur.getNom()));
        acheteurDto.setPrenoms((acheteur.getPrenoms()));
        acheteurDto.setNumTel((acheteur.getNumTel()));
        acheteurDto.setAdresse((acheteur.getAdresse()));

        return acheteurDto;
    }

    public static List<AcheteurDto> toDto(List<Acheteur> acheteurs) {
        return acheteurs.stream()
                .map(AcheteurMapper::toDto)
                .collect(Collectors.toList());
    }

    public static Acheteur toEntity(AcheteurDto acheteurDto) {
        Acheteur acheteur = new Acheteur();

        acheteur.setNom(acheteurDto.getNom());
        acheteur.setPrenoms(acheteurDto.getPrenoms());
        acheteur.setNumTel(acheteurDto.getNumTel());
        acheteur.setAdresse(acheteurDto.getAdresse());

        return acheteur;
    }
}
