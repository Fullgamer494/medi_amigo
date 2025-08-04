package org.amigo.controller;

import io.javalin.http.Context;
import com.google.gson.Gson;
import org.amigo.model.Veterinary;
import org.amigo.service.VeterinaryService;

import java.sql.SQLException;

public class VeterinaryController {
    private static final Gson gson = new Gson();
    private static final VeterinaryService service = new VeterinaryService();

    public static void getAllVeterinaries(Context ctx) {
        try {
            ctx.json(service.getAllVeterinaries());
        } catch (SQLException e) {
            ctx.status(500).result("Error al obtener los veterinarios: " + e.getMessage());
        }
    }

    public static void createVeterinary(Context ctx) {
        try {
            Veterinary vet = gson.fromJson(ctx.body(), Veterinary.class);
            service.saveVeterinary(vet);
            ctx.status(201).result("Veterinario registrado con exito");
        } catch (SQLException e) {
            ctx.status(500).result( "error al guardar al veterinario" + e.getMessage());}
    }

    public static void deleteVeterinary ( Context ctx) throws SQLException {
        int idVet = Integer.parseInt(ctx.pathParam("idVet"));
        boolean deleteVeterinary = VeterinaryService.deleteVeterinary(idVet);
        if (deleteVeterinary) {
            ctx.status(200).result( "Veterinario eliminado con éxito");
        } else {
            ctx.status(404).result("Veterinario no encontrado");
        }
    }

    public static void update(Context ctx) {
        Veterinary vet = gson.fromJson(ctx.body(), Veterinary.class);
        boolean success = service.update(vet);
        if (success) {
            ctx.status(200).result("Veterinario actualizado correctamente");
        } else {
            ctx.status(404).result("No se encontró el veterinario");
        }
    }
}