package com.cryowraith.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "pedidos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String userEmail;

    @Column(columnDefinition = "TEXT")
    private String itens; // JSON com os itens

    @Column(nullable = false)
    private Double total;

    private Double frete = 0.0;
    private String status = "Em preparação";
    private LocalDateTime data = LocalDateTime.now();
    private String endereco;
    private String pagamento;
}