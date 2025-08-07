package org.amigo.controller;

import com.google.gson.Gson;
import io.javalin.http.Context;
import org.amigo.model.Pet;
import org.amigo.service.PetService;

import java.sql.SQLException;
import java.util.List;

public class PetController {
    private static final Gson gson = new Gson();
    private final PetService service;

    public PetController(PetService service) {
        this.service = service;
    }

    public void createPet(Context ctx) {
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

    public void getAllPets(Context ctx) {
        try {
            List<Pet> pets = service.getAllPets();
            ctx.json(pets);
        } catch (SQLException e) {
            ctx.status(500).result("Error recuperando mascotas: " + e.getMessage());
        }
    }

    public void getPetsByUserId(Context ctx) {
        int idUser = Integer.parseInt(ctx.pathParam("idUser"));
        try {
            List<Pet> pets = service.getPetByUserId(idUser);
            ctx.json(pets);
        } catch (SQLException e) {
            ctx.status(500).result("Error recuperando mascotas: " + e.getMessage());
        }
    }

    public void deletePet(Context ctx) throws SQLException {
        int id = Integer.parseInt(ctx.pathParam("id"));
        boolean deleted = service.deletePet(id);
        if (deleted) {
            ctx.status(200).result("Mascota eliminada exitosamente");
        } else {
            ctx.status(404).result("Mascota no encontrada");
        }
    }

    // CORREGIDO: Usar instancia del service en lugar de estático
    public void update(Context ctx) {
        Pet pet = gson.fromJson(ctx.body(), Pet.class);
        boolean success = service.update(pet);
        if (success) {
            ctx.status(200).result("Pet updated");
        } else {
            ctx.status(404).result("Pet not found");
        }
    }
}