import { BaseBrush, Canvas, FabricObject, FabricText, Group, PatternBrush, PencilBrush } from "fabric"
import { ArisBrush } from "./components/Brush"
import { ArisLayer } from "./components/Layer"

export class ArisDraw{
    canvas:Canvas
    layers : ArisLayer[] = []
    active_layer: number = 0
    public constructor(canvas:HTMLCanvasElement, dimension: {width: number, height : number}){
        this.canvas =new Canvas(canvas)
        let resize = ()=>{
            this.canvas.calcOffset()
            this.canvas.setDimensions({height: dimension.height, width: dimension.width})
        }
        resize()
        window.onresize = resize
        this.layers.push(new ArisLayer(0,"Background"))
        let brush : ArisBrush = new ArisBrush(this.canvas)
        this.canvas.freeDrawingBrush = brush.getData()
        this.canvas.isDrawingMode = true
        this.canvas.on('object:added',(e)=> {
            this.layers[this.active_layer].objs.push(e.target)
        });
    }

    public showLayer(layer: number,val : boolean) : void{
        this.layers[layer].setVisible(val)
        this.canvas.renderAll()
    }
    public setActiveLayer(layer : number) : void {
        this.layers[this.active_layer].setSelectable(false)
        this.active_layer = layer
        this.layers[layer].setSelectable(true)
        this.canvas.renderAll()
    }


    public run():void{
    }
    public setOpacity(val:number) : void {
        this.layers[this.active_layer].setOpacity(val)
        this.canvas.renderAll()
    }
    public deleteLayer(index:number) : void{
        for(let i = 0 ; i< this.layers[index].objs.length; i++){
            this.canvas.remove(this.layers[index].objs[i])
        }
        for(let i = index; i< this.layers.length-1; i++){
            this.layers[i] = this.layers[i+1]
            this.layers[i].priority = i
        }
        this.layers = this.layers.slice(0, this.layers.length-1)
        if(this.active_layer>=this.layers.length){
            this.active_layer = this.layers.length-1
        }
    }
}