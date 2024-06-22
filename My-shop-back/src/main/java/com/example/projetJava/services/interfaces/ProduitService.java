package com.example.projetJava.services.interfaces;

import java.util.List;

import com.example.projetJava.dto.ProduitDto;
import com.example.projetJava.entity.Produit;

public interface ProduitService {

    List<ProduitDto> getAllProduit();

    ProduitDto getProduitById(String id);

    Produit createProduit(ProduitDto produitDto);

    Produit updateProduit(String id, ProduitDto produitDto);

    boolean deleteProduitById(String id);

    Long countByCategory(String category);

    Long getTotalStock();

    Long getTotalVendu();

    List<ProduitDto> getTop3Produit();
}
