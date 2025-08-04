package org.amigo.controller;

import com.google.gson.Gson;
import io.javalin.http.Context;
import io.javalin.http.HttpStatus;
import org.amigo.model.User;
import org.amigo.service.UserService;

import java.sql.SQLException;
import java.util.List;

public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    public void getAll(Context ctx) {
        try {
            List<User> users = userService.getAllUsers();
            ctx.json(users);
        } catch (SQLException e) {
            ctx.status(500).result("Error al obtener usuarios: " + e);
        }
    }

    public void getById(Context ctx) {
        try {
            int id = Integer.parseInt(ctx.pathParam("id"));
            User user = userService.getByIdUser(id);
            if (user != null) {
                ctx.json(user);
            } else {
                ctx.status(HttpStatus.NOT_FOUND).result("Usuario no encontrado");
            }
        } catch (Exception e) {
            ctx.status(404).result("Error al obtener usuarios");
        }
    }

    public void create(Context ctx) {
        try {
            User user = ctx.bodyAsClass(User.class);
            userService.createUser(user);
            ctx.status(201).result("Usuario creado");
        } catch (Exception e) {
            ctx.status(400).result("Error al crear usuario" + e.getMessage());
        }
    }
    public void delete(Context ctx) throws SQLException {
        int id = Integer.parseInt(ctx.pathParam("id"));
        boolean deleted = userService.delete(id);
        if (deleted) {
            ctx.status(200).result("Usuario eliminado con éxito");
        } else {
            ctx.status(404).result("Usuario no encontrado");
        }
    }

    public void update(Context ctx) {
        try {
            int id = Integer.parseInt(ctx.pathParam("id"));
            User user = ctx.bodyAsClass(User.class);
            user.setIdUser(id); // Asegurar que el ID del path se use
            boolean updated = userService.updateUser(user);
            if (updated) {
                ctx.status(200).result("Usuario actualizado correctamente");
            } else {
                ctx.status(404).result("Usuario no encontrado");
            }
        } catch (Exception e) {
            ctx.status(400).result("Error al actualizar usuario: " + e.getMessage());
        }
    }


}