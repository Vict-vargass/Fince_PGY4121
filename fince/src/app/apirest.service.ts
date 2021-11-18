import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ApirestService {
  listado = []
  datos:any;
  private apiURL = 'https://mindicador.cl/api/'
  constructor( 
    private http : HttpClient,
    ) { }

  async getValor(indicador: string){
    let url = this.apiURL + indicador 
    return new Promise((resolve, reject) =>{
      this.http.get(url).subscribe((data:any)=>{
        resolve(data);
        this.datos = data;
      },
      error => {
        console.log("Error")
      }
      )
    })
  }
}
