package com.example.projetJava.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProduitDto {

    private String id;

    private String nom;

    private String category;

    private Long nbreVendu;

    private Long nbreStock;

    private Float note;

    private Long prix;

    private byte[] imgUrl;
}
