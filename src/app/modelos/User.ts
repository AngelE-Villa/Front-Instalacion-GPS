import {Persona} from "./Persona";
import {Rol} from "./Rol";

export class User extends Persona{
  password: any;
  estado: any;
  token:any;
  roles:Rol[]=[];
}
