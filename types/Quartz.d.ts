declare namespace Quartz {
    type RunnableFunction<T> = (...args: T[]) => any;
    type ClassType = new (...args: any[]) => void;

    type StringChopOptions = {
        slice?: number;
    }
}