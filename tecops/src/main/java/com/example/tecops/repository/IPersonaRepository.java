package com.example.tecops.repository;
import com.example.tecops.model.Persona;
import org.springframework.data.jpa.repository.JpaRepository;



public interface IPersonaRepository extends JpaRepository<Persona,Integer>{

    
} 
