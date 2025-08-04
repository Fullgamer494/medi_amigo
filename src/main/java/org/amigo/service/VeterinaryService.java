package org.amigo.service;

import org.amigo.model.Veterinary;
import org.amigo.repository.VeterinaryRepository;

import java.sql.SQLException;
import java.util.List;

public class VeterinaryService {
    private final VeterinaryRepository repository = new VeterinaryRepository();

    public void saveVeterinary(Veterinary veterinary) throws SQLException {
        repository.save(veterinary);
    }

    public List<Veterinary> getAllVeterinaries() throws SQLException {
        return repository.findAll();
    }

    public static boolean deleteVeterinary(int idVet) {
        return false;
    }

    public boolean update(Veterinary vet) {
            return repository.update(vet);
    }

}
