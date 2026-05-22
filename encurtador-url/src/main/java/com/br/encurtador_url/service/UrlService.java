package com.br.encurtador_url.service;

import com.br.encurtador_url.dto.UrlRequest;
import com.br.encurtador_url.dto.UrlResponse;
import com.br.encurtador_url.entity.UrlMapping;
import com.br.encurtador_url.exception.UrlNotFoundException;
import com.br.encurtador_url.repository.UrlMappingRepository;
import com.br.encurtador_url.util.Base62Codec;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class UrlService {

    private final UrlMappingRepository repository;


    public UrlService(UrlMappingRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public UrlResponse shortenUrl(UrlRequest request) {
        UrlMapping urlMapping = new UrlMapping();
        urlMapping.setOriginalUrl(request.originalUrl());
        urlMapping.setCreatedAt(LocalDateTime.now());
        urlMapping.setExpiresAt(LocalDateTime.now().plusDays(7));

        urlMapping = repository.save(urlMapping);

        String shortCode = Base62Codec.encode(urlMapping.getId());

        urlMapping.setShortCode(shortCode);
        repository.save(urlMapping);

        String finalShortenedUrl = "http://localhost:8080/" + shortCode;

        return new UrlResponse(urlMapping.getOriginalUrl(),
                finalShortenedUrl,
                urlMapping.getExpiresAt());
    }

    @Transactional(readOnly = true)
    public String getOriginalUrl(String shortCode) {
        UrlMapping urlMapping = repository.findByShortCode(shortCode).orElseThrow(() -> new UrlNotFoundException("URL não encontrada ou expirada para o código: " + shortCode));

        if (urlMapping.getExpiresAt() != null && urlMapping.getExpiresAt().isBefore(LocalDateTime.now())) {
            repository.delete(urlMapping);
            throw new UrlNotFoundException("Essa URL já expirou");
        }

        return urlMapping.getOriginalUrl();
    }
}
