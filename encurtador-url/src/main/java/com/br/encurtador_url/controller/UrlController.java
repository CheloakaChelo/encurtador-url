package com.br.encurtador_url.controller;

import com.br.encurtador_url.dto.UrlRequest;
import com.br.encurtador_url.dto.UrlResponse;
import com.br.encurtador_url.service.UrlService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/url")
public class UrlController {

    @Autowired
    private UrlService service;

    @PostMapping("/")
    public ResponseEntity<UrlResponse> shortenUrl(@Valid @RequestBody UrlRequest request){
        UrlResponse urlResponse = service.shortenUrl(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(urlResponse);
    }

}
