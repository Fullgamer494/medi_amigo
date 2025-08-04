package org.amigo.routes;

import io.javalin.Javalin;
import org.amigo.controller.PetController;

public class PetRoutes {

    private final PetController petController;
    public PetRoutes(PetController petController){
        this.petController = petController;
    }

    public static void register(Javalin app) {
        app.post("/pets", PetController::createPet);
        app.get("/pet/all", PetController::getAllPets);
        app.get("/pets/{idUser}", PetController::getPetsByUserId);
        app.delete("pet/{id}", PetController::deletePet);
        app.put("/pet", PetController::update);

    }
}
