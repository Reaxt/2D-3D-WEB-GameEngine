export default class Mats {

    public static IrriMat(scene:BABYLON.Scene):BABYLON.PBRMaterial {
        let pbr = new BABYLON.PBRMaterial("pbr", scene);
    
        pbr.albedoColor = new BABYLON.Color3(1, 1, 1);
        pbr.metallic = 0.40;
        pbr.roughness = 0.30;    
        pbr.indexOfRefraction = 2.19;
        pbr.metallicF0Factor= 1;
        pbr.metallicReflectanceColor = new BABYLON.Color3(1,1,1);
    
        pbr.clearCoat.isEnabled = true;
        pbr.clearCoat.intensity = 1;
        pbr.clearCoat.roughness = 0;
        pbr.clearCoat.indexOfRefraction = 1.3;
        //bump texture wavey one
        //nump strenght 2...
        pbr.clearCoat.useRoughnessFromMainTexture = true;
    
        pbr.iridescence.isEnabled = true;
        pbr.iridescence.intensity = 1;
        pbr.iridescence.indexOfRefraction = 3;
        pbr.iridescence.minimumThickness = 0;
        pbr.iridescence.maximumThickness = 780;
    
        //irridesent texture and thickness textures
        //irridesent texture wavey one
        //thickness crystal one
    
        pbr.sheen.isEnabled = true;
        pbr.sheen.intensity = 1;
        pbr.sheen.color = new BABYLON.Color3(1,0,1);
        //sheen texture the stretchy one
        //roughness the crystal one
        
        pbr.subSurface.minimumThickness = 0;
        pbr.subSurface.maximumThickness = 1.9;
        pbr.subSurface.tintColor = new BABYLON.Color3(1,0,1);
        pbr.subSurface.isScatteringEnabled = false
        pbr.subSurface.isRefractionEnabled = true;
        pbr.subSurface.refractionIntensity = 1;
        return pbr;
        //refraction intensity texture crystal
    
    }
}