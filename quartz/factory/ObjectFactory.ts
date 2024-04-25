export default class<T extends Object> {
    /**
     * Param checking
     */
    public wrap(obj: T) {
        for (const value of Object.values(obj)) {
            if (value === "") {
                throw new Error(`The value ${value} cannot be blank if it has a key`);
            }
        }
        return obj;
    }
}