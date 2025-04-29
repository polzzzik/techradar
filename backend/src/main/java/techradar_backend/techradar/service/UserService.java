package techradar_backend.techradar.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import techradar_backend.techradar.entity.User;
import techradar_backend.techradar.repository.UserRepository;

@Service
public class UserService {

    public boolean checkAdminAccess(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();

        if (cookies == null) {
            return false;
        }

        String jwtToken = null;
        for (Cookie cookie : cookies) {
            if ("jwtToken".equals(cookie.getName())) {
                jwtToken = cookie.getValue();
                break;
            }
        }

        if (jwtToken == null || jwtToken.isEmpty()) {
            return false;
        }

        try {
            DecodedJWT decodedJWT = JWT.decode(jwtToken);

            String role = decodedJWT.getClaim("role").asString();

            return "ADMIN".equals(role);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean isUserAuthenticated(HttpServletRequest request) {
        // Retrieve cookies from the request
        Cookie[] cookies = request.getCookies();

        if (cookies == null) {
            return false;
        }

        String jwtToken = null;
        for (Cookie cookie : cookies) {
            if ("jwtToken".equals(cookie.getName())) {
                jwtToken = cookie.getValue();
                break;
            }
        }

        if (jwtToken == null || jwtToken.isEmpty()) {
            return false;
        }

        try {
            DecodedJWT decodedJWT = JWT.decode(jwtToken);

            if (decodedJWT.getClaim("login").isNull()) {
                return false;
            }

            return true;
        } catch (JWTDecodeException e) {
            e.printStackTrace();
            return false;
        }
    }
}
