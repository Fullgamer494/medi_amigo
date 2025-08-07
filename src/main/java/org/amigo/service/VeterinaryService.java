package org.amigo.service;

import org.amigo.model.Veterinary;
import org.amigo.repository.VeterinaryRepository;

import java.sql.SQLException;
import java.util.List;

public class VeterinaryService {
    private final VeterinaryRepository repository;

    public VeterinaryService(VeterinaryRepository repository) {
        this.repository = repository;
    }

    public void saveVeterinary(Veterinary veterinary) throws SQLException {
        repository.save(veterinary);
    }

    public List<Veterinary> getAllVeterinaries() throws SQLException {
        return repository.findAll();
    }

    // CORREGIDO: Usar instancia del repository en lugar de estático
    public boolean deleteVeterinary(int idVet) throws SQLException {
        return repository.deleteVeterinary(idVet);
    }

    public boolean update(Veterinary vet) {
        try {
            return repository.update(vet);
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}