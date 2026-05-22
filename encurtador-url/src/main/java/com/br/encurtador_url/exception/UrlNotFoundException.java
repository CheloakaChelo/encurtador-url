package com.br.encurtador_url.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


public class UrlNotFoundException extends RuntimeException {

    public UrlNotFoundException(String message){
        super(message);
    }
}
