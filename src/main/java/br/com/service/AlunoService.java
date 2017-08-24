package br.com.service;

import br.com.entidade.Aluno;
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
public class AlunoService extends AbstractService<Aluno> implements Serializable {

    @Inject
    public EntityManager em;

    public AlunoService() {
        super(Aluno.class);
    }

    @Override
    public EntityManager getEm() {
        return em;
    }

    public List<Aluno> alunoAutoComplete(String query) {
        return em.createQuery("FROM Aluno AS a WHERE a.ra LIKE('%" + query + "%') OR a.nome LIKE('%" + query + "%')  ").getResultList();
    }
   
}
