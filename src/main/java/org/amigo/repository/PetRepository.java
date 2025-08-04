package org.amigo.repository;

import org.amigo.config.Database;
import org.amigo.model.Pet;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class PetRepository {

    public void save(Pet pet) throws SQLException {
        String sql = "INSERT INTO pet (idUser, idVet, nombre, age, species, sex, weight, photo, numVisit, vaccines, " +
                "nextVaccine, nextVaccineDate, surgeries, condicion, lastVisit, state, treatment, lastVaccines, race) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        try (Connection conn = Database.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, pet.getIdUser());
            stmt.setInt(2, pet.getIdVet());
            stmt.setString(3, pet.getName());
            stmt.setString(4, pet.getAge());
            stmt.setString(5, pet.getSpecies());
            stmt.setString(6, pet.getSex());
            stmt.setString(7, pet.getWeight());
            stmt.setString(8, pet.getPhoto());
            stmt.setInt(9, pet.getNumVisit());
            stmt.setString(10, pet.getVaccines());
            stmt.setString(11, pet.getNextVaccine());
            stmt.setString(12, pet.getNextVaccineDate());
            stmt.setString(13, pet.getSurgeries());
            stmt.setString(14, pet.getCondition());
            stmt.setString(15, pet.getLastVisit());
            stmt.setString(16, pet.getState());
            stmt.setString(17, pet.getTreatment());
            stmt.setString(18, pet.getLastVaccines());
            stmt.setString(19, pet.getRace());
            stmt.executeUpdate();
        }
    }

    public List<Pet> findAll() throws SQLException {
        List<Pet> pets = new ArrayList<>();
        String sql = "SELECT * FROM pet";

        try (Connection conn = Database.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                Pet p = new Pet();
                p.setIdPet(rs.getInt("IdPet"));
                p.setIdUser(rs.getInt("idUser"));
                p.setIdVet(rs.getInt("idVet"));
                p.setName(rs.getString("nombre"));
                p.setAge(rs.getString("age"));
                p.setSpecies(rs.getString("species"));
                p.setSex(rs.getString("sex"));
                p.setWeight(rs.getString("weight"));
                p.setPhoto(rs.getString("photo"));
                p.setNumVisit(rs.getInt("numVisit"));
                p.setVaccines(rs.getString("vaccines"));
                p.setNextVaccine(rs.getString("nextVaccine"));
                p.setNextVaccineDate(rs.getString("nextVaccineDate"));
                p.setSurgeries(rs.getString("surgeries"));
                p.setCondition(rs.getString("condicion"));
                p.setLastVisit(rs.getString("lastVisit"));
                p.setState(rs.getString("state"));
                p.setTreatment(rs.getString("treatment"));
                p.setLastVaccines(rs.getString("lastVaccines"));
                p.setRace(rs.getString("race"));
                pets.add(p);
            }
        }
        return pets;
    }
    public boolean deletePet(int idPet) throws SQLException {
        String sql = "DELETE FROM pet WHERE idPet = ?";
        try (Connection conn = Database.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, idPet);
            int rowsAffected = stmt.executeUpdate();
            return rowsAffected > 0;
        }
    }

    public static boolean update(Pet pet) throws SQLException {
        String sql = "UPDATE pet SET idUser = ?, idVet = ?, nombre = ?, age = ?, species = ?, sex = ?, weight = ?, photo = ?, " +
                "numVisit = ?, vaccines = ?, nextVaccine = ?, nextVaccineDate = ?, surgeries = ?, condicion = ?, lastVisit = ?, " +
                "state = ?, treatment = ?, lastVaccines = ?, race = ? WHERE IdPet = ?";
        try (Connection conn = Database.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, pet.getIdUser());
            stmt.setInt(2, pet.getIdVet());
            stmt.setString(3, pet.getName());
            stmt.setString(4, pet.getAge());
            stmt.setString(5, pet.getSpecies());
            stmt.setString(6, pet.getSex());
            stmt.setString(7, pet.getWeight());
            stmt.setString(8, pet.getPhoto());
            stmt.setInt(9, pet.getNumVisit());
            stmt.setString(10, pet.getVaccines());
            stmt.setString(11, pet.getNextVaccine());
            stmt.setString(12, pet.getNextVaccineDate());
            stmt.setString(13, pet.getSurgeries());
            stmt.setString(14, pet.getCondition());
            stmt.setString(15, pet.getLastVisit());
            stmt.setString(16, pet.getState());
            stmt.setString(17, pet.getTreatment());
            stmt.setString(18, pet.getLastVaccines());
            stmt.setString(19, pet.getRace());
            stmt.setInt(20, pet.getIdPet());
            return stmt.executeUpdate() > 0;
        }
    }

    public List<Pet> findMascotasByIdUser(int idUser) throws SQLException {
        List<Pet> mascotas = new ArrayList<>();

        String query = "SELECT * FROM pet WHERE idUser = ?";

        try (
                Connection conn = Database.getDataSource().getConnection();
                PreparedStatement stmt = conn.prepareStatement(query)
        ) {
            stmt.setInt(1, idUser);

            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    Pet mascota = new Pet();

                    mascota.setIdPet(rs.getInt("IdPet"));
                    mascota.setIdUser(rs.getInt("idUser"));
                    mascota.setIdVet(rs.getInt("idVet"));
                    mascota.setName(rs.getString("nombre"));
                    mascota.setAge(rs.getString("age"));
                    mascota.setSpecies(rs.getString("species"));
                    mascota.setSex(rs.getString("sex"));
                    mascota.setWeight(rs.getString("weight"));
                    mascota.setPhoto(rs.getString("photo"));
                    mascota.setNumVisit(rs.getInt("numVisit"));
                    mascota.setVaccines(rs.getString("vaccines"));
                    mascota.setNextVaccine(rs.getString("nextVaccine"));
                    mascota.setNextVaccineDate(rs.getString("nextVaccineDate"));
                    mascota.setSurgeries(rs.getString("surgeries"));
                    mascota.setCondition(rs.getString("condicion"));
                    mascota.setLastVisit(rs.getString("lastVisit"));
                    mascota.setState(rs.getString("state"));
                    mascota.setTreatment(rs.getString("treatment"));
                    mascota.setLastVaccines(rs.getString("lastVaccines"));
                    mascota.setRace(rs.getString("race"));

                    mascotas.add(mascota);
                }
            }
        }

        return mascotas;
    }

}
