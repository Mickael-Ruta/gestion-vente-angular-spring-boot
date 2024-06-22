package com.example.projetJava.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.projetJava.dto.ProduitDto;
import com.example.projetJava.entity.Produit;
import com.example.projetJava.services.interfaces.ProduitService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "/api/produit")
public class ProduitController {

    @Autowired
    ProduitService produitService;

    @GetMapping(path = "/all")
    public List<ProduitDto> getAll() {
        return this.produitService.getAllProduit();
    }

    @GetMapping(path = "/one/{id}")
    public ProduitDto getById(@PathVariable String id) {
        return this.produitService.getProduitById(id);
    }

    @GetMapping(path = "/countByCategory/{category}")
    public Long countByCategory(@PathVariable String category) {
        return this.produitService.countByCategory(category);
    }

    @GetMapping(path = "/totalStock")
    public Long getStock() {
        return this.produitService.getTotalStock();
    }

    @GetMapping(path = "/nbreVendu")
    public Long getNbreVendu() {
        return this.produitService.getTotalVendu();
    }

    @GetMapping(path = "/top3vendu")
    public List<ProduitDto> getTop3() {
        return this.produitService.getTop3Produit();
    }
    // ---------------------------------------------------

    @PostMapping(path = "/create")
    public Produit create(@RequestBody ProduitDto produitDto) {
        return this.produitService.createProduit(produitDto);
    }

    // --------------------------------------

    @PutMapping(path = "/update/{id}")
    public Produit update(@PathVariable String id, @RequestBody ProduitDto produitDto) {
        return this.produitService.updateProduit(id, produitDto);
    }

    // ----------------------------------
    @DeleteMapping(path = "/delete/{id}")
    public boolean delete(@PathVariable String id) {
        return this.produitService.deleteProduitById(id);
    }

}
