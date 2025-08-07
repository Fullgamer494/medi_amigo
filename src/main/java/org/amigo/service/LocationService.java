package org.amigo.service;

import org.amigo.model.Location;
import org.amigo.repository.LocationRepository;

import java.sql.SQLException;
import java.util.List;

public class LocationService {
    private final LocationRepository repository;

    public LocationService(LocationRepository repository) {
        this.repository = repository;
    }

    public void save(Location location) throws SQLException {
        // Validaciones básicas
        if (location.getNombre_ubicacion() == null || location.getNombre_ubicacion().trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre de la ubicación es obligatorio");
        }

        if (location.getIdLocal() <= 0) {
            throw new IllegalArgumentException("El ID del establecimiento es obligatorio");
        }

        repository.save(location);
    }

    public List<Location> getAll() throws SQLException {
        return repository.findAll();
    }

    public List<Location> getByEstablishmentId(int idLocal) throws SQLException {
        if (idLocal <= 0) {
            throw new IllegalArgumentException("El ID del establecimiento debe ser válido");
        }
        return repository.findByEstablishmentId(idLocal);
    }

    public Location getById(int idLocation) throws SQLException {
        if (idLocation <= 0) {
            throw new IllegalArgumentException("El ID de la ubicación debe ser válido");
        }
        return repository.findById(idLocation);
    }

    public boolean update(Location location) {
        try {
            // Validaciones
            if (location.getIdLocation() <= 0) {
                throw new IllegalArgumentException("El ID de la ubicación es obligatorio para actualizar");
            }

            if (location.getNombre_ubicacion() == null || location.getNombre_ubicacion().trim().isEmpty()) {
                throw new IllegalArgumentException("El nombre de la ubicación es obligatorio");
            }

            if (location.getIdLocal() <= 0) {
                throw new IllegalArgumentException("El ID del establecimiento es obligatorio");
            }

            return repository.update(location);
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        } catch (IllegalArgumentException e) {
            System.err.println("Error de validación: " + e.getMessage());
            return false;
        }
    }

    public boolean deleteById(int idLocation) throws SQLException {
        if (idLocation <= 0) {
            throw new IllegalArgumentException("El ID de la ubicación debe ser válido");
        }
        return repository.deleteById(idLocation);
    }

    public boolean deleteByEstablishmentId(int idLocal) throws SQLException {
        if (idLocal <= 0) {
            throw new IllegalArgumentException("El ID del establecimiento debe ser válido");
        }
        return repository.deleteByEstablishmentId(idLocal);
    }
}