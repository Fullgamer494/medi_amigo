package org.amigo.routes;

import io.javalin.Javalin;
import org.amigo.controller.EstablishmentController;


public class EstablishmentRoutes {

    private final EstablishmentController establishmentController;
    public EstablishmentRoutes(EstablishmentController establishmentController ){
        this.establishmentController= establishmentController;
    }

    public static void register(Javalin app) {
        app.post("/establishment", EstablishmentController::createEstablishment);
        app.get("/establishment/all", EstablishmentController::getAllEstablishments);
        app.delete("/establishment/{id}", EstablishmentController::deleteEstablishment);
        app.put("/establishment", EstablishmentController::update);

    }
}
