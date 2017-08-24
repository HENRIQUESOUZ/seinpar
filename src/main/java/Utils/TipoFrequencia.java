/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Utils;

/**
 *
 * @author ricardo
 */
public enum TipoFrequencia {

    ENTRADA("Entrada"),
    SAIDA("Saida");

    private final String descricao;

    private TipoFrequencia(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }

}
