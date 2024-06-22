package com.example.projetJava.entity;

import java.util.List;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Produit {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String nom;

    private String category;

    private Long nbreVendu;

    private Long nbreStock;

    private Float note;

    private Long prix;

    private byte[] imgUrl;

    @Cascade(CascadeType.ALL)
    @OneToMany(mappedBy = "produit")
    private List<Achat> achat;

}
