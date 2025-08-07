package org.amigo.routes;

import io.javalin.Javalin;
import org.amigo.controller.LocationController;

public class LocationRoutes {
    private final LocationController locationController;

    public LocationRoutes(LocationController locationController) {
        this.locationController = locationController;
    }

    public void register(Javalin app) {
        // Rutas básicas CRUD
        app.post("/location", locationController::createLocation);
        app.get("/location/all", locationController::getAllLocations);
        app.get("/location/{id}", locationController::getLocationById);
        app.put("/location", locationController::updateLocation);
        app.delete("/location/{id}", locationController::deleteLocation);

        // Rutas relacionadas con establecimientos
        app.get("/location/establishment/{idLocal}", locationController::getLocationsByEstablishment);
        app.delete("/location/establishment/{idLocal}", locationController::deleteLocationsByEstablishment);
    }
}