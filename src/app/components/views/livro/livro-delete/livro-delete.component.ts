import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-delete',
  templateUrl: './livro-delete.component.html',
  styleUrls: ['./livro-delete.component.css']
})
export class LivroDeleteComponent implements OnInit {

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

  deleteLivro(): void {
    this.service.deleteLivro(this.livro.id!).subscribe(
      () => {
        this.router.navigate([`categorias/${this.idCategoria}/livros`]);
        this.service.mensagem('Livro excluído com sucesso!');
      },
      (err) => {
        this.router.navigate([`categorias/${this.idCategoria}/livros`]);
        this.service.mensagem('Falha ao excluir livro!');
        console.log(err);
      }
    );
  }

  cancela() : void {
    this.router.navigate([`categorias/${this.idCategoria}/livros`]);
  }
}
