package com.cryowraith.repository;

import com.cryowraith.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    List<Pedido> findByUserEmailOrderByDataDesc(String userEmail);
}