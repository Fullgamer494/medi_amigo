package org.amigo.routes;

import io.javalin.Javalin;
import org.amigo.controller.VeterinaryController;

public class VeterinaryRoutes {
    public static void register(Javalin app) {
        app.get("/veterinary", VeterinaryController::getAllVeterinaries);
        app.post("/veterinarys", VeterinaryController::createVeterinary);
        app.delete("/veterinarys/{id}",VeterinaryController::deleteVeterinary);
        app.put("/veterinary", VeterinaryController::update);

    }
}
