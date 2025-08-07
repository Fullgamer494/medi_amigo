package org.amigo.model;

public class Location {
    private int IdLocation;
    private int IdLocal;
    private String nombre_ubicacion;


    public Location() {
    }

    public Location(int idLocation, int idLocal, String nombre_ubicacion) {
        IdLocation = idLocation;
        IdLocal = idLocal;
        this.nombre_ubicacion = nombre_ubicacion;
    }

    public int getIdLocation() {
        return IdLocation;
    }

    public int getIdLocal() {
        return IdLocal;
    }

    public String getNombre_ubicacion() {
        return nombre_ubicacion;
    }

    public void setIdLocation(int idLocation) {
        IdLocation = idLocation;
    }

    public void setIdLocal(int idLocal) {
        IdLocal = idLocal;
    }

    public void setNombre_ubicacion(String nombre_ubicacion) {
        this.nombre_ubicacion = nombre_ubicacion;
    }
}
