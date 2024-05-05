package org.calculator;

import calculator.Calculator;
import calculator.CalculatorServiceGrpc;
import io.grpc.stub.StreamObserver;

public class CalculatorServiceImpl extends CalculatorServiceGrpc.CalculatorServiceImplBase {
    @Override
    public void add(Calculator.AddRequest request, StreamObserver<Calculator.AddResponse> responseObserver) {
        int result = request.getNum1() + request.getNum2();
        Calculator.AddResponse response = Calculator.AddResponse.newBuilder().setResult(result).build();
        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void subtract(Calculator.SubtractRequest request, StreamObserver<Calculator.SubtractResponse> responseObserver) {
        int result = request.getNum1() - request.getNum2();
        Calculator.SubtractResponse response = Calculator.SubtractResponse.newBuilder().setResult(result).build();
        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }
}
