package com.cryowraith.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class PedidoDTO {
    @NotBlank
    private String userEmail;
    @NotBlank
    private String itens;
    @Positive
    private Double total;
    private Double frete;
    private String endereco;
    private String pagamento;
}