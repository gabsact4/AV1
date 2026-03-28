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

import com.av1.av1.Modelo.modeloTelefone;
import com.av1.av1.Modelo.TelefoneAtualizador;
import com.av1.av1.Repositorio.RepositorioTelefone;

@RestController
@RequestMapping("/telefone")
public class ControleTelefone {
    
    @Autowired
    private RepositorioTelefone repositorio;
    
    @GetMapping("/{id}")
    public ResponseEntity<modeloTelefone> obterTelefone(@PathVariable long id) {
        Optional<modeloTelefone> telefone = repositorio.findById(id);
        if (telefone.isPresent()) {
            return new ResponseEntity<>(telefone.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    
    @GetMapping("/todos")
    public ResponseEntity<List<modeloTelefone>> obterTelefones() {
        List<modeloTelefone> telefones = repositorio.findAll();
        if (telefones.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(telefones, HttpStatus.OK);
    }
    
    @GetMapping("/ddd/{ddd}")
    public ResponseEntity<List<modeloTelefone>> obterPorDdd(@PathVariable String ddd) {
        List<modeloTelefone> telefones = repositorio.findByDdd(ddd);
        return new ResponseEntity<>(telefones, HttpStatus.OK);
    }
    
    @PostMapping("/cadastro")
    public ResponseEntity<?> cadastrarTelefone(@RequestBody modeloTelefone telefone) {
        try {
            telefone.setId(null);
            modeloTelefone novoTelefone = repositorio.save(telefone);
            return new ResponseEntity<>(novoTelefone, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao cadastrar telefone: " + e.getMessage(), 
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PutMapping("/atualizar/{id}")
    public ResponseEntity<?> atualizarTelefone(@PathVariable long id, @RequestBody modeloTelefone atualizacao) {
        Optional<modeloTelefone> telefoneOpt = repositorio.findById(id);
        if (!telefoneOpt.isPresent()) {
            return new ResponseEntity<>("Telefone não encontrado", HttpStatus.NOT_FOUND);
        }
        
        try {
            modeloTelefone telefone = telefoneOpt.get();
            TelefoneAtualizador atualizador = new TelefoneAtualizador();
            atualizador.atualizar(telefone, atualizacao);
            repositorio.save(telefone);
            return new ResponseEntity<>(telefone, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao atualizar telefone: " + e.getMessage(), 
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<?> excluirTelefone(@PathVariable long id) {
        Optional<modeloTelefone> telefone = repositorio.findById(id);
        if (!telefone.isPresent()) {
            return new ResponseEntity<>("Telefone não encontrado", HttpStatus.NOT_FOUND);
        }
        
        try {
            repositorio.delete(telefone.get());
            return new ResponseEntity<>("Telefone excluído com sucesso", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao excluir telefone: " + e.getMessage(), 
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}