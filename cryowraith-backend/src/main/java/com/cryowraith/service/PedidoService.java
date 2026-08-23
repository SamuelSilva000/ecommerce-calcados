package com.cryowraith.service;

import com.cryowraith.dto.PedidoDTO;
import com.cryowraith.model.Pedido;
import com.cryowraith.model.Produto;
import com.cryowraith.repository.PedidoRepository;
import com.cryowraith.repository.ProdutoRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final ProdutoRepository produtoRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public PedidoService(PedidoRepository pedidoRepository,
                         ProdutoRepository produtoRepository) {
        this.pedidoRepository = pedidoRepository;
        this.produtoRepository = produtoRepository;
    }

    public List<Pedido> listar() {
        return pedidoRepository.findAll();
    }

    public List<Pedido> listarPorUsuario(String email) {
        return pedidoRepository.findByUserEmailOrderByDataDesc(email);
    }

    public Pedido criar(PedidoDTO dto) {
        try {
            List<Map<String, Object>> itens = objectMapper.readValue(
                    dto.getItens(), new TypeReference<>() {});
            for (Map<String, Object> item : itens) {
                String nomeCompleto = (String) item.get("nome");
                int qtd = (int) item.get("qtd");
                String nomeBase = nomeCompleto.split(" \\(Tam")[0];
                Produto p = produtoRepository.findByNome(nomeBase).orElse(null);
                if (p != null) {
                    p.setEstoque(Math.max(0, p.getEstoque() - qtd));
                    produtoRepository.save(p);
                }
            }
        } catch (Exception ignored) {}

        Pedido pedido = new Pedido();
        pedido.setUserEmail(dto.getUserEmail());
        pedido.setItens(dto.getItens());
        pedido.setTotal(dto.getTotal());
        pedido.setFrete(dto.getFrete() != null ? dto.getFrete() : 0.0);
        pedido.setEndereco(dto.getEndereco());
        pedido.setPagamento(dto.getPagamento());
        pedido.setStatus("Em preparação");
        pedido.setData(LocalDateTime.now());
        return pedidoRepository.save(pedido);
    }

    public Pedido atualizarStatus(Long id, String status) {
        Pedido p = pedidoRepository.findById(id).orElse(null);
        if (p == null) return null;
        p.setStatus(status);
        return pedidoRepository.save(p);
    }

    public void cancelar(Long id) {
        pedidoRepository.deleteById(id);
    }
}