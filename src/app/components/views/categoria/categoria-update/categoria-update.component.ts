import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../categoria.model';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-update',
  templateUrl: './categoria-update.component.html',
  styleUrls: ['./categoria-update.component.css']
})
export class CategoriaUpdateComponent implements OnInit {

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

  updateCategoria(): void {
    this.service.updateCategoria(this.categoria).subscribe(
      (resposta) => {
        this.router.navigate(['categorias']);
        this.service.mensagem('Categoria atualizada com sucesso!');
      }, (err) => {
        this.service.mensagem('Verifique se todos os campos estão preenchidos!');
      }
    );
  }

  cancela(): void {
    this.router.navigate(['categorias']);
  }
}
