import { Post } from './post';
import { Location } from './location';
export class User
{
 constructor(
     public email :string
    ,public password :string
    ,public age :number
    ,public imgUrl:string
    ,public location :Location
    ,public username :string
    ,public sharedpost:Post[]
    ,public followers :User[]
    ,public myPosts:Post[]
    ,public follow:User[]
    ){}
}