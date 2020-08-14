export class Oms {
constructor(
           public _id: Number,
	       public name: String,
           public south: String,
           public north: String,
           public username: String,
           public password: String,
           public superpw?: String,
           public version?: String,
           public integration?: String,
           public status?: String
	){ }
}