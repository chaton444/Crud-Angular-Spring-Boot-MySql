package com.example.tecops.service;

import java.util.List;

import com.example.tecops.model.Pais;

public interface IPaisService {
        List<Pais> listar();
        Pais registrar(Pais pais);
        Pais actualizar(Pais pais);
        void eliminar(Integer codigo);
        Pais ListarPorId(Integer codigo);
}
