class A
{
    constructor(x)
    {
        this.x=x;
    }
}
class B extends A
{
    move()
    {
        console.log(this.x);
    }
}
let a = new B(2);
a.move()
