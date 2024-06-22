package com.example.projetJava.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.projetJava.dto.AcheteurDto;
import com.example.projetJava.entity.Acheteur;
import com.example.projetJava.services.interfaces.AcheteurService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "/api/acheteur")
public class AcheteurController {

    @Autowired
    AcheteurService acheteurService;

    @GetMapping(path = "/all")
    public List<AcheteurDto> getAll() {
        return this.acheteurService.getAllAcheteur();
    }

    @GetMapping(path = "/one/{id}")
    public AcheteurDto getById(@PathVariable String id) {
        return this.acheteurService.getAcheteurById(id);
    }

    @PostMapping(path = "/create")
    public Acheteur create(@RequestBody AcheteurDto acheteurDto) {
        return this.acheteurService.createAcheteur(acheteurDto);
    }

    @PutMapping(path = "/update/{id}")
    public Acheteur update(@PathVariable String id, @RequestBody AcheteurDto acheteursDto) {
        return this.acheteurService.udpdateAcheteur(id, acheteursDto);
    }

    @DeleteMapping(path = "/delete/{id}")
    public boolean delete(@PathVariable String id) {
        return this.acheteurService.deleteAcheteurById(id);
    }

}
