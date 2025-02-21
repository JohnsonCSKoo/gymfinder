interface ResponseEntity<E> {
    data: E;
    statusText: string;
    status: number;
}