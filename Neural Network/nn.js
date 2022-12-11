function sigmoid(x) {
  return 1/(1 + Math.exp(-x));
}
function dsigmoid(y){
  //return sigmoid(x)*(1 - sigmoid(x));
  return y * (1-y);
}


class NeuralNetwork {
  constructor (input,hidden,output) {
    this.input_nodes=input;
    this.hidden_nodes=hidden;
    this.output_nodes=output

    this.weights_ih = new Matrix(this.hidden_nodes,this.input_nodes)
    this.weights_ho = new Matrix(this.output_nodes,this.hidden_nodes)
    this.weights_ih.randomize();
    this.weights_ho.randomize();

    this.bias_h = new Matrix(this.hidden_nodes,1)
    this.bias_o = new Matrix(this.output_nodes,1)
    this.bias_h.randomize();
    this.bias_o.randomize();
    this.lr=0.1;
  }

  feedforward(input_array) {
    let inputs = Matrix.fromArray(input_array);
    let hidden = Matrix.multiply(this.weights_ih,inputs);
    hidden.add(this.bias_h);
    hidden.map(sigmoid);

    let output = Matrix.multiply(this.weights_ho,hidden);
    output.add(this.bias_o);
    output.map(sigmoid);

    return output.toArray();
  }
  train(input_array,target_array) {
    //feedforward
    let inputs = Matrix.fromArray(input_array);
    let hidden = Matrix.multiply(this.weights_ih,inputs);
    hidden.add(this.bias_h);
    hidden.map(sigmoid);

    let outputs = Matrix.multiply(this.weights_ho,hidden);
    outputs.add(this.bias_o);
    outputs.map(sigmoid)

    let targets = Matrix.fromArray(target_array);

    //output errors
    let output_errors = Matrix.subtract(targets,outputs);
  //  output_errors.print()
    //gradients
    let gradients =  Matrix.map(outputs,dsigmoid);
  //  gradients.print()
    gradients.multiply(output_errors);
  //  gradients.print()
    gradients.multiply(this.lr);
  //  gradients.print()

    //weights deltas ho
    let hidden_T = Matrix.transpose(hidden);
    let weight_ho_deltas = Matrix.multiply(gradients,hidden_T)

    this.weights_ho.add(weight_ho_deltas);
    this.bias_o.add(gradients);

    //hiden layers errors
    let who_t = Matrix.transpose(this.weights_ho);
    let hidden_errors = Matrix.multiply(who_t,output_errors);

    //hidden gradient
    let hidden_gradient = Matrix.map(hidden,dsigmoid);
    hidden_gradient.multiply(hidden_errors);
    hidden_gradient.multiply(this.lr);

    //weight deltas ih
    let inputs_T = Matrix.transpose(inputs);
    let weight_ih_deltas = Matrix.multiply(hidden_gradient,inputs_T);

    this.weights_ih.add(weight_ih_deltas);
    this.bias_h.add(hidden_gradient);

  }
mutate(number) {
  let mutation = random()*number*2-number;
  this.weights_ih.add(mutation);
  this.weights_ho.add(mutation);
  this.bias_h.add(mutation);
  this.bias_o.add(mutation);

}
}
