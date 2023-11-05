export class InputHandler{
    constructor(){
        this.keys = [];
        //pressing and releasing a key
        window.addEventListener('keydown', e => {
            console.log(e); 
            //if index = -1 means it's not present in list
            if((e.key === 'ArrowDown' || e.key=== 'ArrowUp' || e.key === 'ArrowLeft'
            || e.key=== 'ArrowRight' || e.key === 'Enter')&& this.keys.indexOf(e.key) === -1){
                this.keys.push(e.key); 
            }
            window.addEventListener('keyup', e =>{
                if((e.key === 'ArrowDown' || e.key=== 'ArrowUp' || e.key === 'ArrowLeft'
                || e.key=== 'ArrowRight' || e.key === 'Enter' )){
                    this.keys.splice(this.keys.indexOf(e.key), 1); 
                }
            })
        })
    }
}