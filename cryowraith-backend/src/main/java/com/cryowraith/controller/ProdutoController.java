package com.cryowraith.controller;

import com.cryowraith.model.Produto;
import com.cryowraith.service.ProdutoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {

    private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @GetMapping
    public List<Produto> listar() {
        return produtoService.listar();
    }

    @GetMapping("/{nome}")
    public ResponseEntity<Produto> buscar(@PathVariable String nome) {
        return produtoService.buscarPorNome(nome)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> salvar(@RequestBody Map<String, Object> body) {
        produtoService.salvar(body);
        return ResponseEntity.ok(Map.of("message", "ok"));
    }

    @DeleteMapping("/{nome}")
    public ResponseEntity<?> remover(@PathVariable String nome) {
        produtoService.remover(nome);
        return ResponseEntity.ok(Map.of("message", "ok"));
    }
}