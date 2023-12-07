import { _decorator, Component, instantiate, Node, Prefab, ScrollView } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('loadPre')
export class loadPre extends Component {

    @property({type: ScrollView})
    ListView: ScrollView;

    @property({type: [Prefab]})
    item: Prefab[] = [];

    // private pre: prefab;

    start() {

    }

    // loadItem(item){
    //     for(let i=0 ; i < item.length; i++){
    //         let items = instantiate(item[i]);
    //         this.ListView.content.appendChild(items);
    //     }
    // }

    update(deltaTime: number) {
        
    }
}


