package org.amigo.repository;

import org.amigo.config.Database;
import org.amigo.model.VaccineRel;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class VaccineRelRepository {

    public List<VaccineRel> getVaccineRels() throws SQLException {
        List<VaccineRel> vaccineRels = new ArrayList<>();
        String sql = "select * from vaccinesrelacion";

        try (Connection conn = Database.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                VaccineRel p = new VaccineRel();
                p.setIdPet(rs.getInt("IdPet"));
                p.setIdVaccine(rs.getInt("IDVacuna"));
                vaccineRels.add(p);
            }
        }
        return vaccineRels;
    }
    public void save(VaccineRel vaccineRel) throws SQLException {

        String query = "INSERT INTO vaccinesrelacion (IdPet,IDVacuna) VALUES (?,?)";
        try (
                Connection conn = Database.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(query)
        ) {
            stmt.setInt(1, vaccineRel.getIdPet());
            stmt.setInt(2, vaccineRel.getIdVaccine());

            stmt.executeUpdate();
        }
    }
}
