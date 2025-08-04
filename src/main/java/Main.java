package org.amigo;

import io.javalin.Javalin;
import io.javalin.plugin.bundled.CorsPluginConfig;
import org.amigo.di.AppModule;
import org.amigo.routes.VeterinaryRoutes;

public class Main {
    public static void main(String[] args) {

        Javalin app = Javalin.create(config -> {
            config.bundledPlugins.enableCors(cors -> {
                cors.addRule(CorsPluginConfig.CorsRule::anyHost);
            });
        }).start(7000);

        // Rutas generales
        app.get("/", ctx -> ctx.result("MediAmigo"));
        AppModule.initUser().register(app);
        AppModule.initVeterinary(app);
        AppModule.initPet(app);
        AppModule.initEstablishment(app);
        AppModule.initVaccine(app);
        AppModule.initVaccineRel(app);
        VeterinaryRoutes.register(app);
    }
}
