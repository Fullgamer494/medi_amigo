
package org.amigo.routes;

import io.javalin.Javalin;
import org.amigo.controller.UserController;

import static org.codehaus.groovy.tools.shell.util.Logger.io;

public class UserRoutes {
    private final UserController userController;
    public UserRoutes(UserController userController) {
        this.userController = userController;
    }
    public void register(Javalin app) {
        app.get("/users", userController::getAll);
        app.post("/users", userController::create);
        app.get("/users/{id}", userController::getById);
        app.delete("/users/{id}", userController::delete);
        app.put("/users/{id}", userController::update);

    }
}
