package br.com.entidade;

import Utils.TipoFrequencia;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author barizon
 */
@Entity
@Table(name = "tipoEntrada")
public class TipoEntrada implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "frec_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "frec_tipo")
    private TipoFrequencia tipoFrequencia;

    public TipoEntrada() {
    }

    public TipoEntrada (TipoFrequencia tipoFrequencia) {
        this.tipoFrequencia = tipoFrequencia;
    }
    
    

    public int hashCode() {
        int hash = 7;
        hash = 97 * hash + (this.id != null ? this.id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final TipoEntrada other = (TipoEntrada) obj;
        if (this.id != other.id && (this.id == null || !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return id.toString();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TipoFrequencia getTipoFrequencia() {
        return tipoFrequencia;
    }

    public void setTipoFrequencia(TipoFrequencia tipoFrequencia) {
        this.tipoFrequencia = tipoFrequencia;
    }

}
