package org.amigo;

import io.javalin.Javalin;
import io.javalin.plugin.bundled.CorsPluginConfig;
import org.amigo.di.AppModule;

public class Main {
    public static void main(String[] args) {

        Javalin app = Javalin.create(config -> {
            config.bundledPlugins.enableCors(cors -> {
                cors.addRule(CorsPluginConfig.CorsRule::anyHost);
            });
        }).start(7000);

        // Ruta general
        app.get("/", ctx -> ctx.result("MediAmigo"));

        // Registrar rutas usando inyección de dependencias
        AppModule.initUser().register(app);
        AppModule.initVeterinary().register(app);
        AppModule.initOwner().register(app);
        AppModule.initPet().register(app);
        AppModule.initEstablishment().register(app);
        AppModule.initVaccine().register(app);
        AppModule.initVaccineRel().register(app);
    }
}