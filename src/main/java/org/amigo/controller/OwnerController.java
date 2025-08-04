package org.amigo.controller;

import com.google.gson.Gson;
import io.javalin.http.Context;
import org.amigo.model.Owner;
import org.amigo.service.OwnerService;

import java.sql.SQLException;
import java.util.List;

public class OwnerController {
    private static final Gson gson = new Gson();
    private static final OwnerService service = new OwnerService();

    public static void createOwner(Context ctx) {
        try {
            Owner owner = gson.fromJson(ctx.body(), Owner.class);
            service.saveOwner(owner);
            ctx.status(201).result("Owner saved successfully");
        } catch (SQLException e) {
            ctx.status(500).result("Error saving owner: " + e.getMessage());
        }
    }

    public static void getAllOwners(Context ctx) {
        try {
            List<Owner> owners = service.getAllOwners();
            ctx.json(owners);
        } catch (SQLException e) {
            ctx.status(500).result("Error retrieving owners: " + e.getMessage());
        }
    }

    public static void delete(Context ctx) throws SQLException {
        int id = Integer.parseInt(ctx.pathParam("id"));
        boolean deleted = service.delete(id);
        if (deleted) {
            ctx.status(200).result("Dueño eliminado exitosamente");
        } else {
            ctx.status(404).result("Dueño no encontrado");
        }
    }

    public static void update(Context ctx) {
        Owner owner = gson.fromJson(ctx.body(), Owner.class);
        boolean success = service.update(owner);
        if (success) {
            ctx.status(200).result("Owner actualizado");
        } else {
            ctx.status(500).result("Error al actualizar Owner");
        }
    }
}
