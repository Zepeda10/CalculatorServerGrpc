import grpc from 'k6/net/grpc';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

const client = new grpc.Client();
client.load(['../resources'], 'Calculator.proto');

export const options = {
    stages: [
        {duration: "20s", target: 10},
        {duration: "10s", target: 10},
        {duration: "20s", target: 0}
    ]
}

const counterErrors = new Counter("connections_errors");

export default () => {

    try{
      client.connect('localhost:9090', {
        plaintext: true
      });
    } catch(err){
        console.error(err);
        counterErrors.add(1);
    }

  const data = { num1: 1, num2: 6 };
  const response = client.invoke('calculator.CalculatorService/Add', data);

  check(response, {
    'status is OK': (r) => r && r.status === grpc.StatusOK,
    'status is Canceled': (r) => r && r.status === grpc.StatusCanceled,
    'status is Unknown': (r) => r && r.status === grpc.StatusUnknown,
    'status is InvalidArgument': (r) => r && r.status === grpc.StatusInvalidArgument,
    'status is DeadlineExceeded': (r) => r && r.status === grpc.StatusDeadlineExceeded,
  });

  console.log(JSON.stringify(response.message));

  client.close();
};
