package com.example.projetJava.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.example.projetJava.dto.AchatDto;
import com.example.projetJava.entity.Achat;

public class AchatMapper {

    public static AchatDto toDto(Achat achat) {
        AchatDto achatDto = new AchatDto();

        achatDto.setId(achat.getId());
        achatDto.setIdAcheteur(achat.getAcheteur().getId());
        achatDto.setIdProduit(achat.getAcheteur().getId());
        achatDto.setPrixTotal(achat.getPrixTotal());
        achatDto.setDateAchat(achat.getDateAchat());
        achatDto.setQteCommande(achat.getQteCommande());

        return achatDto;
    }

    public static List<AchatDto> toDto(List<Achat> achats) {
        return achats.stream().map(AchatMapper::toDto).collect(Collectors.toList());
    }

}
