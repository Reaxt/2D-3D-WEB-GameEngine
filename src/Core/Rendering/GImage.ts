export default class Graphic {
	/**
	 * A wrapper for creating/loading a new Image() object.
	 *
	 * @param {String} path
	 * @param {Number} width
	 * @param {Number} height
	 */
    public image:HTMLImageElement;
    public width:number;
    public height:number;
    private isAvailable:boolean;
    
    public get Available() :boolean {
        return this.isAvailable; 
    }
    
	constructor(path:string, width:number, height:number) {
        this.isAvailable=false;
		this.image = new Image(width, height);
		this.image.src = path;
		this.width = width;
		this.height = height;
        this.image.onload=()=>{this.isAvailable = true;}
	}
}
