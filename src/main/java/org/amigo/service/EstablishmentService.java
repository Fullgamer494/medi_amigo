package org.amigo.service;

import org.amigo.model.Establishment;
import org.amigo.repository.EstablishmentRepository;
import org.amigo.service.LocationService;

import java.sql.SQLException;
import java.util.List;

public class EstablishmentService {
    private final EstablishmentRepository repository;
    private LocationService locationService; // Inyección opcional para manejar ubicaciones

    public EstablishmentService(EstablishmentRepository repository) {
        this.repository = repository;
    }

    // Constructor con LocationService para funcionalidades extendidas
    public EstablishmentService(EstablishmentRepository repository, LocationService locationService) {
        this.repository = repository;
        this.locationService = locationService;
    }

    public void save(Establishment establishment) throws SQLException {
        repository.save(establishment);
    }

    public List<Establishment> getAll() throws SQLException {
        return repository.findAll();
    }

    public boolean deleteEstablishment(int idEstablishment) throws SQLException {
        // Si tenemos LocationService disponible, eliminar ubicaciones asociadas primero
        if (locationService != null) {
            try {
                locationService.deleteByEstablishmentId(idEstablishment);
            } catch (Exception e) {
                System.err.println("Advertencia: Error al eliminar ubicaciones asociadas: " + e.getMessage());
                // Continuamos con la eliminación del establecimiento aunque falle la eliminación de ubicaciones
            }
        }

        return repository.deleteEstablishment(idEstablishment);
    }

    public boolean update(Establishment establishment) {
        try {
            return repository.update(establishment);
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // Setter para inyectar LocationService después de la construcción si es necesario
    public void setLocationService(LocationService locationService) {
        this.locationService = locationService;
    }
}