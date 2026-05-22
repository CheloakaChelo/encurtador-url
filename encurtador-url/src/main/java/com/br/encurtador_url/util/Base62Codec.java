package com.br.encurtador_url.util;

public class Base62Codec {

    private static final String ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final int BASE = ALPHABET.length();

    private Base62Codec() {

    }

    public static String encode(Long id) {
        if (id == null || id < 0) {
            throw new IllegalArgumentException("O ID não pode ser nulo ou negativo");
        }
        if (id == 0) {
            return String.valueOf(ALPHABET.charAt(0));
        }

        StringBuilder sb = new StringBuilder();
        long currentId = id;

        while (currentId > 0) {
            int remainer = (int) (currentId % BASE);
            sb.append(ALPHABET.charAt(remainer));
            currentId /= BASE;
        }

        return sb.reverse().toString();
    }

    public static Long decode(String shortCode) {
        if (shortCode == null || shortCode.isBlank()) {
            throw new IllegalArgumentException("O código não pode ser nulo ou vazio");
        }

        long id = 0;
        int length = shortCode.length();

        for (int i = 0; i < length; i++) {
            char character = shortCode.charAt(i);
            int position = ALPHABET.indexOf(character);

            if (position == -1) {
                throw new IllegalArgumentException("Caractere inválido encontrado no código: " + character);
            }

            id = (id * BASE) + position;
        }

        return id;
    }



}
