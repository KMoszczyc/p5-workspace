let shape;
let a;
let b;

function setup() {
  createCanvas(1200,800);
  shape = [2,3]
  a = tf.tensor([1,2,3,10,20,30],shape)
  a.print()
  b=tf.tensor([[1,2,3],[10,20,30]])
  b.print();

}

function draw() {
  background(10);
}
