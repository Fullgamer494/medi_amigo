package org.amigo.service;

import org.amigo.model.Vaccine;
import org.amigo.repository.VaccineRepository;

import java.sql.SQLException;
import java.util.List;

public class VaccineService {
    private final VaccineRepository repository;

    public VaccineService(VaccineRepository repository) {
        this.repository = repository;
    }

    public List<Vaccine> getAllVaccines() throws SQLException {
        return repository.findAll();
    }
}