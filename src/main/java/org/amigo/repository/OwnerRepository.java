package org.amigo.repository;

import org.amigo.config.Database;
import org.amigo.model.Owner;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class OwnerRepository {

    public void save(Owner owner) throws SQLException {
        String sql = "INSERT INTO Owner (IdUser" +
                ") VALUES (?)";
        try (Connection conn = Database.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, owner.getIdUser());
            stmt.executeUpdate();
        }
    }

    public List<Owner> findAll() throws SQLException {
        List<Owner> owners = new ArrayList<>();
        String sql = "SELECT * FROM Owner";

        try (Connection conn = Database.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                Owner o = new Owner();
                o.setIdUser(rs.getInt("IdUser"));
                owners.add(o);
            }
        }

        return owners;
    }

    public boolean delete(int idOwner) throws SQLException {
        String sql = "DELETE FROM Owner WHERE idOwner = ?";
        try (Connection conn = Database.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, idOwner);
            int rowsAffected = stmt.executeUpdate();
            return rowsAffected > 0;
        }
    }

    public boolean update(Owner owner) throws SQLException {
        String sql = "UPDATE Owner SET IdUser = ? WHERE IdUser = ?";
        try (Connection conn = Database.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, owner.getIdUser());
            stmt.setInt(2, owner.getIdUser()); // mismo ID, solo se permite actualizar si se quisiera extender el modelo
            return stmt.executeUpdate() > 0;
        }
    }
}
