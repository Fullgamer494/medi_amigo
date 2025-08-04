package org.amigo.repository;

import org.amigo.config.Database;
import org.amigo.model.Vaccine;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class VaccineRepository {

    public List<Vaccine> findAll() throws SQLException {
        List<Vaccine> vaccines = new ArrayList<>();
        String sql = "select * from vaccines";

        try (Connection conn = Database.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                Vaccine p = new Vaccine();
                p.setIdVaxx(rs.getInt("Idvaxx"));
                p.setVacuna(rs.getString("vacuna"));
                vaccines.add(p);
            }
        }
        return vaccines;
    }

}
