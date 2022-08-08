import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Livro } from './livro.model';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  baseURL: String = environment.baseURL;

  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  findAllByCategoria(pIdCategoria: String): Observable<Livro[]> {
    const url = `${this.baseURL}livros?categoria=${pIdCategoria}`;
    return this.http.get<Livro[]>(url);
  }

  findById(pIdLivro: String): Observable<Livro> {
    const url = `${this.baseURL}livros/${pIdLivro}`;
    return this.http.get<Livro>(url);
  }

  createLivro(pLivro: Livro, pIdCategoria: String): Observable<Livro> {
    const url = `${this.baseURL}livros?categoria=${pIdCategoria}`;
    return this.http.post<Livro>(url, pLivro);
  }

  updateLivro(pLivro: Livro): Observable<Livro> {
    const url = `${this.baseURL}livros/${pLivro.id}`;
    return this.http.put<Livro>(url, pLivro);
  }

  deleteLivro(pIdLivro: String): Observable<void> {
    const url = `${this.baseURL}livros/${pIdLivro}`;
    return this.http.delete<void>(url);

  }

  mensagem(pMensagem: String): void {
    this._snack.open(`${pMensagem}`,'OK',{
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }
}
