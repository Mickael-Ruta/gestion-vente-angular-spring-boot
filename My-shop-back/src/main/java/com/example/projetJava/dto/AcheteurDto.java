package com.example.projetJava.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AcheteurDto {

    private String id;

    private String nom;

    private String prenoms;

    private String numTel;

    private String adresse;

}
