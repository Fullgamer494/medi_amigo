package org.amigo.di;

import org.amigo.controller.*;
import org.amigo.repository.*;
import org.amigo.routes.*;
import org.amigo.service.*;

/**
 * AppModule - Responsable únicamente de la inyección de dependencias
 * Crea la cadena completa: Repository -> Service -> Controller -> Routes
 */
public class AppModule {

    // User dependencies
    public static UserRoutes initUser() {
        UserRepository userRepo = new UserRepository();
        UserService userService = new UserService(userRepo);
        UserController userController = new UserController(userService);
        return new UserRoutes(userController);
    }

    // Veterinary dependencies
    public static VeterinaryRoutes initVeterinary() {
        VeterinaryRepository veterinaryRepo = new VeterinaryRepository();
        VeterinaryService veterinaryService = new VeterinaryService(veterinaryRepo);
        VeterinaryController veterinaryController = new VeterinaryController(veterinaryService);
        return new VeterinaryRoutes(veterinaryController);
    }

    // Owner dependencies
    public static OwnerRoutes initOwner() {
        OwnerRepository ownerRepo = new OwnerRepository();
        OwnerService ownerService = new OwnerService(ownerRepo);
        OwnerController ownerController = new OwnerController(ownerService);
        return new OwnerRoutes(ownerController);
    }

    // Pet dependencies
    public static PetRoutes initPet() {
        PetRepository petRepo = new PetRepository();
        PetService petService = new PetService(petRepo);
        PetController petController = new PetController(petService);
        return new PetRoutes(petController);
    }

    // Establishment dependencies
    public static EstablishmentRoutes initEstablishment() {
        EstablishmentRepository establishmentRepo = new EstablishmentRepository();
        EstablishmentService establishmentService = new EstablishmentService(establishmentRepo);
        EstablishmentController establishmentController = new EstablishmentController(establishmentService);
        return new EstablishmentRoutes(establishmentController);
    }

    // Vaccine dependencies
    public static VaccineRoutes initVaccine() {
        VaccineRepository vaccineRepo = new VaccineRepository();
        VaccineService vaccineService = new VaccineService(vaccineRepo);
        VaccineController vaccineController = new VaccineController(vaccineService);
        return new VaccineRoutes(vaccineController);
    }

    // VaccineRel dependencies - CORREGIDO: Usar nombre original VacineRelRoutes
    public static VacineRelRoutes initVaccineRel() {
        VaccineRelRepository vaccineRelRepo = new VaccineRelRepository();
        VaccineRelService vaccineRelService = new VaccineRelService(vaccineRelRepo);
        VaccineRelController vaccineRelController = new VaccineRelController(vaccineRelService);
        return new VacineRelRoutes(vaccineRelController);
    }
}