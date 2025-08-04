package org.amigo.model;

import com.mysql.cj.x.protobuf.MysqlxDatatypes;

import java.sql.Date;
import java.time.LocalDate;

public class Pet {
    private int idPet;
    private int idUser;
    private int idVet;
    private String name;
    private String age;
    private String species;
    private String sex;
    private String weight;
    private String photo;
    private int numVisit;
    private String vaccines;
    private String nextVaccine;
    private String nextVaccineDate;
    private String surgeries;
    private String condicion;
    private String lastVisit;
    private String state;
    private String treatment;
    private String lastVaccines;
    private String race;

    // Getters y Setters
    public int getIdPet() { return idPet; }
    public void setIdPet(int idPet) { this.idPet = idPet; }

    public int getIdUser() { return idUser; }
    public void setIdUser(int idUser) { this.idUser = idUser; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getAge() { return age; }
    public void setAge(String age) { this.age = age; }

    public String getSex() { return sex; }
    public void setSex(String sex) { this.sex = sex; }

    public String getWeight() { return weight; }
    public void setWeight(String weight) { this.weight = weight; }

    public String getPhoto() { return photo; }
    public void setPhoto(String photo) { this.photo = photo; }

    public int getNumVisit() { return numVisit; }
    public void setNumVisit(int numVisit) { this.numVisit = numVisit; }

    public String getCondition() { return condicion; }
    public void setCondition(String condition) { this.condicion = condition; }

    public String getLastVisit() {
        return lastVisit;
    }

    public void setLastVisit(String lastVisit) {
        this.lastVisit = lastVisit;
    }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getTreatment() { return treatment; }
    public void setTreatment(String treatment) { this.treatment = treatment; }

    public String getLastVaccines() { return lastVaccines; }
    public void setLastVaccines(String lastVaccines) { this.lastVaccines = lastVaccines; }

    public String getRace() { return race; }
    public void setRace(String race) { this.race = race; }

    public int getIdVet() {
        return idVet;
    }

    public void setIdVet(int idVet) {
        this.idVet = idVet;
    }

    public String getSurgeries() {
        return surgeries;
    }

    public void setSurgeries(String surgeries) {
        this.surgeries = surgeries;
    }

    public String getNextVaccineDate() {
        return nextVaccineDate;
    }

    public void setNextVaccineDate(String nextVaccineDate) {
        this.nextVaccineDate = nextVaccineDate;
    }

    public String getNextVaccine() {
        return nextVaccine;
    }

    public void setNextVaccine(String nextVaccine) {
        this.nextVaccine = nextVaccine;
    }

    public String getVaccines() {
        return vaccines;
    }

    public void setVaccines(String vaccines) {
        this.vaccines = vaccines;
    }

    public String getSpecies() {
        return species;
    }

    public void setSpecies(String species) {
        this.species = species;
    }
}
