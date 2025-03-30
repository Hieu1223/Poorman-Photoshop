import { FabricObject, Group } from "fabric";

export class ArisLayer{
    name:string
    objs : FabricObject[] = []
    visible : boolean = true
    priority : number
    opacity : number = 1
    public constructor(priority : number,name:string){
        this.priority = priority
        this.name = name
    }
    public setVisible(val : boolean) : void {
        this.visible = val
        for(let i = 0 ; i< this.objs.length; i++){
            this.objs[i].visible = val
        }
    }
    public setSelectable(val : boolean) : void {
        for(let i = 0 ; i< this.objs.length; i++){
            this.objs[i].selectable = val
        }
    }
    public setOpacity(val:number) : void{
        for(let i = 0; i< this.objs.length; i++){
            this.objs[i].opacity = val
        }
        this.opacity = val
    }
}