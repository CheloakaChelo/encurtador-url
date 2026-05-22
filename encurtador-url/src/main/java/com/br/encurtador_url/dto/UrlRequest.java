package com.br.encurtador_url.dto;

import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.URL;

public record UrlRequest(@NotBlank(message = "A URL original não pode estar vazia.")
                         @URL(message = "Por favor, insira uma URL válida.")
                         String originalUrl) {
}
