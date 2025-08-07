package org.amigo.controller;

import io.javalin.http.Context;
import org.amigo.model.Vaccine;
import org.amigo.service.VaccineService;

import java.sql.SQLException;
import java.util.List;

public class VaccineController {
    private final VaccineService service;

    public VaccineController(VaccineService service) {
        this.service = service;
    }

    public void getAllVaccines(Context ctx) {
        try {
            List<Vaccine> vaxx = service.getAllVaccines();
            ctx.json(vaxx);
        } catch (SQLException e) {
            ctx.status(500).result("Error recuperando vacunas: " + e.getMessage());
        }
    }
}