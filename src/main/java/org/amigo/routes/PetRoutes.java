package org.amigo.routes;

import io.javalin.Javalin;
import org.amigo.controller.PetController;

public class PetRoutes {
    private final PetController petController;

    public PetRoutes(PetController petController) {
        this.petController = petController;
    }

    public void register(Javalin app) {
        app.post("/pets", petController::createPet);
        app.get("/pet/all", petController::getAllPets);
        app.get("/pets/{idUser}", petController::getPetsByUserId);
        app.delete("/pet/{id}", petController::deletePet);
        app.put("/pet", petController::update);
    }
}