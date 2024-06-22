package com.example.projetJava.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.example.projetJava.dto.ProduitDto;
import com.example.projetJava.entity.Produit;

public class ProduitMapper {

    public static ProduitDto toDto(Produit produit) {

        ProduitDto produitDto = new ProduitDto();

        produitDto.setId(produit.getId());
        produitDto.setNom(produit.getNom());
        produitDto.setCategory((produit.getCategory()));
        produitDto.setNbreStock(produit.getNbreStock());
        produitDto.setNbreVendu(produit.getNbreVendu());
        produitDto.setNote(produit.getNote());
        produitDto.setImgUrl(produit.getImgUrl());
        produitDto.setPrix(produit.getPrix());

        return produitDto;
    }

    public static List<ProduitDto> toDto(List<Produit> produits) {
        return produits.stream().map(ProduitMapper::toDto).collect(Collectors.toList());
    }

    public static Produit toEntity(ProduitDto produitDto) {

        Produit produit = new Produit();

        produit.setNom(produitDto.getNom());
        produit.setCategory(produitDto.getCategory());
        produit.setNbreStock(produitDto.getNbreStock());
        produit.setNote(produitDto.getNote());
        produit.setNbreVendu(produitDto.getNbreVendu());
        produit.setImgUrl(produitDto.getImgUrl());
        produit.setPrix(produitDto.getPrix());

        return produit;
    }
}
