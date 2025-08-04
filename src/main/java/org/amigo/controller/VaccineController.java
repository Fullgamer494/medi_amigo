package org.amigo.controller;

import io.javalin.http.Context;
import org.amigo.model.Vaccine;
import org.amigo.service.VaccineService;

import java.sql.SQLException;
import java.util.List;

public class VaccineController {
    private static final VaccineService service = new VaccineService();

    public static void getAllVaccines(Context ctx) {
        try {
            List<Vaccine> vaxx = service.getAllVaccines();
            ctx.json(vaxx);
        } catch (SQLException e) {
            ctx.status(500).result("Error recuperando vacunas: " + e.getMessage());
        }
    }

}
