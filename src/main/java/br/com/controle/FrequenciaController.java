package br.com.controle;

import Utils.RestUtil;
import Utils.TipoFrequencia;
import br.com.entidade.Aluno;
import br.com.entidade.Frequencia;
import br.com.service.AlunoService;
import br.com.service.FrequenciaService;
import java.io.Serializable;
import java.util.List;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path(value = "/frequencia")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class FrequenciaController implements Serializable {

    @Inject
    private FrequenciaService frequenciaService;
    @Inject
    private AlunoService alunoService;

    @GET
    @Path("/")
    public List<Frequencia> listagem() {
        return frequenciaService.listar();
    }
    @GET
    @Path("/tipo")
    public TipoFrequencia tipo() {
        return  frequenciaService.tipoFrequencia();
    }


    @POST
    @Path("/")
    public Response salvar(Aluno aluno) throws Exception {

        try {
            
            frequenciaService.salvar(aluno);
            return RestUtil.responseMessage(Response.Status.CREATED, "Frequência Registrada com Sucesso!");
        } catch (Exception e) {
            return RestUtil.responseMessage(Response.Status.BAD_REQUEST, "Falha ao Salvar");
        }

    }

    @GET
    @Path("/tipo/{query}")
    public Response autoComplete(@PathParam("query") TipoFrequencia tipo) {
        frequenciaService.alteraTipoEntrada(tipo);
        return Utils.RestUtil.responseMessage(Response.Status.CREATED, "Alterado com sucesso para:" + tipo);

    }

}
