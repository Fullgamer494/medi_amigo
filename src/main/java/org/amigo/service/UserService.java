package org.amigo.service;

import org.amigo.model.User;
import org.amigo.repository.UserRepository;

import java.sql.SQLException;
import java.util.List;

public class UserService {
    private final UserRepository userRepo;

    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    public List<User> getAllUsers() throws SQLException {
        return userRepo.findAll();
    }

    public User getByIdUser(int idUser) throws SQLException {
        return userRepo.findByIdUser(idUser);
    }

    public void createUser(User user) throws SQLException {
        userRepo.save(user);
    }

    // CORREGIDO: Usar instancia del repository en lugar de estático
    public boolean delete(int idUser) throws SQLException {
        return userRepo.delete(idUser);
    }

    public boolean updateUser(User user) throws SQLException {
        return userRepo.update(user);
    }
}