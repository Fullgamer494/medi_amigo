package org.amigo.controller;

import com.google.gson.Gson;
import io.javalin.http.Context;
import org.amigo.model.Pet;
import org.amigo.service.PetService;

import java.sql.SQLException;
import java.util.List;

public class PetController {
    private static final Gson gson = new Gson();
    private static final PetService service = new PetService();

    public static void createPet(Context ctx) {
        try {
            Pet pet = gson.fromJson(ctx.body(), Pet.class);
            service.savePet(pet);
            ctx.status(201).result("Pet guardado correctamente");
        } catch (IllegalArgumentException e) {
            ctx.status(400).result("Error de validación: " + e.getMessage());
        } catch (SQLException e) {
            ctx.status(500).result("Error en la base de datos: " + e.getMessage());
        }
    }

    public static void getAllPets(Context ctx) {
        try {
            List<Pet> pets = service.getAllPets();
            ctx.json(pets);
        } catch (SQLException e) {
            ctx.status(500).result("Error recuperando mascotas: " + e.getMessage());
        }
    }

    public static void getPetsByUserId(Context ctx) {
        int idUser = Integer.parseInt(ctx.pathParam("idUser"));
        try {
            List<Pet> pets = service.getPetByUserId(idUser);
            ctx.json(pets);
        } catch (SQLException e) {
            ctx.status(500).result("Error recuperando mascotas: " + e.getMessage());
        }
    }

    public static void deletePet(Context ctx) throws SQLException {
        int id = Integer.parseInt(ctx.pathParam("id"));
        boolean deleted = service.deletePet(id);
        if (deleted) {
            ctx.status(200).result("Mascota eliminada exitosamente");
        } else {
            ctx.status(404).result("Mascota no encontrada");
        }
    }

    public static void update(Context ctx) {
        Pet pet = gson.fromJson(ctx.body(), Pet.class);
        boolean success = PetService.update(pet);
        if (success) {
            ctx.status(200).result("Pet updated");
        } else {
            ctx.status(404).result("Pet not found");
        }
    }
}
