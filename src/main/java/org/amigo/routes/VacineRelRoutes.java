package org.amigo.routes;

import io.javalin.Javalin;
import org.amigo.controller.VaccineController;
import org.amigo.controller.VaccineRelController;

public class VacineRelRoutes {
    private final VaccineRelController vaccineRelController;
    public VacineRelRoutes(VaccineRelController vaccineRelController) {
        this.vaccineRelController = vaccineRelController;
    }

    public static void register(Javalin app) {
        app.get("/vaccineRelRoutes", VaccineRelController::getAllRelations);
        app.post("/vaccineRel", VaccineRelController::saveRel);
    }
}
