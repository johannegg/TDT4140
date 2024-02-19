package icebreaker.security.jwt;

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import icebreaker.payload.response.MessageResponse;

@Component
public class AuthEntryPointJwt implements AuthenticationEntryPoint {

    private static final Logger logger = LoggerFactory.getLogger(AuthEntryPointJwt.class);

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException authException)
            throws IOException, ServletException {
        logger.error("Unauthorized error: {}", authException.getMessage());

        String norwegianMessage = translateToNorwegian(authException.getMessage());
        MessageResponse messageResponse = new MessageResponse(norwegianMessage);

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        final ObjectMapper mapper = new ObjectMapper();
        mapper.writeValue(response.getOutputStream(), messageResponse);
    }

    private String translateToNorwegian(String englishMessage) {
        switch (englishMessage) {
            case "Bad credentials":
                return "Feil brukernavn eller passord";
            case "Full authentication is required to access this resource":
                return "Logg inn for å få tilgang til denne ressursen";
            default:
                return "Ukjent feil";
        }
    }
}