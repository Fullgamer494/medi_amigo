package org.amigo.controller;

import com.google.gson.Gson;
import io.javalin.http.Context;
import org.amigo.model.Pet;
import org.amigo.model.VaccineRel;
import org.amigo.service.VaccineRelService;

import java.sql.SQLException;
import java.util.List;

public class VaccineRelController {
    private static final Gson gson = new Gson();
    private static final VaccineRelService service = new VaccineRelService();

    public static void getAllRelations(Context ctx) {
        try {
            List<VaccineRel> vax = service.getAllRels();
            ctx.json(vax);
        } catch (SQLException e) {
            ctx.status(500).result("Error recuperando relaciones: " + e.getMessage());
        }
    }

    public static void saveRel(Context ctx){
        try {
            VaccineRel rel = gson.fromJson(ctx.body(), VaccineRel.class);
            service.SaveRel(rel);
            ctx.status(201).result("Relación guardada correctamente");
        } catch (IllegalArgumentException e) {
            ctx.status(400).result("Error de validación: " + e.getMessage());
        } catch (SQLException e) {
            ctx.status(500).result("Error en la base de datos: " + e.getMessage());
        }
    }
}
