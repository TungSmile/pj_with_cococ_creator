import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

import { test } from './test';
@ccclass('Main')
export class Main extends Component {
    public test: test = null!;

    start() {
        this.node.getChildByPath("Node_ms/ms").active = false;
    }

    change() {
        console.log("123");  
        this.node.active = false;
        this.test.geton;
    }

    update(deltaTime: number) {

    }
}


