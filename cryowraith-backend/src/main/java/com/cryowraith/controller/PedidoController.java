package com.cryowraith.controller;

import com.cryowraith.dto.PedidoDTO;
import com.cryowraith.model.Pedido;
import com.cryowraith.service.PedidoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @GetMapping
    public List<Pedido> listar() {
        return pedidoService.listar();
    }

    @GetMapping("/usuario/{email}")
    public List<Pedido> listarPorUsuario(@PathVariable String email) {
        return pedidoService.listarPorUsuario(email);
    }

    @PostMapping
    public ResponseEntity<?> criar(@Valid @RequestBody PedidoDTO dto) {
        Pedido pedido = pedidoService.criar(dto);
        return ResponseEntity.ok(pedido);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> atualizarStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        Pedido p = pedidoService.atualizarStatus(id, body.get("status"));
        if (p == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(p);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancelar(@PathVariable Long id) {
        pedidoService.cancelar(id);
        return ResponseEntity.ok(Map.of("message", "ok"));
    }
}