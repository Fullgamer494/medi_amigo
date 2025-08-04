package org.amigo.di;

import io.javalin.Javalin;
import org.amigo.controller.OwnerController;
import org.amigo.controller.VeterinaryController;
import org.amigo.controller.UserController;
import org.amigo.controller.PetController;
import org.amigo.controller.EstablishmentController;
import org.amigo.controller.VaccineController;
import org.amigo.controller.VaccineRelController;
import org.amigo.repository.UserRepository;
import org.amigo.repository.VeterinaryRepository;
import org.amigo.repository.OwnerRepository;
import org.amigo.repository.PetRepository;
import org.amigo.repository.EstablishmentRepository;
import org.amigo.repository.VaccineRepository;
import org.amigo.repository.VaccineRelRepository;
import org.amigo.routes.UserRoutes;
import org.amigo.routes.VeterinaryRoutes;
import org.amigo.routes.OwnerRoutes;
import org.amigo.routes.PetRoutes;
import org.amigo.routes.EstablishmentRoutes;
import org.amigo.routes.VaccineRoutes;
import org.amigo.routes.VacineRelRoutes;
import org.amigo.service.UserService;
import org.amigo.service.VeterinaryService;
import org.amigo.service.OwnerService;
import org.amigo.service.PetService;
import org.amigo.service.EstablishmentService;
import org.amigo.service.VaccineService;
import org.amigo.service.VaccineRelService;

public class AppModule {

    public static UserRoutes initUser() {
        UserRepository userRepo = new UserRepository();
        UserService userService = new UserService(userRepo);
        UserController userController = new UserController(userService);
        return new UserRoutes(userController);
    }

    public static VeterinaryRoutes initVeterinary() {
        VeterinaryRepository veterinaryRepo = new VeterinaryRepository();
        VeterinaryService veterinaryService = new VeterinaryService(veterinaryRepo);
        VeterinaryController veterinaryController = new VeterinaryController(veterinaryService);
        return new VeterinaryRoutes(veterinaryController);
    }

    public static OwnerRoutes initOwner() {
        OwnerRepository ownerRepo = new OwnerRepository();
        OwnerService ownerService = new OwnerService(ownerRepo);
        OwnerController ownerController = new OwnerController(ownerService);
        return new OwnerRoutes(ownerController);
    }

    public static PetRoutes initPet() {
        PetRepository petRepo = new PetRepository();
        PetService petService = new PetService(petRepo);
        PetController petController = new PetController(petService);
        return new PetRoutes(petController);
    }

    public static EstablishmentRoutes initEstablishment() {
        EstablishmentRepository establishmentRepo = new EstablishmentRepository();
        EstablishmentService establishmentService = new EstablishmentService(establishmentRepo);
        EstablishmentController establishmentController = new EstablishmentController(establishmentService);
        return new EstablishmentRoutes(establishmentController);
    }

    public static VaccineRoutes initVaccine() {
        VaccineRepository vaccineRepo = new VaccineRepository();
        VaccineService vaccineService = new VaccineService(vaccineRepo);
        VaccineController vaccineController = new VaccineController(vaccineService);
        return new VaccineRoutes(vaccineController);
    }

    public static VaccineRelRoutes initVaccineRel() {
        VaccineRelRepository vaccineRelRepo = new VaccineRelRepository();
        VaccineRelService vaccineRelService = new VaccineRelService(vaccineRelRepo);
        VaccineRelController vaccineRelController = new VaccineRelController(vaccineRelService);
        return new VaccineRelRoutes(vaccineRelController);
    }
}