package org.amigo.service;

import org.amigo.model.Establishment;
import org.amigo.repository.EstablishmentRepository;

import java.sql.SQLException;
import java.util.List;

public class EstablishmentService {
    private final EstablishmentRepository repository;

    public EstablishmentService(EstablishmentRepository repository) {
        this.repository = repository;
    }

    public void save(Establishment establishment) throws SQLException {
        repository.save(establishment);
    }

    public List<Establishment> getAll() throws SQLException {
        return repository.findAll();
    }

    // CORREGIDO: Usar instancia del repository en lugar de estático
    public boolean deleteEstablishment(int idEstablishment) throws SQLException {
        return repository.deleteEstablishment(idEstablishment);
    }

    public boolean update(Establishment establishment) {
        try {
            return repository.update(establishment);
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}