package com.example.projetJava.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class AchatDto {

    private String id;

    private String idAcheteur;

    private String idProduit;

    private double prixTotal;

    private Long qteCommande;

    private LocalDate dateAchat;
}
