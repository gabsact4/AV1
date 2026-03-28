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

import com.av1.av1.Modelo.modeloDocumento;
import com.av1.av1.Modelo.DocumentoAtualizador;
import com.av1.av1.Repositorio.RepositorioDocumento;

@RestController
@RequestMapping("/documento")
public class ControleDocumento {
    
    @Autowired
    private RepositorioDocumento repositorio;
    
    @GetMapping("/{id}")
    public ResponseEntity<modeloDocumento> obterDocumento(@PathVariable long id) {
        Optional<modeloDocumento> documento = repositorio.findById(id);
        if (documento.isPresent()) {
            return new ResponseEntity<>(documento.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    
    @GetMapping("/todos")
    public ResponseEntity<List<modeloDocumento>> obterDocumentos() {
        List<modeloDocumento> documentos = repositorio.findAll();
        if (documentos.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(documentos, HttpStatus.OK);
    }
    
    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<List<modeloDocumento>> obterPorTipo(@PathVariable String tipo) {
        List<modeloDocumento> documentos = repositorio.findByTipo(tipo);
        return new ResponseEntity<>(documentos, HttpStatus.OK);
    }
    
    @PostMapping("/cadastro")
    public ResponseEntity<?> cadastrarDocumento(@RequestBody modeloDocumento documento) {
        try {
            documento.setId(null);
            modeloDocumento novoDocumento = repositorio.save(documento);
            return new ResponseEntity<>(novoDocumento, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao cadastrar documento: " + e.getMessage(), 
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PutMapping("/atualizar/{id}")
    public ResponseEntity<?> atualizarDocumento(@PathVariable long id, @RequestBody modeloDocumento atualizacao) {
        Optional<modeloDocumento> documentoOpt = repositorio.findById(id);
        if (!documentoOpt.isPresent()) {
            return new ResponseEntity<>("Documento não encontrado", HttpStatus.NOT_FOUND);
        }
        
        try {
            modeloDocumento documento = documentoOpt.get();
            DocumentoAtualizador atualizador = new DocumentoAtualizador();
            atualizador.atualizar(documento, atualizacao);
            repositorio.save(documento);
            return new ResponseEntity<>(documento, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao atualizar documento: " + e.getMessage(), 
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<?> excluirDocumento(@PathVariable long id) {
        Optional<modeloDocumento> documento = repositorio.findById(id);
        if (!documento.isPresent()) {
            return new ResponseEntity<>("Documento não encontrado", HttpStatus.NOT_FOUND);
        }
        
        try {
            repositorio.delete(documento.get());
            return new ResponseEntity<>("Documento excluído com sucesso", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao excluir documento: " + e.getMessage(), 
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}