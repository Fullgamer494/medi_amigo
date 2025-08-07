package org.amigo.controller;

import com.google.gson.Gson;
import io.javalin.http.Context;
import org.amigo.model.Establishment;
import org.amigo.service.EstablishmentService;

import java.sql.SQLException;

public class EstablishmentController {
    private static final Gson gson = new Gson();
    private final EstablishmentService service;

    public EstablishmentController(EstablishmentService service) {
        this.service = service;
    }

    public void createEstablishment(Context ctx) {
        try {
            Establishment establishment = gson.fromJson(ctx.body(), Establishment.class);
            if (establishment.getName() == null || establishment.getDescription() == null || establishment.getDirectory() == null) {
                ctx.status(400).result("Todos los campos son obligatorios: name, description, directory");
                return;
            }
            service.save(establishment);
            ctx.status(201).result("Establecimiento creado correctamente");
        } catch (SQLException e) {
            ctx.status(500).result("Error al guardar establecimiento: " + e.getMessage());
        } catch (Exception e) {
            ctx.status(500).result("Error inesperado: " + e.getMessage());
        }
    }

    public void getAllEstablishments(Context ctx) {
        try {
            ctx.json(service.getAll());
        } catch (SQLException e) {
            ctx.status(500).result("Error al obtener establecimientos: " + e.getMessage());
        }
    }

    public void deleteEstablishment(Context ctx) throws SQLException {
        int id = Integer.parseInt(ctx.pathParam("id"));
        boolean deleted = service.deleteEstablishment(id);
        if (deleted) {
            ctx.status(200).result("Establecimiento eliminado con éxito");
        } else {
            ctx.status(404).result("Establecimiento no encontrado");
        }
    }

    public void update(Context ctx) {
        Establishment establishment = gson.fromJson(ctx.body(), Establishment.class);
        boolean success = service.update(establishment);
        if (success) {
            ctx.status(200).result("Establecimiento actualizado correctamente");
        } else {
            ctx.status(404).result("No se encontró el establecimiento");
        }
    }
}
