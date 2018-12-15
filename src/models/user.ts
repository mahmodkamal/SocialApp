import { Post } from './post';
import { Location } from './location';
export class User
{
    public  key :string;
    public email :string;
    public password :string;
    public age :number;
    public imgUrl:string;
    public location :Location;
    public  username :string;
    public  sharedpost:Post[];
    public followers :string[];
    public  myPosts:Post[];
    public  follow:string[]; 
}