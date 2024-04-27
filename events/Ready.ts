import Runnable from "@quartz/Runnable";

export default new Runnable(() => {
    console.log(`currently online with pid ${process.pid}`);
});