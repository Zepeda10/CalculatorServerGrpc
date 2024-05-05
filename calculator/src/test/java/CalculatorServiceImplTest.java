import static org.mockito.Mockito.*;

import calculator.Calculator;
import io.grpc.stub.StreamObserver;
import org.calculator.CalculatorServiceImpl;
import org.junit.jupiter.api.Test;

public class CalculatorServiceImplTest {

    @Test
    public void testAdd() {
        StreamObserver<Calculator.AddResponse> responseObserver = mock(StreamObserver.class);

        CalculatorServiceImpl calculatorService = new CalculatorServiceImpl();

        Calculator.AddRequest request = Calculator.AddRequest.newBuilder()
                .setNum1(5)
                .setNum2(3)
                .build();

        calculatorService.add(request, responseObserver);

        verify(responseObserver).onNext(eq(Calculator.AddResponse.newBuilder().setResult(8).build()));

        verify(responseObserver).onCompleted();
    }

    @Test
    public void testSubtract() {
        StreamObserver<Calculator.SubtractResponse> responseObserver = mock(StreamObserver.class);

        CalculatorServiceImpl calculatorService = new CalculatorServiceImpl();

        Calculator.SubtractRequest request = Calculator.SubtractRequest.newBuilder()
                .setNum1(10)
                .setNum2(5)
                .build();

        calculatorService.subtract(request, responseObserver);

        verify(responseObserver).onNext(eq(Calculator.SubtractResponse.newBuilder().setResult(5).build()));

        verify(responseObserver).onCompleted();
    }
}
