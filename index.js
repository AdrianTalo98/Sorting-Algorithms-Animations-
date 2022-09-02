class BubbleSort {
    constructor() {
        this.arreglo = []
        this.animacion = []
    }

    add(n) {
        var i = 0;
        while (i < n) {
            this.arreglo.push(Math.random() * 800);
            i++;
        }
    }
    ordenar() {

        var i, j, k;
        const n = this.arreglo.length
        for (j = 1; j < n; j++) {
            for (i = 0; i < n - 1; i++) {

                if (this.arreglo[i] > this.arreglo[i + 1]) {


                    var tmp = this.arreglo[i];
                    this.arreglo[i] = this.arreglo[i + 1];
                    this.arreglo[i + 1] = tmp;
                    
                    this.animacion.push([...this.arreglo])
                    
                }
            }


        }

    }
}

const generar = document.getElementById("generar");
const bubble = document.getElementById("bubble");
const resetear = document.getElementById("resetear");

const delay = async (ms = 1000) =>
  new Promise(resolve => setTimeout(resolve, ms))

class Dibujar {
    constructor(n) {
        this.canvas = document.getElementById('tutorial');
        this.context = this.canvas.getContext('2d');
        this.n = n;
        this.width = 1000;
        this.height = 800;
        this.bb = new BubbleSort();
        this.bb.add(n)
    }
    resetar(){
        this.context.clearRect(0, 0, this.width, this.height)
        this.context.clearRect(0, 0, 1000, 800);

    }
    primerDibujo() {
        var inicio = 0;
        const ancho = this.width/this.n;

        for (var i=0;i<this.bb.arreglo.length;i++){
            //ctx.fillRect(origenX, origenY, anchoC, altoC);
            this.context.beginPath();
            //this.context.fillStyle = "#"+Math.floor(Math.random()*16777215).toString(16);
            this.context.rect(inicio, 0, ancho, this.bb.arreglo[i]);
            this.context.stroke()
            inicio = inicio + ancho
        }

    }
   
    async segundoDibujo(arreglo){
        //console.log(arreglo)
        for (var j=0;j<arreglo.length;j++){

            this.resetar()
            var inicio = 0;
            const ancho = this.width/this.n;

            for(var i=0;i<arreglo[j].length;i++){
                this.context.beginPath();
                //this.context.fillStyle = "#"+Math.floor(Math.random()*16777215).toString(16);
                this.context.rect(inicio, 0, ancho, arreglo[j][i]);
                //podemos cambiar rect por fillRect?
                this.context.stroke()
                inicio = inicio + ancho
                console.log(arreglo[j][i])

            }          
            //console.log("--")
            //definimos el delay i wea
            await delay(10)
        }
    } 


    ordenar(){

        console.log("Se ordenará ->",this.bb.arreglo)
        this.bb.ordenar()
        //esto es un arreglo de arreglos xd
        const animacion = this.bb.animacion;
        this.segundoDibujo(animacion)   

    }


}


function Main(){
    var correr = new Dibujar(100);
    generar.addEventListener('click',()=>{
        correr.primerDibujo()
    })
    resetear.addEventListener('click',()=>{
        correr.resetar()
        correr = new Dibujar(5)
    })
    bubble.addEventListener('click',()=>{
        correr.ordenar()

    })
}

Main()

