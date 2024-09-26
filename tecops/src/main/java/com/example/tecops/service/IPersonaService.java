package com.example.tecops.service;

import java.util.List;
import com.example.tecops.model.*;
public interface IPersonaService {
    List<Persona> listar();
    Persona registrar(Persona persona);
    Persona actualizar(Persona persona);
    void eliminar(Integer codigo);
    Persona ListarPorId(Integer codigo);


}
