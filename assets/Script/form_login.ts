import { _decorator, Component, Node, EditBox, Button, Label } from 'cc';
import { Player } from './Player';

const { ccclass, property } = _decorator;



@ccclass('form_login')
export class form_login extends Component {

    @property({ type: Node })
    formLogin: Node;

    @property({ type: Node })
    formRegister: Node;

    @property({ type: Label })
    notification: Label;

    start() {
        this.formLogin.active = true;
        this.formRegister.active = false;
        this.notification.string = ""
    }

    onlogin() {
        var userName = this.formLogin.getChildByPath("form_login/user_name").getComponent(EditBox).string;
        var passWord = this.formLogin.getChildByPath("form_login/password").getComponent(EditBox).string;
        this.notification.string = Player.instance.login(userName, passWord);
        // setTimeout(this.resetNotification,100)

    }
    // resetNotification(){
    //     this.notification.string = "";
    // }

    changeForm(e, form) {
        if (form == 1) {
            this.formLogin.active = false;
            this.formRegister.active = true;
        } else {
            this.formRegister.active = false;
            this.formLogin.active = true;
        }
    }
    register(){
        var userName = this.formRegister.getChildByPath("form_register/user_name").getComponent(EditBox).string;
        var passWord = this.formRegister.getChildByPath("form_register/password").getComponent(EditBox).string;
        var nickName = this.formRegister.getChildByPath("form_register/nick_name").getComponent(EditBox).string;
        var rs=Player.instance.register(userName, passWord,nickName);
        this.notification.string = rs;
        if(rs=="Congratulations"){
            this.formRegister.active = false;
            this.formLogin.active = true;
        }
    }

    update(deltaTime: number) {

    }
}


