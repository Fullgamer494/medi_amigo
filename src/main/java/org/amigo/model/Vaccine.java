package org.amigo.model;

import com.mysql.cj.x.protobuf.MysqlxDatatypes;

import java.sql.Date;
import java.time.LocalDate;

public class Vaccine {
    private Integer idVaxx;
    private String vacuna;

    public Integer getIdVaxx() {
        return idVaxx;
    }

    public void setIdVaxx(Integer idVaxx) {
        this.idVaxx = idVaxx;
    }

    public String getVacuna() {
        return vacuna;
    }

    public void setVacuna(String vacuna) {
        this.vacuna = vacuna;
    }
}
