import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('test')
export class test extends Component {

    start() {
        this.node.active = false;
    }

    geton() {
        this.node.active=true;
    }

    update(deltaTime: number) {

    }
}


