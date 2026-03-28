package com.av1.av1.controle;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.av1.av1.Modelo.EnderecoAtualizador;
import com.av1.av1.Modelo.modeloEndereco;
import com.av1.av1.Repositorio.RepositorioEndereco;

@RestController
@RequestMapping("/endereco")
public class ControleEndereco {
    
    @Autowired
    private RepositorioEndereco repositorio;
    
    @GetMapping("/{id}")
    public ResponseEntity<modeloEndereco> obterEndereco(@PathVariable long id) {
        Optional<modeloEndereco> endereco = repositorio.findById(id);
        if (endereco.isPresent()) {
            return new ResponseEntity<>(endereco.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    
    @GetMapping("/todos")
    public ResponseEntity<List<modeloEndereco>> obterEnderecos() {
        List<modeloEndereco> enderecos = repositorio.findAll();
        if (enderecos.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(enderecos, HttpStatus.OK);
    }
    
    @GetMapping("/cidade/{cidade}")
    public ResponseEntity<List<modeloEndereco>> obterPorCidade(@PathVariable String cidade) {
        List<modeloEndereco> enderecos = repositorio.findByCidade(cidade);
        return new ResponseEntity<>(enderecos, HttpStatus.OK);
    }
    
    @PostMapping("/cadastro")
    public ResponseEntity<?> cadastrarEndereco(@RequestBody modeloEndereco endereco) {
        try {
            endereco.setId(null);
            modeloEndereco novoEndereco = repositorio.save(endereco);
            return new ResponseEntity<>(novoEndereco, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao cadastrar endereço: " + e.getMessage(), 
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PutMapping("/atualizar/{id}")
    public ResponseEntity<?> atualizarEndereco(@PathVariable long id, @RequestBody modeloEndereco atualizacao) {
        Optional<modeloEndereco> enderecoOpt = repositorio.findById(id);
        if (!enderecoOpt.isPresent()) {
            return new ResponseEntity<>("Endereço não encontrado", HttpStatus.NOT_FOUND);
        }
        
        try {
            modeloEndereco endereco = enderecoOpt.get();
            EnderecoAtualizador atualizador = new EnderecoAtualizador();
            atualizador.atualizar(endereco, atualizacao);
            repositorio.save(endereco);
            return new ResponseEntity<>(endereco, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao atualizar endereço: " + e.getMessage(), 
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<?> excluirEndereco(@PathVariable long id) {
        Optional<modeloEndereco> endereco = repositorio.findById(id);
        if (!endereco.isPresent()) {
            return new ResponseEntity<>("Endereço não encontrado", HttpStatus.NOT_FOUND);
        }
        
        try {
            repositorio.delete(endereco.get());
            return new ResponseEntity<>("Endereço excluído com sucesso", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao excluir endereço: " + e.getMessage(), 
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}