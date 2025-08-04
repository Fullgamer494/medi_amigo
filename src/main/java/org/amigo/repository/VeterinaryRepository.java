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

        try (
                Connection conn = Database.getDataSource().getConnection();
                PreparedStatement stmt = conn.prepareStatement(query);
                ResultSet rs = stmt.executeQuery()
        ) {
            while (rs.next()) {
                Veterinary vet = new Veterinary();
                // Asegúrate de que estos nombres de columna coincidan con tu base de datos
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
        Veterinary vet = null;
        String query = "SELECT * FROM veterinary WHERE Idvet = ?";

        try (
                Connection conn = Database.getDataSource().getConnection();
                PreparedStatement stmt = conn.prepareStatement(query)
        ) {
            stmt.setInt(1, idVet);

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    vet = new Veterinary();
                    vet.setIdVet(rs.getInt("Idvet"));
                    vet.setIdUser(rs.getInt("idUser"));
                    vet.setComprobante(rs.getString("comprobante"));
                    vet.setEspecialidad(rs.getString("especialidad"));
                    vet.setDisponibilidad(rs.getString("disponibilidad"));
                    vet.setTitulos(rs.getString("titulos"));
                    vet.setUniversidad(rs.getString("universidad"));
                    vet.setDescripcion(rs.getString("descripcion"));
                }
            }
        }

        return vet;
    }

    public void save(Veterinary vet) throws SQLException {
        String query = "INSERT INTO veterinary (idUser, comprobante, especialidad, disponibilidad, titulos, universidad, descripcion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        try (
                Connection conn = Database.getDataSource().getConnection();
                PreparedStatement stmt = conn.prepareStatement(query)
        ) {
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

    public static boolean deleteVeterinary (int idVet) throws SQLException {
        String sql = "DELETE FROM veterinary WHERE idVet = ?";
        try (Connection conn = Database.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, idVet);
            int rowsAffected = stmt.executeUpdate();
            return rowsAffected > 0;
        }
    }

    public boolean update(Veterinary vet) {
        String sql = "UPDATE veterinary SET idUser = ?, IdLocal = ?, comprobante = ?, especialidad = ?, disponibilidad = ? WHERE Idvet = ?";
        try (Connection conn = Database.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, vet.getIdUser());
            stmt.setString(2, vet.getComprobante());
            stmt.setString(3, vet.getEspecialidad());
            stmt.setString(4, vet.getDisponibilidad());
            stmt.setInt(5, vet.getIdVet());

            return stmt.executeUpdate() > 0;

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}
