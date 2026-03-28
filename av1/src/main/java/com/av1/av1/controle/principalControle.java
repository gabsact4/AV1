package com.av1.av1.controle;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class principalControle {
    
    @GetMapping("/")
    public String Home() {
        return "Em verdade, para nós não existe \"destino\". Somos aqueles que, embebidos em medo e ignorância, perdem o passo e caem no rio lamacento que chamam de \"destino\".";
    }
}