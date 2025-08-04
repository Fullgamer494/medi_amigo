package org.amigo.routes;

import io.javalin.Javalin;
import org.amigo.controller.OwnerController;

public class OwnerRoutes {
    private final OwnerController ownerController;

    public OwnerRoutes(OwnerController ownerController) {
        this.ownerController = ownerController;
    }

    public void register(Javalin app) {
        app.get("/owners/all", OwnerController::getAllOwners);
        app.post("/owners", OwnerController::createOwner);
        app.delete("/owner/{id}", OwnerController::delete);
        app.put("/owner", OwnerController::update);


    }
}
