import * as THREE from 'three';
import EventEmitter from './EventEmitter';
import UIEventBus from './EventBus';

export default class Loading extends EventEmitter {
    progress: number;

    constructor() {
        super();

        this.on('loadedSource', (sourceName, loaded, toLoad) => {
            this.progress = loaded / toLoad;
            UIEventBus.dispatch('loadedSource', {
                sourceName: sourceName,
                progress: loaded / toLoad,
                toLoad: toLoad,
                loaded: loaded,
            });
        });
    }
}
