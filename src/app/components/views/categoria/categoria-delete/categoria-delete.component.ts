import { Component, OnInit } from '@angular/core';
import { MAT_SORT_HEADER_INTL_PROVIDER_FACTORY } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../categoria.model';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-delete',
  templateUrl: './categoria-delete.component.html',
  styleUrls: ['./categoria-delete.component.css']
})
export class CategoriaDeleteComponent implements OnInit {

  categoria: Categoria = {
    id: '',
    nome: '',
    descricao: ''
  }

  constructor(private service: CategoriaService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    //Verificar qual parâmetro está sendo passado em app-routing.module.ts
    this.categoria.id = this.route.snapshot.paramMap.get('idCategoria')!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.categoria.id!).subscribe(
      (resposta) => {
        this.categoria = resposta;
      }
    );
  }

  deleteCategoria(): void {
    this.service.deleteCategoria(this.categoria.id!).subscribe(
      (resposta) => {
        this.router.navigate(['categorias']);
        this.service.mensagem('Categoria excluída com sucesso!');
      }, err => {
        this.service.mensagem(err.error.error);
      }
    );
  }

  cancela(): void {
    this.router.navigate(['categorias']);
  }
}
