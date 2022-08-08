import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.css']
})
export class LivroUpdateComponent implements OnInit {

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
    this.livro.id = this.route.snapshot.paramMap.get("idLivro")!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.livro.id!).subscribe(
      (resposta) => {
        this.livro = resposta;
      }
    );
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

  updateLivro(): void {
    this.service.updateLivro(this.livro).subscribe(
      (resposta) => {
        this.router.navigate([`categorias/${this.idCategoria}/livros`]);
        this.service.mensagem('Livro atualizado com sucesso!');
      },
      (err) => {
        this.router.navigate([`categorias/${this.idCategoria}/livros`]);
        this.service.mensagem('Falha ao atualizar livro!');
        console.log(err);
      }
    );
  }

  cancela() : void {
    this.router.navigate([`categorias/${this.idCategoria}/livros`]);
  }
}
