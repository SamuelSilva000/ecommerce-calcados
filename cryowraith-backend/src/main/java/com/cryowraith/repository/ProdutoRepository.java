package com.cryowraith.repository;

import com.cryowraith.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    Optional<Produto> findByNome(String nome);
    void deleteByNome(String nome);
    boolean existsByNome(String nome);
}