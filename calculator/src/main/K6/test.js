import grpc from 'k6/net/grpc';
import { check, sleep } from 'k6';

const client = new grpc.Client();
client.load(['../resources'], 'Calculator.proto');

export const options = {
    vus: 1,
    iterations: 1,
    duration: "2s",
}

export default () => {
  client.connect('localhost:9090', {
    plaintext: true
  });

  const data = { num1: 1, num2: 6 };
  const response = client.invoke('calculator.CalculatorService/Add', data);

  check(response, {
    'status is OK': (r) => r && r.status === grpc.StatusOK,
    'status is Canceled': (r) => r && r.status === grpc.StatusCanceled,
    'status is Unknown': (r) => r && r.status === grpc.StatusUnknown,
    'status is InvalidArgument': (r) => r && r.status === grpc.StatusInvalidArgument,
    'status is DeadlineExceeded': (r) => r && r.status === grpc.StatusDeadlineExceeded,
    'response is not blank': (r) => r.message.ready != "",
    'are only two headers': (r) => Object.keys(r.headers).length === 2,
    'trailers are empty': (r) => Object.keys(r.trailers).length === 0, // The trailers are additional metadata sent after the body of the response. They can contain extra information about the response, such as authentication details, digital signatures, etc.
    'error is null': (r) => r.error == null,


  });

  console.log(JSON.stringify(response.message));
  console.log(JSON.stringify(response.headers));

  client.close();
};
