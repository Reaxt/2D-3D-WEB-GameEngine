import { easeLinear, lerp } from "../../Util";
import Easing from "./Easing";
import GVector2 from "../Vector2";
import GVector3 from "../Vector3";

export default class EaseManager {
  private currentEasings: Easing[];
  private dimensions: number;
  constructor(dimensions: number) {
    this.currentEasings = [];
    this.dimensions = dimensions;
  }
  Clear():void{this.currentEasings=[]}
  AddEase(easing: Easing) {
    if (!easing.relative) {
      //clear out any other non relative easings.
      this.currentEasings.filter(x => easing.relative);
    }
    this.currentEasings.push(easing);
  }
  public Update(dt: number, positions: number[]): number[] {
    if (positions.length != this.dimensions)
      throw new Error("INVALID EASE DIMENSIONS GIVEN TO EASE MANAGER UPDATE.");
    //filter
    this.currentEasings = this.currentEasings.filter(x => x.EaseHappening);
    let renderPositions = positions;
    let definitives = this.currentEasings.filter(x => !x.relative);
    if (definitives.length > 0) {
      definitives.forEach(x => {
        renderPositions = x.update(dt);
      });
    }
    this.currentEasings.filter(x=>x.relative).forEach(x => {
      //get
      let easePositions = x.update(dt);
      if (!x.relative) return;
      for (let i = 0; i < renderPositions.length; i++) {
        renderPositions[i] += easePositions[i];
      }
    });
    return renderPositions;
  }
}
export class Vector3EaseManager extends EaseManager {
  constructor() {
    super(3);
  }
  UpdateVec(dt: number, vector: GVector3): GVector3 {
    let pos = this.Update(dt, [vector.x, vector.y, vector.z]);
    return new GVector3(pos[0], pos[1], pos[2]);
  }
}
export class Vector2EaseManager extends EaseManager {
    constructor() {
      super(2);
    }
    UpdateVec(dt: number, vector: GVector2): GVector2 {
      let pos = this.Update(dt, [vector.x, vector.y]);
      return new GVector2(pos[0], pos[1]);
    }
  }