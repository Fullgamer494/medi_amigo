package org.amigo.repository;

import org.amigo.config.Database;
import org.amigo.model.User;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class UserRepository {
    public List<User> findAll() throws SQLException {
        List<User> users = new ArrayList<>();
        String query = "SELECT * FROM usuario";
        try (Connection conn = Database.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(query);
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                User u = new User();
                u.setIdUser(rs.getInt("IdUser"));
                u.setName(rs.getString("nombre"));
                u.setEmail(rs.getString("email"));
                u.setPhoneNumber(rs.getString("phoneNumber"));
                u.setPassword(rs.getString("contra"));
                u.setFoto(rs.getString("foto"));
                users.add(u);
            }
        }
        return users;
    }

    public User findByIdUser(int idUser) throws SQLException {
        User user = null;
        String query = "SELECT * FROM usuario WHERE IdUser = ?";

        try (Connection conn = Database.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(query)) {

            stmt.setInt(1, idUser);

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    user = new User();
                    user.setIdUser(rs.getInt("IdUser"));
                    user.setName(rs.getString("nombre"));
                    user.setEmail(rs.getString("email"));
                    user.setPhoneNumber(rs.getString("phoneNumber"));
                    user.setPassword(rs.getString("contra"));
                    user.setFoto(rs.getString("foto"));
                }
            }
        }
        return user;
    }

    public void save(User user) throws SQLException {
        String query = "INSERT INTO usuario (nombre, email, contra, phoneNumber, foto) VALUES (?, ?, ?, ?, ?)";
        try (Connection conn = Database.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(query)) {
            stmt.setString(1, user.getName());
            stmt.setString(2, user.getEmail());
            stmt.setString(3, user.getPassword());
            stmt.setString(4, user.getPhoneNumber());
            stmt.setString(5, user.getFoto());
            stmt.executeUpdate();
        }
    }

    // CORREGIDO: Cambiar de estático a instancia
    public boolean delete(int idUser) throws SQLException {
        String sql = "DELETE FROM usuario WHERE IdUser = ?";
        try (Connection conn = Database.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, idUser);
            int rowsAffected = stmt.executeUpdate();
            return rowsAffected > 0;
        }
    }

    public boolean update(User user) throws SQLException {
        String query = "UPDATE usuario SET nombre = ?, email = ?, contra = ?, phoneNumber = ?, foto = ? WHERE IdUser = ?";
        try (Connection conn = Database.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(query)) {
            stmt.setString(1, user.getName());
            stmt.setString(2, user.getEmail());
            stmt.setString(3, user.getPassword());
            stmt.setString(4, user.getPhoneNumber());
            stmt.setString(5, user.getFoto());
            stmt.setInt(6, user.getIdUser());
            int rowsAffected = stmt.executeUpdate();
            return rowsAffected > 0;
        }
    }
}