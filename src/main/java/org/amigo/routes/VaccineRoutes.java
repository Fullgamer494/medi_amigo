package org.amigo.routes;

import io.javalin.Javalin;
import org.amigo.controller.VaccineController;

/**
 * VaccineRoutes - Responsable únicamente de definir los endpoints de vacunas
 */
public class VaccineRoutes {
    private final VaccineController vaccineController;

    public VaccineRoutes(VaccineController vaccineController) {
        this.vaccineController = vaccineController;
    }

    public void register(Javalin app) {
        app.get("/vaccines", vaccineController::getAllVaccines);
    }
}