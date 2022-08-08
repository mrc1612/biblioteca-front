import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

  baseURL: String = environment.baseURL;

  titulo = new FormControl('', [Validators.minLength(3)]);
  nome_autor = new FormControl('', [Validators.minLength(3)]);
  texto = new FormControl('', [Validators.minLength(10)]);

  livro: Livro = {
    id: '',
    titulo: '',
    nome_autor: '',
    texto: ''
  }
  idCategoria: String = "";

  constructor(private router: Router, private service: LivroService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    //Verificar qual parâmetro está sendo passado em app-routing.module.ts
    this.idCategoria = this.route.snapshot.paramMap.get("idCategoria")!;
  }

  getMessage() {
    if (this.titulo.invalid) {
      return 'O campo TÍTULO deve conter entre 3 e 100 caracteres';
    }
    if (this.nome_autor.invalid) {
      return 'O campo NOME AUTOR deve conter entre 3 e 100 caracteres';
    }
    if (this.texto.invalid) {
      return 'O campo TEXTO deve conter entre 10 e 2.000.000 caracteres';
    }
    return false;
  }

  createLivro(): void {
    this.service.createLivro(this.livro, this.idCategoria).subscribe(
      (resposta) => {
        this.router.navigate([`categorias/${this.idCategoria}/livros`]);
        this.service.mensagem('Livro criado com sucesso!');
      },
      (err) => {
        this.router.navigate([`categorias/${this.idCategoria}/livros`]);
        this.service.mensagem('Erro ao criar novo livro!');
        console.log(err);
      }
    );
  }

  cancela() : void {
    this.router.navigate([`categorias/${this.idCategoria}/livros`]);
  }
}
