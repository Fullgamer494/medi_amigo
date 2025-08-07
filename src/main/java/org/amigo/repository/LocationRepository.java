package org.amigo.repository;

import org.amigo.config.Database;
import org.amigo.model.Location;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class LocationRepository {

    public void save(Location location) throws SQLException {
        String sql = "INSERT INTO location (IdLocal, nombre_ubicacion) VALUES (?, ?)";
        try (Connection conn = Database.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            stmt.setInt(1, location.getIdLocal());
            stmt.setString(2, location.getNombre_ubicacion());

            int affectedRows = stmt.executeUpdate();
            if (affectedRows > 0) {
                try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        location.setIdLocation(generatedKeys.getInt(1));
                    }
                }
            }
        }
    }

    public List<Location> findAll() throws SQLException {
        List<Location> locations = new ArrayList<>();
        String sql = "SELECT * FROM location";

        try (Connection conn = Database.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                Location location = new Location();
                location.setIdLocation(rs.getInt("IdLocation"));
                location.setIdLocal(rs.getInt("IdLocal"));
                location.setNombre_ubicacion(rs.getString("nombre_ubicacion"));
                locations.add(location);
            }
        }
        return locations;
    }

    public List<Location> findByEstablishmentId(int idLocal) throws SQLException {
        List<Location> locations = new ArrayList<>();
        String sql = "SELECT * FROM location WHERE IdLocal = ?";

        try (Connection conn = Database.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, idLocal);
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    Location location = new Location();
                    location.setIdLocation(rs.getInt("IdLocation"));
                    location.setIdLocal(rs.getInt("IdLocal"));
                    location.setNombre_ubicacion(rs.getString("nombre_ubicacion"));
                    locations.add(location);
                }
            }
        }
        return locations;
    }

    public Location findById(int idLocation) throws SQLException {
        String sql = "SELECT * FROM location WHERE IdLocation = ?";

        try (Connection conn = Database.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, idLocation);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    Location location = new Location();
                    location.setIdLocation(rs.getInt("IdLocation"));
                    location.setIdLocal(rs.getInt("IdLocal"));
                    location.setNombre_ubicacion(rs.getString("nombre_ubicacion"));
                    return location;
                }
            }
        }
        return null;
    }

    public boolean update(Location location) throws SQLException {
        String sql = "UPDATE location SET IdLocal = ?, nombre_ubicacion = ? WHERE IdLocation = ?";

        try (Connection conn = Database.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, location.getIdLocal());
            stmt.setString(2, location.getNombre_ubicacion());
            stmt.setInt(3, location.getIdLocation());

            return stmt.executeUpdate() > 0;
        }
    }

    public boolean deleteById(int idLocation) throws SQLException {
        String sql = "DELETE FROM location WHERE IdLocation = ?";

        try (Connection conn = Database.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, idLocation);
            return stmt.executeUpdate() > 0;
        }
    }

    public boolean deleteByEstablishmentId(int idLocal) throws SQLException {
        String sql = "DELETE FROM location WHERE IdLocal = ?";

        try (Connection conn = Database.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, idLocal);
            return stmt.executeUpdate() > 0;
        }
    }
}