export class Post
{
    constructor(
        public postid:string
       ,public text:string
       ,public imgurl:string
       ,public useid:string
       ,public Like:string[]
       ,public share:string[]
    ){}
}