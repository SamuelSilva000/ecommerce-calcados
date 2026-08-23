package com.cryowraith.service;

import com.cryowraith.model.Produto;
import com.cryowraith.repository.ProdutoRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    public List<Produto> listar() {
        return produtoRepository.findAll();
    }

    public Optional<Produto> buscarPorNome(String nome) {
        return produtoRepository.findByNome(nome);
    }

    public Produto salvar(Map<String, Object> body) {
        Long id = body.get("id") != null ? Long.valueOf(body.get("id").toString()) : null;
        String nome = (String) body.get("nome");
        Double preco = Double.valueOf(body.get("preco").toString());
        String descricao = (String) body.get("descricao");
        String imagem = (String) body.get("imagem");
        Integer estoque = body.get("estoque") != null ? Integer.valueOf(body.get("estoque").toString()) : 0;
        String tipo = (String) body.get("tipo");
        Boolean destaque = body.get("destaque") != null ? Boolean.valueOf(body.get("destaque").toString()) : false;

        Produto p;
        if (id != null && id > 0) {
            p = produtoRepository.findById(id).orElse(new Produto());
        } else {
            Optional<Produto> existente = produtoRepository.findByNome(nome);
            p = existente.orElse(new Produto());
        }
        
        p.setNome(nome);
        p.setPreco(preco);
        p.setEstoque(estoque);
        p.setDescricao(descricao);
        p.setImagem(imagem);
        p.setTipo(tipo);
        if (body.containsKey("destaque")) {
            p.setDestaque(destaque);
        }
        return produtoRepository.save(p);
    }

    public void remover(String nome) {
        Produto p = produtoRepository.findByNome(nome).orElse(null);
        if (p != null) produtoRepository.delete(p);
    }
}