package br.com.service;

import Utils.TipoFrequencia;
import br.com.entidade.Aluno;
import br.com.entidade.Frequencia;
import br.com.entidade.TipoEntrada;
import br.com.persistencia.Transacional;
import java.io.Serializable;
import java.util.List;
import javax.inject.Inject;
import javax.persistence.EntityManager;

/**
 *
 * @author barizon
 */
@Transacional
public class FrequenciaService extends AbstractService<Frequencia> implements Serializable {

    @Inject
    public EntityManager em;

    public FrequenciaService() {
        super(Frequencia.class);
    }

    @Override
    public EntityManager getEm() {
        return em;
    }

    public TipoFrequencia tipoFrequencia() {
        List<TipoEntrada> tipos = getEm().createQuery("FROM TipoEntrada").getResultList();
        if (tipos != null && !tipos.isEmpty()) {
            return tipos.get(0).getTipoFrequencia();
        }
        System.out.println("Nenhum resultado");
        return TipoFrequencia.ENTRADA;
    }

    public void alteraTipoEntrada(TipoFrequencia tipo) {
        List<TipoEntrada> tipos = getEm().createQuery("FROM TipoEntrada").getResultList();
        if (tipos != null && !tipos.isEmpty()) {
            for (TipoEntrada itemTipo : tipos) {
                itemTipo.setTipoFrequencia(tipo);
                em.merge(itemTipo);
            }
        } else {
            em.merge(new TipoEntrada(tipo));
        }
    }

    
    public Frequencia salvar(Aluno aluno) throws Exception {
        
        Frequencia frequencia = new Frequencia();
        frequencia.setTipoFrequencia(tipoFrequencia());
        
        return super.salvar(frequencia); //To change body of generated methods, choose Tools | Templates.
    }

    
}
