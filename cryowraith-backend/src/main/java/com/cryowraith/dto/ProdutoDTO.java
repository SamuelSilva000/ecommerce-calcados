package com.cryowraith.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class ProdutoDTO {
    @NotBlank
    private String nome;
    @Positive
    private Double preco;
    private String descricao;
    private Integer estoque;
    private String tipo;
    private String imagem;
    private Boolean destaque = false;
}