export class Measurement {
  private _id: string
  name: string
  shortName: string

  get id() {
    return this._id 
  } 

  constructor(id: string, name: string, shortName: string) {
    this._id = id;
    this.name = name;
    this.shortName = shortName;
  }
  
}
