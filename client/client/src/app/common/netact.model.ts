import { Oms } from '../common/oms.model';

export class Netact {
constructor(
       public _id: Number,
	   public name: String,
	   public nodes: Array<String>,
	   public username: String,
	   public password: String,
	   public owner: String,
	   public version: String,
	   public adaptation: Array<String>,
	   public enbversion?: String,
	   public release?: String,
       public oms?: Array<String>
){}
}
