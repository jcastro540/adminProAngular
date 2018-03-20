import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs/Rx";

@Component({
  selector: "app-rxj",
  templateUrl: "./rxj.component.html",
  styles: []
})
export class RxjComponent implements OnInit, OnDestroy {

  subscription:Subscription;

  constructor() {
   this.subscription =  this.regresaObservable()
    .subscribe(
      numero => {
        console.log("subs", numero);
      },
      error => {
        console.error("Error en el obs", error);
      },
      () => {
        console.log("El obs termino");
      }
    );
  }

  ngOnInit() {}

  ngOnDestroy(){
    console.log("La pagina se a cerrar")
    this.subscription.unsubscribe()
  }

  regresaObservable():Observable<any> {
    return new Observable(observer => {
      let contador = 0;

      let intervalo = setInterval(() => {
        contador += 1;

        let salida = {
          valor:contador
        }

        observer.next(salida);

        // if (contador == 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // if (contador == 2) {
        //   // clearInterval(intervalo)
        //   observer.error("Error es 2");
        // }
      }, 500);
    })
    .retry(2)
    .map((resp:any)=>{
      return resp.valor;
    })
    .filter((valor, index)=>{
      // console.log("filter", valor, index)

      if(valor % 2 == 1){
        // impar
        return true
      }else{
        // par
        return false
      }

    })



  }


}
