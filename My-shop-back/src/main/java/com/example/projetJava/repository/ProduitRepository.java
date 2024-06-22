package com.example.projetJava.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.projetJava.entity.Produit;

@Repository
public interface ProduitRepository extends JpaRepository<Produit, String> {

    @Query("select count(p) from Produit p where p.category = :category")
    Long countByCategory(@Param(value = "category") String category);

    @Query("select sum(p.nbreStock) from Produit p ")
    Long getTotalStock();

    @Query("select sum(p.nbreVendu) from Produit p")
    Long getTotalVendu();

    @Query("select p from Produit p order by p.nbreVendu desc limit 3")
    List<Produit> getTop3Produit();

}
