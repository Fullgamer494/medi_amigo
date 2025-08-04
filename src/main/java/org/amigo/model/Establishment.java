package org.amigo.model;

public class Establishment {
    private Integer idLocal; // AUTO_INCREMENT, se llena al leer desde DB
    private Integer idVet;
    private String name;
    private String description;
    private String directory;
    private float calificacion;

    // Getters y setters

    public Integer getIdLocal() {
        return idLocal;
    }

    public void setIdLocal(Integer idLocal) {
        this.idLocal = idLocal;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDirectory() {
        return directory;
    }

    public void setDirectory(String directory) {
        this.directory = directory;
    }

    public Integer getIdVet() {
        return idVet;
    }

    public void setIdVet(Integer idVet) {
        this.idVet = idVet;
    }

    public float getCalificacion() {
        return calificacion;
    }

    public void setCalificacion(float calificacion) {
        this.calificacion = calificacion;
    }
}
