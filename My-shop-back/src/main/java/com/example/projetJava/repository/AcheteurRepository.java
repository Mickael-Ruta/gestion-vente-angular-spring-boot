package com.example.projetJava.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.projetJava.entity.Acheteur;

@Repository
public interface AcheteurRepository extends JpaRepository<Acheteur, String> {

}
