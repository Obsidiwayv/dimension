export  class Library<V> {
    private storage = {} as { [key: string]: V };

    public put(key: string, value: V) {
        this.storage[key] = value;
    }

    public pull(item: string, cb: () => any): V {
        const value = this.storage[item];
        console.log(this.storage)
        if (!value) {
            return cb();
        } else {
            return value;
        }
    }

    public length() {
        return Object.keys(this.storage).length;
    }
}

export class LibraryHelper {
    public static exists(obj: any) {
        if (typeof obj === "undefined") {
            return false;
        }
        return true;
    }
}