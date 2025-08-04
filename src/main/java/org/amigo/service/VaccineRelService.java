package org.amigo.service;

import org.amigo.model.VaccineRel;
import org.amigo.repository.VaccineRelRepository;

import java.sql.SQLException;
import java.util.List;

public class VaccineRelService {
    private final VaccineRelRepository repository;

    public VaccineRelService(){this.repository = new VaccineRelRepository();}

    public List<VaccineRel> getAllRels() throws SQLException {
        return repository.getVaccineRels();
    }

    public void SaveRel(VaccineRel rel) throws SQLException {
        repository.save(rel);
    }
}
