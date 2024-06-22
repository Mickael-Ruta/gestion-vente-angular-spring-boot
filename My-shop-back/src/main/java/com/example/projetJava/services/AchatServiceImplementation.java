package com.example.projetJava.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.example.projetJava.dto.AchatDto;
import com.example.projetJava.dto.AchatTotalDto;
import com.example.projetJava.entity.Achat;
import com.example.projetJava.entity.Acheteur;
import com.example.projetJava.entity.Produit;
import com.example.projetJava.mapper.AchatMapper;
import com.example.projetJava.repository.AchatRepository;
import com.example.projetJava.repository.AcheteurRepository;
import com.example.projetJava.repository.ProduitRepository;
import com.example.projetJava.services.interfaces.AchatService;

@Service
public class AchatServiceImplementation implements AchatService {

    @Autowired
    AchatRepository achatRepository;

    @Autowired
    AcheteurRepository acheteurRepository;

    @Autowired
    ProduitRepository produitRepository;

    @Override
    public List<AchatDto> findAll() {
        List<Achat> achats = this.achatRepository.findAll();
        return AchatMapper.toDto(achats);
    }

    @Override
    public AchatDto findById(String id) {
        Achat achat = this.achatRepository.findById(id).orElseThrow(() -> new RuntimeException("not found"));
        return AchatMapper.toDto(achat);
    }

    @Override
    public boolean deleteById(String id) {
        try {
            this.achatRepository.deleteById(id);
            return true;

        } catch (DataAccessException e) {
            return false;
        }
    }

    @Override
    public boolean createAchat(AchatDto achatDto) {

        try {

            Acheteur acheteur = this.acheteurRepository.findById(achatDto.getIdAcheteur())
                    .orElseThrow(() -> new RuntimeException("not found"));

            Produit produit = this.produitRepository.findById(achatDto.getIdProduit())
                    .orElseThrow(() -> new RuntimeException("not found"));

            Long stk = produit.getNbreStock();

            if (stk > 0 && stk >= achatDto.getQteCommande()) {
                Achat achat = new Achat();
                achat.setAcheteur(acheteur);
                achat.setProduit(produit);
                achat.setPrixTotal(achatDto.getPrixTotal());
                achat.setQteCommande(achatDto.getQteCommande());

                this.achatRepository.save(achat);

                produit.setNbreStock(stk - achatDto.getQteCommande());
                produit.setNbreVendu(produit.getNbreVendu() + achatDto.getQteCommande());
                this.produitRepository.save(produit);

                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<AchatTotalDto> test() {
        return this.achatRepository.test();
    }

    @Override
    public AchatTotalDto getVenuNow() {
        LocalDate date = LocalDate.now();
        return this.achatRepository.venduNow(date);
    }

}
