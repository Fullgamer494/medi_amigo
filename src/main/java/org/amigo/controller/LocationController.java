package org.amigo.controller;

import com.google.gson.Gson;
import io.javalin.http.Context;
import org.amigo.model.Location;
import org.amigo.service.LocationService;

import java.sql.SQLException;

public class LocationController {
    private static final Gson gson = new Gson();
    private final LocationService service;

    public LocationController(LocationService service) {
        this.service = service;
    }

    public void createLocation(Context ctx) {
        try {
            Location location = gson.fromJson(ctx.body(), Location.class);

            // Validación básica
            if (location.getNombre_ubicacion() == null || location.getIdLocal() <= 0) {
                ctx.status(400).result("Los campos 'nombre_ubicacion' e 'IdLocal' son obligatorios");
                return;
            }

            service.save(location);
            ctx.status(201).json(location); // Devolver el objeto con el ID generado

        } catch (IllegalArgumentException e) {
            ctx.status(400).result("Error de validación: " + e.getMessage());
        } catch (SQLException e) {
            ctx.status(500).result("Error al guardar ubicación: " + e.getMessage());
        } catch (Exception e) {
            ctx.status(500).result("Error inesperado: " + e.getMessage());
        }
    }

    public void getAllLocations(Context ctx) {
        try {
            ctx.json(service.getAll());
        } catch (SQLException e) {
            ctx.status(500).result("Error al obtener ubicaciones: " + e.getMessage());
        }
    }

    public void getLocationsByEstablishment(Context ctx) {
        try {
            int idLocal = Integer.parseInt(ctx.pathParam("idLocal"));
            ctx.json(service.getByEstablishmentId(idLocal));
        } catch (NumberFormatException e) {
            ctx.status(400).result("El ID del establecimiento debe ser un número válido");
        } catch (IllegalArgumentException e) {
            ctx.status(400).result("Error de validación: " + e.getMessage());
        } catch (SQLException e) {
            ctx.status(500).result("Error al obtener ubicaciones: " + e.getMessage());
        }
    }

    public void getLocationById(Context ctx) {
        try {
            int idLocation = Integer.parseInt(ctx.pathParam("id"));
            Location location = service.getById(idLocation);

            if (location != null) {
                ctx.json(location);
            } else {
                ctx.status(404).result("Ubicación no encontrada");
            }
        } catch (NumberFormatException e) {
            ctx.status(400).result("El ID debe ser un número válido");
        } catch (IllegalArgumentException e) {
            ctx.status(400).result("Error de validación: " + e.getMessage());
        } catch (SQLException e) {
            ctx.status(500).result("Error al obtener ubicación: " + e.getMessage());
        }
    }

    public void updateLocation(Context ctx) {
        try {
            Location location = gson.fromJson(ctx.body(), Location.class);

            // Validación básica
            if (location.getIdLocation() <= 0) {
                ctx.status(400).result("El ID de la ubicación es obligatorio para actualizar");
                return;
            }

            boolean success = service.update(location);
            if (success) {
                ctx.status(200).result("Ubicación actualizada correctamente");
            } else {
                ctx.status(404).result("No se encontró la ubicación o error en la validación");
            }
        } catch (Exception e) {
            ctx.status(500).result("Error inesperado: " + e.getMessage());
        }
    }

    public void deleteLocation(Context ctx) {
        try {
            int idLocation = Integer.parseInt(ctx.pathParam("id"));
            boolean deleted = service.deleteById(idLocation);

            if (deleted) {
                ctx.status(200).result("Ubicación eliminada con éxito");
            } else {
                ctx.status(404).result("Ubicación no encontrada");
            }
        } catch (NumberFormatException e) {
            ctx.status(400).result("El ID debe ser un número válido");
        } catch (IllegalArgumentException e) {
            ctx.status(400).result("Error de validación: " + e.getMessage());
        } catch (SQLException e) {
            ctx.status(500).result("Error al eliminar ubicación: " + e.getMessage());
        }
    }

    public void deleteLocationsByEstablishment(Context ctx) {
        try {
            int idLocal = Integer.parseInt(ctx.pathParam("idLocal"));
            boolean deleted = service.deleteByEstablishmentId(idLocal);

            if (deleted) {
                ctx.status(200).result("Ubicaciones del establecimiento eliminadas con éxito");
            } else {
                ctx.status(404).result("No se encontraron ubicaciones para este establecimiento");
            }
        } catch (NumberFormatException e) {
            ctx.status(400).result("El ID del establecimiento debe ser un número válido");
        } catch (IllegalArgumentException e) {
            ctx.status(400).result("Error de validación: " + e.getMessage());
        } catch (SQLException e) {
            ctx.status(500).result("Error al eliminar ubicaciones: " + e.getMessage());
        }
    }
}