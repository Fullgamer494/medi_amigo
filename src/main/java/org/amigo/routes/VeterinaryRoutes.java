package org.amigo.routes;

import io.javalin.Javalin;
import org.amigo.controller.VeterinaryController;

public class VeterinaryRoutes {
    private final VeterinaryController veterinaryController;

    public VeterinaryRoutes(VeterinaryController veterinaryController) {
        this.veterinaryController = veterinaryController;
    }

    public void register(Javalin app) {
        app.get("/veterinary", veterinaryController::getAllVeterinaries);
        app.post("/veterinarys", veterinaryController::createVeterinary);
        app.delete("/veterinarys/{idVet}", veterinaryController::deleteVeterinary);
        app.put("/veterinary", veterinaryController::update);
    }
}