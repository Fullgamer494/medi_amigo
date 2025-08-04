package org.amigo.service;

import org.amigo.model.Pet;
import org.amigo.repository.PetRepository;

import java.sql.SQLException;
import java.util.List;

public class PetService {
    private final PetRepository repository;

    public PetService() {
        this.repository = new PetRepository();
    }

    public void savePet(Pet pet) throws SQLException {
        if (pet.getIdUser() <= 0) {
            throw new IllegalArgumentException("IdUser es obligatorio y debe ser mayor a 0");
        }
        repository.save(pet);
    }

    public List<Pet> getAllPets() throws SQLException {
        return repository.findAll();
    }

    public List<Pet> getPetByUserId(int idUser) throws SQLException {
        return repository.findMascotasByIdUser(idUser);
    }

    public  boolean deletePet(int idPet) throws SQLException {
        return repository.deletePet(idPet);
    }

    public static boolean update(Pet pet) {
        try {
            return PetRepository.update(pet);
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

}
