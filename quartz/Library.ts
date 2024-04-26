export  class Library<V> {
    private storage = [] as Array<{ key: string, value: V }>;

    public put(key: string, value: V) {
        this.storage.push({ key, value });
    }

    public pull(item: string, cb: () => any): V {
        const store = this.storage.find((v) => {
            console.log(v, item)
            return v.key === item;
        });
        if (!store) {
            return cb();
        } else {
            return store.value;
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