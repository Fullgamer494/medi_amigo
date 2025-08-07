package org.amigo.repository;

import org.amigo.config.Database;
import org.amigo.model.Veterinary;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class VeterinaryRepository {

    public List<Veterinary> findAll() throws SQLException {
        List<Veterinary> list = new ArrayList<>();
        String query = "SELECT * FROM veterinary";

        try (Connection conn = Database.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(query);
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                Veterinary vet = new Veterinary();
                vet.setIdVet(rs.getInt("Idvet"));
                vet.setIdUser(rs.getInt("idUser"));
                vet.setComprobante(rs.getString("comprobante"));
                vet.setEspecialidad(rs.getString("especialidad"));
                vet.setDisponibilidad(rs.getString("disponibilidad"));
                vet.setTitulos(rs.getString("titulos"));
                vet.setUniversidad(rs.getString("universidad"));
                vet.setDescripcion(rs.getString("descripcion"));
                list.add(vet);
            }
        }
        return list;
    }

    public Veterinary findByIdVet(int idVet) throws SQLException {
        String query = "SELECT * FROM veterinary WHERE Idvet = ?";
        try (Connection conn = Database.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(query)) {
            stmt.setInt(1, idVet);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    Veterinary vet = new Veterinary();
                    vet.setIdVet(rs.getInt("Idvet"));
                    vet.setIdUser(rs.getInt("idUser"));
                    vet.setComprobante(rs.getString("comprobante"));
                    vet.setEspecialidad(rs.getString("especialidad"));
                    vet.setDisponibilidad(rs.getString("disponibilidad"));
                    vet.setTitulos(rs.getString("titulos"));
                    vet.setUniversidad(rs.getString("universidad"));
                    vet.setDescripcion(rs.getString("descripcion"));
                    return vet;
                }
            }
        }
        return null;
    }

    public void save(Veterinary vet) throws SQLException {
        // CORREGIDO: IdUser con mayúscula
        String query = "INSERT INTO veterinary (IdUser, comprobante, especialidad, disponibilidad, titulos, universidad, descripcion) VALUES (?, ?, ?, ?, ?, ?, ?)";

        try (Connection conn = Database.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(query)) {
            stmt.setInt(1, vet.getIdUser());
            stmt.setString(2, vet.getComprobante());
            stmt.setString(3, vet.getEspecialidad());
            stmt.setString(4, vet.getDisponibilidad());
            stmt.setString(5, vet.getTitulos());
            stmt.setString(6, vet.getUniversidad());
            stmt.setString(7, vet.getDescripcion());
            stmt.executeUpdate();
        }
    }

    // CORREGIDO: Cambiar de estático a instancia
    public boolean deleteVeterinary(int idVet) throws SQLException {
        String sql = "DELETE FROM veterinary WHERE Idvet = ?";
        try (Connection conn = Database.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, idVet);
            return stmt.executeUpdate() > 0;
        }
    }

    public boolean update(Veterinary vet) throws SQLException {
        String sql = "UPDATE veterinary SET IdUser = ?, comprobante = ?, especialidad = ?, disponibilidad = ?, titulos = ?, universidad = ?, descripcion = ? WHERE IdVet = ?";
        try (Connection conn = Database.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, vet.getIdUser());
            stmt.setString(2, vet.getComprobante());
            stmt.setString(3, vet.getEspecialidad());
            stmt.setString(4, vet.getDisponibilidad());
            stmt.setString(5, vet.getTitulos());
            stmt.setString(6, vet.getUniversidad());
            stmt.setString(7, vet.getDescripcion());
            stmt.setInt(8, vet.getIdVet());

            int rowsAffected = stmt.executeUpdate();
            return rowsAffected > 0;
        }
    }
}
