import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from '../categoria.model';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-create',
  templateUrl: './categoria-create.component.html',
  styleUrls: ['./categoria-create.component.css']
})
export class CategoriaCreateComponent implements OnInit {

  categoria: Categoria = {
    nome: '',
    descricao: ''
  }

  constructor(private service: CategoriaService, private router: Router) { }

  ngOnInit(): void {
  }

  createCategoria(): void {
    this.service.createCategoria(this.categoria).subscribe(
      (resposta) => {
        this.router.navigate(['categorias']);
        this.service.mensagem('Categoria criada com sucesso!');
      }, err => {
      /*err.error.errorList.map((msgErro: JSON) => {
        this.service.mensagem(msgErro.message);
      });*/
        for (let i = 0; i < err.error.errorList.length; i++) {
          this.service.mensagem(err.error.errorList[i].message);
        }
      }
    );
  }

  cancela(): void {
    this.router.navigate(['categorias']);
  }
}
