package br.com.service;


import java.io.Serializable;
import java.util.List;
import javax.persistence.EntityManager;

/**
 *
 * @author barizon
 * @param <T>
 */

public abstract class AbstractService<T> implements Serializable{
    
    private final Class<T> classe;
    
    public AbstractService(Class<T> classe) {
        this.classe = classe;
    }
    
    public abstract EntityManager getEm();
    
    public T salvar(T entidade) throws Exception {
        entidade = getEm().merge(entidade);
        return entidade;
    }
    
    public void excluir(T entidade) {
        getEm().remove(getEm().merge(entidade));
    }
    
    public T pesquisar(Object id) {
        T entidade = getEm().find(classe, id);
        return entidade;
    }
    
    public List<T> listar() {
        return getEm().createQuery("FROM " + classe.getSimpleName() + " AS a  ORDER BY A.id DESC").getResultList();
    }
}
