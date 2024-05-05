import grpc from 'k6/net/grpc';
import { check, sleep } from 'k6';

const client = new grpc.Client();
client.load(['../resources'], 'Calculator.proto');

export const options = {
    vus: 1,
    iterations: 1,
    duration: "40s",
}

export default () => {
  client.connect('localhost:9090', {
    plaintext: true
  });

  const data = { num1: 1, num2: 6 };
  const response = client.invoke('calculator.CalculatorService/Add', data);

  check(response, {
    'status is OK': (r) => r && r.status === grpc.StatusOK,
  });

  console.log(JSON.stringify(response.message));

  client.close();
};
