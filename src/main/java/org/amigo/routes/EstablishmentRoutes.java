package org.amigo.routes;

import io.javalin.Javalin;
import org.amigo.controller.EstablishmentController;

public class EstablishmentRoutes {
    private final EstablishmentController establishmentController;

    public EstablishmentRoutes(EstablishmentController establishmentController) {
        this.establishmentController = establishmentController;
    }

    public void register(Javalin app) {
        app.post("/establishment", establishmentController::createEstablishment);
        app.get("/establishment/all", establishmentController::getAllEstablishments);
        app.delete("/establishment/{id}", establishmentController::deleteEstablishment);
        app.put("/establishment", establishmentController::update);
    }
}