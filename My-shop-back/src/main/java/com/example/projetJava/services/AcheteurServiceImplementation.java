package com.example.projetJava.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.example.projetJava.dto.AcheteurDto;
import com.example.projetJava.entity.Acheteur;
import com.example.projetJava.mapper.AcheteurMapper;
import com.example.projetJava.repository.AcheteurRepository;
import com.example.projetJava.services.interfaces.AcheteurService;

@Service
public class AcheteurServiceImplementation implements AcheteurService {

    @Autowired
    AcheteurRepository acheteurRepository;

    @Override
    public List<AcheteurDto> getAllAcheteur() {
        List<Acheteur> acheteur = this.acheteurRepository.findAll();
        return AcheteurMapper.toDto(acheteur);
    }

    @Override
    public AcheteurDto getAcheteurById(String id) {
        Acheteur acheteur = this.acheteurRepository.findById(id).orElseThrow(() -> new RuntimeException("not found"));
        return AcheteurMapper.toDto(acheteur);
    }

    @Override
    public Acheteur udpdateAcheteur(String id, AcheteurDto acheteurDto) {
        Acheteur acheteur = AcheteurMapper.toEntity(acheteurDto);
        acheteur.setId(id);
        return this.acheteurRepository.save(acheteur);
    }

    @Override
    public boolean deleteAcheteurById(String id) {
        try {
            this.acheteurRepository.deleteById(id);
            return true;
        } catch (DataAccessException e) {
            System.out.println(e);
            return false;
        }
    }

    @Override
    public Acheteur createAcheteur(AcheteurDto acheteurDto) {
        Acheteur acheteur = AcheteurMapper.toEntity(acheteurDto);
        return this.acheteurRepository.save(acheteur);
    }

}
