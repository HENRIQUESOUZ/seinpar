package Utils;

import javax.ws.rs.core.Response;

/**
 *
 * @author alexvfornazieri
 */
public class RestUtil {

    public static Response responseMessage(Response.Status status, String message) {
        return Response.status(status)
                .entity("{\"message\": \"" + message + "\"}").build();
    }
}
