package com.example.tecops.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.tecops.model.Pais;

public interface IPaisRepository extends JpaRepository<Pais,Integer> {
    
}
