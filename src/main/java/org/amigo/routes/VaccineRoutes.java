package org.amigo.routes;

import io.javalin.Javalin;
import org.amigo.controller.VaccineController;

public class VaccineRoutes {
    private final VaccineController vaccineController;
    public VaccineRoutes(VaccineController vaccineController) {
        this.vaccineController = vaccineController;
    }

    public static void register(Javalin app) {
        app.get("/vaccine", VaccineController::getAllVaccines);
    }
}
