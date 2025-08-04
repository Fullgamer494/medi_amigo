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
        AppModule.VeterinaryController(app);
        AppModule.PetRoutes(app);
        AppModule.EstablishmentController(app);
        AppModule.VaccineController(app);
        AppModule.VaccineRelController(app);
        VeterinaryRoutes.register(app);
    }
}
