package org.amigo.controller;

import io.javalin.http.Context;
import com.google.gson.Gson;
import org.amigo.model.Veterinary;
import org.amigo.service.VeterinaryService;

import java.sql.SQLException;

public class VeterinaryController {
    private static final Gson gson = new Gson();
    private final VeterinaryService service;

    public VeterinaryController(VeterinaryService service) {
        this.service = service;
    }

    public void getAllVeterinaries(Context ctx) {
        try {
            ctx.json(service.getAllVeterinaries());
        } catch (SQLException e) {
            ctx.status(500).result("Error al obtener los veterinarios: " + e.getMessage());
        }
    }

    public void createVeterinary(Context ctx) {
        try {
            Veterinary vet = gson.fromJson(ctx.body(), Veterinary.class);
            service.saveVeterinary(vet);
            ctx.status(201).result("Veterinario registrado con exito");
        } catch (SQLException e) {
            ctx.status(500).result("error al guardar al veterinario" + e.getMessage());
        }
    }

    // CORREGIDO: Usar instancia del service en lugar de estático
    public void deleteVeterinary(Context ctx) throws SQLException {
        int idVet = Integer.parseInt(ctx.pathParam("idVet"));
        boolean deleteVeterinary = service.deleteVeterinary(idVet);
        if (deleteVeterinary) {
            ctx.status(200).result("Veterinario eliminado con éxito");
        } else {
            ctx.status(404).result("Veterinario no encontrado");
        }
    }

    public void update(Context ctx) {
        Veterinary vet = gson.fromJson(ctx.body(), Veterinary.class);
        boolean success = service.update(vet);
        if (success) {
            ctx.status(200).result("Veterinario actualizado correctamente");
        } else {
            ctx.status(404).result("No se encontró el veterinario");
        }
    }
}