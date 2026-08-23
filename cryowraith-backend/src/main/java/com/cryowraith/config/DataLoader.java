package com.cryowraith.config;

import com.cryowraith.model.Produto;
import com.cryowraith.model.Usuario;
import com.cryowraith.repository.ProdutoRepository;
import com.cryowraith.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final ProdutoRepository produtoRepository;
    private final PasswordEncoder passwordEncoder;

    public DataLoader(UsuarioRepository usuarioRepository,
                      ProdutoRepository produtoRepository,
                      PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.produtoRepository = produtoRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (!usuarioRepository.existsByEmail("admin@cryowraith.com")) {
            Usuario admin = new Usuario();
            admin.setNome("Admin");
            admin.setEmail("admin@cryowraith.com");
            admin.setSenha(passwordEncoder.encode("123456"));
            admin.setRole("admin");
            usuarioRepository.save(admin);
        }

        if (produtoRepository.count() == 0) {
            String[][] dados = {
                {"Tênis Casual", "Visual minimalista · solado baixo · casual", "199.90", "45", "Tênis", "/imagens/calcado1.jpg", "true"},
                {"Chinelo Slide", "Tira única larga · aberto · confortável", "89.90", "60", "Chinelos", "/imagens/calcado2.jpg", "true"},
                {"Bota Chelsea", "Cano curto · elástico lateral · urbano", "249.90", "20", "Botas", "/imagens/calcado3.jpg", "true"},
                {"Tênis Slip-On", "Sem cadarço · puxador traseiro · casual", "179.90", "35", "Tênis", "/imagens/calcado4.jpg", "true"},
                {"Mocassim Loafer", "Sem cadarço · costura aparente · social-casual", "229.90", "25", "Mocassins", "/imagens/calcado5.jpg", "true"},
                {"Alpargata Listrada", "Solado de corda · tecido · estilo verão", "159.90", "30", "Alpargatas", "/imagens/calcado6.jpg", "true"},
                {"Sandália Salto Médio", "Várias tiras · fivela · salto bloco", "189.90", "20", "Sandálias", "/imagens/calcado7.jpg", "true"},
                {"Bota Cano Médio", "Solado grosso · puxador atrás · robusta", "299.90", "15", "Botas", "/imagens/calcado8.jpg", "true"}
            };

            for (String[] d : dados) {
                Produto p = new Produto();
                p.setNome(d[0]);
                p.setDescricao(d[1]);
                p.setPreco(Double.parseDouble(d[2]));
                p.setEstoque(Integer.parseInt(d[3]));
                p.setTipo(d[4]);
                p.setImagem(d[5]);
                p.setDestaque(Boolean.parseBoolean(d[6]));
                produtoRepository.save(p);
            }
        }
    }
}