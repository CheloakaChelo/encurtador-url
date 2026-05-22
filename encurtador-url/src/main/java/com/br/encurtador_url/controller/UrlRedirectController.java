package com.br.encurtador_url.controller;

import com.br.encurtador_url.service.UrlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@RequestMapping("/")
public class UrlRedirectController {

    @Autowired
    private UrlService service;

    @GetMapping("/{shortcode}")
    public ResponseEntity<Void> redirectToOriginalUrl(@PathVariable String shortcode) {
        String originalUrl = service.getOriginalUrl(shortcode);

        if (originalUrl == null){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.status(HttpStatus.FOUND)
                .location(URI.create(originalUrl))
                .build();
    }

}
