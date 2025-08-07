package org.amigo.routes;

import io.javalin.Javalin;
import org.amigo.controller.OwnerController;

public class OwnerRoutes {
    private final OwnerController ownerController;

    public OwnerRoutes(OwnerController ownerController) {
        this.ownerController = ownerController;
    }

    public void register(Javalin app) {
        app.get("/owners/all", ownerController::getAllOwners);
        app.post("/owners", ownerController::createOwner);
        app.delete("/owner/{id}", ownerController::delete);
        app.put("/owner", ownerController::update);
    }
}