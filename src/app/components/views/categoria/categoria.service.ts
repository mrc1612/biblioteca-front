import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from './categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  baseURL: String = environment.baseURL;

  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  findAll():Observable<Categoria[]> {
    const url = `${this.baseURL}categorias`;
    return this.http.get<Categoria[]>(url);
  }

  findById(pIdCategoria: String):Observable<Categoria> {
    const url = `${this.baseURL}categorias/${pIdCategoria}`;
    return this.http.get<Categoria>(url);
  }

  createCategoria(pCategoria: Categoria): Observable<Categoria> {
    const url = `${this.baseURL}categorias`;
    return this.http.post<Categoria>(url, pCategoria);
  }

  deleteCategoria(pIdCategoria: String): Observable<void> {
    const url = `${this.baseURL}categorias/${pIdCategoria}`;
    return this.http.delete<void>(url);
  }

  updateCategoria(pCategoria: Categoria): Observable<void> {
    const url = `${this.baseURL}categorias/${pCategoria.id}`;
    return this.http.put<void>(url,pCategoria);
  }

  mensagem(pMensagem: String): void {
    this._snack.open(`${pMensagem}`,'OK',{
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }
}
