package br.com.controle;

import Utils.RestUtil;
import br.com.entidade.Aluno;
import br.com.service.AlunoService;
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

@Path(value = "/alunos")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AlunoController implements Serializable {

    @Inject
    private AlunoService alunoService;

    @GET
    @Path("/")
    public List<Aluno> listagem() {
        return alunoService.listar();
    }
    
    @GET
    @Path("/{query}")
    public List<Aluno> autoComplete(@PathParam("query") String nomeFone) {
        System.out.println("Chamou autocomplete");
        return alunoService.alunoAutoComplete(nomeFone);
    }

    @POST
    @Path("/")
    public Response salvar(Aluno a) throws Exception {

        try {
            alunoService.salvar(a);
            return RestUtil.responseMessage(Response.Status.CREATED, "Aluno Salvo com sucesso");
        } catch (Exception e) {
            return RestUtil.responseMessage(Response.Status.BAD_REQUEST, "Falha ao Salvar");
        }

    }

    @POST
    @Path("/excluir")
    public void excluir(Aluno a) {
        alunoService.excluir(a);
    }

}
