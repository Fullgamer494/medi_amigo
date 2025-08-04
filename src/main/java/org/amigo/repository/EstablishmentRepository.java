package org.amigo.repository;

import org.amigo.config.Database;
import org.amigo.model.Establishment;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class EstablishmentRepository {

    public void save(Establishment establishment) throws SQLException {
        String sql = "INSERT INTO Establishment (nombre, descripcion, direccion) VALUES (?, ?, ?)";
        try (Connection conn = Database.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, establishment.getName());
            stmt.setString(2, establishment.getDescription());
            stmt.setString(3, establishment.getDirectory());
            stmt.executeUpdate();
        }
    }

    public List<Establishment> findAll() throws SQLException {
        List<Establishment> establishments = new ArrayList<>();
        String sql = "SELECT * FROM establishment";

        try (Connection conn = Database.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                Establishment est = new Establishment();
                est.setIdLocal(rs.getInt("IdLocal"));
                est.setIdVet((rs.getInt("IdVet")));
                est.setName(rs.getString("nombre"));
                est.setDescription(rs.getString("descripcion"));
                est.setDirectory(rs.getString("direccion"));
                est.setCalificacion(rs.getFloat("calificacion"));
                establishments.add(est);
            }
        }
        return establishments;
    }
    public static boolean deleteEstablishment(int idLocal) throws SQLException {
        Establishment establishment = null;
        String sql = "DELETE FROM establishment WHERE IdLocal = ?";
        try (Connection conn = Database.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, idLocal);
            stmt.executeUpdate();
        }
        return false;
    }

    public boolean update(Establishment establishment) {
        String sql = "UPDATE establishment SET nombre = ?, descripcion = ?, direccion = ?,  ? WHERE IdLocal = ?";
        try (Connection conn = Database.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, establishment.getName ());
            stmt.setString(2, establishment.getDescription ());
            stmt.setString(3, establishment.getDirectory());
            stmt.setInt(4, establishment.getIdLocal());

            return stmt.executeUpdate() > 0;

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}
