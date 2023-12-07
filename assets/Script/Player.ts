import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

export interface acc {
    userName: string;
    passWord: string;
    nickName: string;
}
export enum layout {
    login = "login",
    register = "register",
    show_list = "show_list"
}

@ccclass('Player')
export class Player extends Component {
    @property({ type: Node })
    layoutContent: Node = null;

    @property({ type: Prefab })
    loginLayout: Prefab = null

    static instance: Player = null;

    private listAcc: acc[] = null;

    onLoad() {
        if (!localStorage.getItem("accounts")) {
            var listAcc: acc[] = [];
            localStorage.setItem("accounts", JSON.stringify(listAcc));
        }
        this.listAcc = JSON.parse(localStorage.getItem("accounts"));
        Player.instance = this;
        this.changeLayout(layout.login)
    }
    start() {
        Player.instance = this;
    }

    login(userName: string, passWord: string): string {
        if (userName.length > 0 && passWord.length > 0) {
            for (let acc of this.listAcc) {
                if (userName === acc.userName) {
                    if (passWord === acc.passWord) {
                        this.changeLayout(layout.show_list)
                        return "Done";
                    } else {
                        return "Wrong Pass";
                    }
                }
            }
            return "Wrong ID"
        } else {
            return "Please input Account";
        }
    }

    register(userName: string, passWord: string, nickName: string): string {
        var newAcc: acc = {
            userName: userName,
            passWord: passWord,
            nickName: nickName
        }
        this.listAcc.forEach(a => {
            if (a.userName == userName) {
                return "Duplicate UserName "
            }
            if (a.nickName == nickName) {
                return "Duplicate NickName "
            }
        });
        this.listAcc.push(newAcc)
        localStorage.setItem("accounts", JSON.stringify(this.listAcc));
        return "Congratulations"
    }


    private changeLayout(data: layout) {
        let targetNode = null;
        this.layoutContent.removeAllChildren;
        switch (data) {
            case layout.login:
                targetNode = instantiate(this.loginLayout)
                break;
            // case layout.register:
            //     targetNode = instantiate(this.loginLayout)
            //     break;
            case layout.show_list:
                targetNode = instantiate(this.loginLayout)
                break;
            default:
                break;
        }
        this.layoutContent.addChild(targetNode)
    }

    test() {
        // để test
    }
    update(deltaTime: number) {

    }
}


