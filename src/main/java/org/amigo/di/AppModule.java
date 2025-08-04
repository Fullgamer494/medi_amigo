package org.amigo.di;

import io.javalin.Javalin;
import org.amigo.controller.OwnerController;
import org.amigo.controller.VeterinaryController;
import org.amigo.controller.UserController;
import org.amigo.repository.UserRepository;
import org.amigo.routes.UserRoutes;
import org.amigo.routes.VeterinaryRoutes;
import org.amigo.service.UserService;
import org.amigo.controller.PetController;
import org.amigo.controller.EstablishmentController;


public class AppModule {

    public static UserRoutes initUser() {
        UserRepository userRepo = new UserRepository();
        UserService userService = new UserService(userRepo);
        UserController userController = new UserController(userService);
        return new UserRoutes(userController);
    }

    public static VeterinaryRoutes 

    public static void VeterinaryController(Javalin app) {
        app.post("/veterinary", VeterinaryController::createVeterinary);
        app.get("/veterinary/all", VeterinaryController::getAllVeterinaries);
        app.delete("/veterinary/{id}",VeterinaryController::deleteVeterinary);
        app.put("/veterinary", VeterinaryController::update);

        app.post("/owners", OwnerController::createOwner);
        app.get("/owner/all", OwnerController::getAllOwners);
        app.delete("/owner/{id}", OwnerController::delete);
        app.put("/owner", OwnerController::update);


    }

    public static void PetRoutes(Javalin app) {
        app.post("/pets", PetController::createPet);
        app.get("/pets/all", PetController::getAllPets);
        app.get("/pets/{idUser}", PetController::getPetsByUserId);
        app.delete("pets/{id}", PetController::deletePet);
        app.put("/pets", PetController::update);

    }

    public static void EstablishmentController(Javalin app) {
        app.post("/establishment", org.amigo.controller.EstablishmentController::createEstablishment);
        app.get("/establishment/all", org.amigo.controller.EstablishmentController::getAllEstablishments);
        app.delete("/establishment/{id}", EstablishmentController::deleteEstablishment);
        app.put("/establishment", EstablishmentController::update);

    }

    public static void VaccineController(Javalin app) {
        app.get("/vaccine", org.amigo.controller.VaccineController::getAllVaccines);
    }

    public static void VaccineRelController(Javalin app){
        app.get("/rel", org.amigo.controller.VaccineRelController::getAllRelations);
        app.post("/rel", org.amigo.controller.VaccineRelController::saveRel);
    }

}
