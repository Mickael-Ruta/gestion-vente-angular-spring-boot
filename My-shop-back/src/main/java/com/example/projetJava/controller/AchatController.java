package com.example.projetJava.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.projetJava.services.interfaces.AchatService;
import com.example.projetJava.services.interfaces.AcheteurService;
import com.example.projetJava.services.interfaces.ProduitService;
import com.example.projetJava.dto.AchatDto;
import com.example.projetJava.dto.AchatTotalDto;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/api/achat")

public class AchatController {

    @Autowired
    AchatService achatService;

    @Autowired
    AcheteurService acheteurService;

    @Autowired
    ProduitService produitService;

    @GetMapping(path = "/all")
    public List<AchatDto> getAll() {
        return this.achatService.findAll();
    }

    @GetMapping(path = "one/{id}")
    public AchatDto getById(@PathVariable String id) {
        return this.achatService.findById(id);
    }

    @PostMapping(path = "/create")
    public boolean createAchat(@RequestBody AchatDto achatDto) {
        return achatService.createAchat(achatDto);
    }

    @DeleteMapping(path = "/delete/{id}")
    public boolean deleteById(@PathVariable String id) {
        return this.achatService.deleteById(id);
    }

    @GetMapping("/evolutionAchat")
    public List<AchatTotalDto> getMethodName() {
        return this.achatService.test();
    }

    @GetMapping("/achatnow")
    public AchatTotalDto get() {
        return this.achatService.getVenuNow();
    }

}
