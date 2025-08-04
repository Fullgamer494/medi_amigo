package org.amigo.service;

import org.amigo.model.Establishment;
import org.amigo.repository.EstablishmentRepository;

import java.sql.SQLException;
import java.util.List;

public class EstablishmentService {
    private final EstablishmentRepository repository;

    public EstablishmentService() {
        this.repository = new EstablishmentRepository();
    }

    public void save(Establishment establishment) throws SQLException {
        repository.save(establishment);
    }

    public List<Establishment> getAll() throws SQLException {
        return repository.findAll();
    }

    public static boolean deleteEstablishment(int idEstablishment) {
        return false;
    }
    public boolean update(Establishment establishment) {
        return repository.update(establishment);
    }
}
