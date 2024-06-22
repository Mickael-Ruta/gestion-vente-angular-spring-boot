package com.example.projetJava.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.example.projetJava.dto.ProduitDto;
import com.example.projetJava.entity.Produit;
import com.example.projetJava.mapper.ProduitMapper;
import com.example.projetJava.repository.ProduitRepository;
import com.example.projetJava.services.interfaces.ProduitService;

@Service
public class ProduitServiceImplementation implements ProduitService {

    @Autowired
    private ProduitRepository produitRepository;

    @Override
    public List<ProduitDto> getAllProduit() {
        List<Produit> produit = this.produitRepository.findAll();
        return ProduitMapper.toDto(produit);
    }

    @Override
    public ProduitDto getProduitById(String id) {
        Produit produit = this.produitRepository.findById(id).orElseThrow(() -> new RuntimeException("not found"));
        return ProduitMapper.toDto(produit);
    }

    @Override
    public Produit createProduit(ProduitDto produitDto) {
        Produit produit = ProduitMapper.toEntity(produitDto);
        return this.produitRepository.save(produit);
    }

    @Override
    public Produit updateProduit(String id, ProduitDto produitDto) {
        Produit produit = ProduitMapper.toEntity(produitDto);
        produit.setId(id);
        return this.produitRepository.save(produit);
    }

    @Override
    public boolean deleteProduitById(String id) {
        try {
            this.produitRepository.deleteById(id);
            return true;

        } catch (DataAccessException e) {
            return false;
        }
    }

    @Override
    public Long countByCategory(String category) {
        return this.produitRepository.countByCategory(category);
    }

    @Override
    public Long getTotalStock() {
        return this.produitRepository.getTotalStock();
    }

    @Override
    public Long getTotalVendu() {
        return this.produitRepository.getTotalVendu();
    }

    @Override
    public List<ProduitDto> getTop3Produit() {
        List<Produit> list = this.produitRepository.getTop3Produit();
        return ProduitMapper.toDto(list);
    }

}
