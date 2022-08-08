import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-read-all',
  templateUrl: './livro-read-all.component.html',
  styleUrls: ['./livro-read-all.component.css']
})
export class LivroReadAllComponent implements OnInit {

  displayedColumns: string[] = ["id", "titulo", "lerLivro", "acoes"];
  livros: Livro[] = [];
  idCategoria: String = "";

  constructor(private service: LivroService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.idCategoria = this.route.snapshot.paramMap.get('idCategoria')!;
    this.findAll();
  }

  findAll(): void {
    this.service.findAllByCategoria(this.idCategoria).subscribe(
      (resposta) => {
        this.livros = resposta;
        console.log(this.livros);
      }
    );
  }

  callLivroCreate(): void {
    this.router.navigate([`categorias/${this.idCategoria}/livros/create`]);
  }
}
