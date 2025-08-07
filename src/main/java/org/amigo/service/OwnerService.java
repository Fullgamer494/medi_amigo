package org.amigo.service;

import org.amigo.model.Owner;
import org.amigo.repository.OwnerRepository;

import java.sql.SQLException;
import java.util.List;

public class OwnerService {
    private final OwnerRepository repository;

    public OwnerService(OwnerRepository repository) {
        this.repository = repository;
    }

    public void saveOwner(Owner owner) throws SQLException {
        repository.save(owner);
    }

    public List<Owner> getAllOwners() throws SQLException {
        return repository.findAll();
    }

    public boolean delete(int idOwner) throws SQLException {
        return repository.delete(idOwner);
    }

    public boolean update(Owner owner) {
        try {
            return repository.update(owner);
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}