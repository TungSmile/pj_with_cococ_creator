import { _decorator, Component, Node, Button, EditBox, Label, log, System, director } from 'cc';
const { ccclass, property } = _decorator;
import { register } from './register';

@ccclass('Load')
export class Load extends Component {

    @property({ type: Node })
    formLogin: Node;

    @property({ type: EditBox })
    inputID: EditBox;

    @property({ type: EditBox })
    inputPW: EditBox;

    @property({ type: Node })
    messega: Node;

    private rgt: register = null!;


    start() {
        this.messega.active = false;
        this.formLogin.active = true;
    }


    checkUsername() {
        var username = this.inputID.getComponent(EditBox).string;
        if (this.isValidString(username)) {
            this.statusMs(1)
        } else {
            this.statusMs(0)
        }

    }
    checkPassword() {
        var password = this.inputPW.getComponent(EditBox).string;
        if (this.isValidString(password)) {
            this.statusMs(2)
        } else {
            this.statusMs(0)
        }

    }

    login() {
        var username = this.inputID.getComponent(EditBox).string;
        var password = this.inputPW.getComponent(EditBox).string;
        var listAcc = JSON.parse(localStorage.getItem("accounts"));
        if (username.length > 0 && password.length > 0) {
            for (let acc of listAcc) {
                if (username === acc.userName) {
                    if (password === acc.password) {
                        this.statusMs(3);
                        break;
                    } else {
                        this.statusMs(5);
                        break;
                    }
                } else {
                    this.statusMs(4);
                }
            }
        } else {
            this.statusMs(6)

        }
    }

    register() {
        this.formLogin.active=false;
        this.rgt.node.on
    }

    statusMs(key) {
        var ms = this.messega.getComponent(Label)
        if (key == 0) {
            this.messega.active = false;
        } else {
            switch (key) {
                case 1:
                    ms.string = "User name chỉ có 8 ký tự";
                    break;
                case 2:
                    ms.string = "Password chỉ có 8 ký tự";
                    break;
                case 3:
                    ms.string = "Đăng nhập thành công";
                    break;
                case 4:
                    ms.string = "ID không chính xác ";
                    break;
                case 5:
                    ms.string = "Mật khẩu không chính xác";
                    break;
                case 6:
                    ms.string = "Không để trống";
                    break;
                default:
                    break;
            }
            this.messega.active = true;

        }
    }

    isValidString(input: string): boolean {
        const regex: RegExp = /^[a-zA-Z]{1,7}$/;
        return regex.test(input);
    }


    update(deltaTime: number) {

    }
}


