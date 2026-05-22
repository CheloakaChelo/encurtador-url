package com.br.encurtador_url.dto;

import java.time.LocalDateTime;

public record UrlResponse(String originalUrl, String shortenedUrl, LocalDateTime expiresAt) {
}
