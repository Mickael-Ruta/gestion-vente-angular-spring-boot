package com.example.projetJava.entity;

import java.util.List;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import jakarta.persistence.Column;
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

public class Acheteur {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String nom;

    @Column(nullable = true)
    private String prenoms;

    private String numTel;

    private String adresse;

    @Cascade(CascadeType.ALL)
    @OneToMany(mappedBy = "acheteur")
    private List<Achat> achat;

}
