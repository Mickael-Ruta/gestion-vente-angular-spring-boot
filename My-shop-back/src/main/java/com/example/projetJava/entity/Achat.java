package com.example.projetJava.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Achat {

    @ManyToOne
    private Acheteur acheteur;

    @ManyToOne
    private Produit produit;

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private double prixTotal;

    private long qteCommande;

    @Column(nullable = true)
    private LocalDate dateAchat;

    @PrePersist
    protected void onCreate() {
        dateAchat = LocalDate.now();
    }
}
