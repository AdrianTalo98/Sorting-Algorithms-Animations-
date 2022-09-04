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

class MergeSort{
    constructor(){
        this.array = []
        this.array_index = []
        this.animacion = []
    }
    add(n) {
        var i = 0;
        while (i < n) {
            this.array.push(Math.random() * 800);
            i++;
        }
    }  

    merge(l, r){
        if(l < r){
            let mid = Math.floor((l + r)/2)
            this.array_index.push([l,mid,r])
            // which index we want to sort
            this.merge(l, mid)
            this.merge(mid+1,r)
            this.mergeSorting(l, mid, r)
        }
    }
    mergeSorting(l, mid, r){
        // Space complexity: O(n)
        let n1 = mid - l + 1
        let n2 = r - mid
        
        let L = Array(n1).fill(0);
        let R = Array(n2).fill(0);
        for(let i = 0; i<n1; i++){
            L[i] = this.array[l+i]
        }
        for(let i = 0; i<n2; i++){
            R[i] = this.array[mid+1+i]
        }
        // Sorting
        let i = 0
        let j = 0
        let k = l
        while(i < n1 && j < n2){
            if(L[i]< R[j]){
                this.array[k] = L[i];
                i++;
            }else{
                this.array[k] = R[j];
                j++;
            }
            k++;
        }
        while(i<n1){
            this.array[k] = L[i];
            i++;
            k++;
        }
        while(j<n2){
            this.array[k] = R[j];
            j++;
            k++;
        }
        // tracking current sorting position
        //this.animation_array.push([...this.array])
        this.animacion.push([...this.array])
    }
    
    
      
}

class InsertionSort{
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

    ordenar(){
        for(var i=0;i<this.arreglo.length;i++){
            let current = this.arreglo[i];

            let j;
            for(j=i-1;j>=0 && this.arreglo[j]>current; j--){
                this.arreglo[j+1] = this.arreglo[j]
                this.animacion.push([...this.arreglo])
                
            }
            this.animacion.push([...this.arreglo])
            this.arreglo[j+1] = current;
            
        }
    }
}

const generar = document.getElementById("generar");
const bubble = document.getElementById("bubble");
const resetear = document.getElementById("resetear");
const merge = document.getElementById("merge");
const insertion = document.getElementById("insertion");



const delay = async (ms = 1000) =>
  new Promise(resolve => setTimeout(resolve, ms))

class Dibujar {
    constructor(n) {
        this.canvas = document.getElementById('tutorial');
        this.canvas.width = 1800
        this.canvas.height = 900
        this.context = this.canvas.getContext('2d');
        this.n = n;
        this.width = 1800;
        this.height = 900;
        this.bb = new BubbleSort();
        this.bb.add(n)
        
        this.mm = new MergeSort()
        this.mm.add(n)

        this.iss = new InsertionSort();
        this.iss.add(n)
        
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
            //this.context.fillStyle = "#"+Math.floor(this.bb.arreglo[i]*15).toString(16);
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
                //this.context.fillStyle = "#"+Math.floor(this.bb.arreglo[i]*100).toString(16);
                this.context.rect(inicio, 0, ancho, arreglo[j][i]);
                //podemos cambiar rect por fillRect?
                this.context.stroke()
                inicio = inicio + ancho
                //console.log(arreglo[j][i])

            }          
            //console.log("--")
            //definimos el delay i wea
            await delay(1)
        }
    } 


    ordenar(){

        console.log("Se ordenará ->",this.bb.arreglo)
        this.bb.ordenar()
        //esto es un arreglo de arreglos xd
        const animacion = this.bb.animacion;
        this.segundoDibujo(animacion)   

    }

    ordenarMerge(){
        console.log(this.mm.array)
        this.mm.merge(0,this.n-1)
        const animacion = this.mm.animacion
        this.segundoDibujo(animacion)
    }

    ordenarInsertion(){
        console.log("Se ordenará ->",this.iss.arreglo);
        this.iss.ordenar()
        
        const animacion = this.iss.animacion;
        this.segundoDibujo(animacion)
    }


}


function Main(){
    const cantidad = 100
    var correr = new Dibujar(cantidad);
    generar.addEventListener('click',()=>{
        correr.primerDibujo()
    })
    resetear.addEventListener('click',()=>{
        correr.resetar()
        correr = new Dibujar(cantidad)
    })
    bubble.addEventListener('click',()=>{
        correr.ordenar()

    })
    merge.addEventListener('click',()=>{
        correr.ordenarMerge()
    })
    insertion.addEventListener('click',()=>{
        correr.ordenarInsertion()
    })
}

Main()

