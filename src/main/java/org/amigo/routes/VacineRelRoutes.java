package org.amigo.routes;

import io.javalin.Javalin;
import org.amigo.controller.VaccineRelController;

public class VacineRelRoutes {
    private final VaccineRelController vaccineRelController;

    public VacineRelRoutes(VaccineRelController vaccineRelController) {
        this.vaccineRelController = vaccineRelController;
    }

    public void register(Javalin app) {
        app.get("/vaccineRelRoutes", vaccineRelController::getAllRelations);
        app.post("/vaccineRel", vaccineRelController::saveRel);
    }
}