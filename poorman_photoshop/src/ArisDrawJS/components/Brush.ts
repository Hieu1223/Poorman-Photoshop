import { BaseBrush, Canvas, PencilBrush } from "fabric"

export class ArisBrush{
    width: number = 2.0
    data : BaseBrush
    public constructor(canvas : Canvas){
        this.data = new PencilBrush(canvas)
    }
    public setWidth(width : number) : void{
        this.width = width
    }
    public getData() : BaseBrush {
        return this.data
    }
}