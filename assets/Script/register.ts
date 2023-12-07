import { _decorator, Component, Label, Node, director, EditBox, logID } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('register')
export class register extends Component {

    @property({ type: Node })
    form: Node

    start() {
        this.form.active=true
        this.form.getChildByPath("Node_ms/ms").active = false
    }


    login() {
    }

    checkUsername() {
        var userName = this.form.getChildByPath("Node_id/input_id").getComponent(EditBox);
        if (userName.string.length > 8) {
            this.statusMs(1);
        } else {
            this.statusMs(0);

        }

    }

    checkPassword() {
        var passWord = this.form.getChildByPath("Node_pass/input_pass").getComponent(EditBox);
        if (passWord.string.length > 8) {
            this.statusMs(2);
        } else {
            this.statusMs(0);

        }

    }
    checkNickName() {
        var nickName = this.form.getChildByPath("Node_name/input_name").getComponent(EditBox);
        var ms = this.form.getChildByPath("Node_ms/ms")
        if (nickName.string.length > 8) {
            this.statusMs(6);
        } else {
            this.statusMs(0);

        }
    }
    register() {
        var userName = this.form.getChildByPath("Node_id/input_id").getComponent(EditBox).string;
        var passWord = this.form.getChildByPath("Node_pass/input_pass").getComponent(EditBox).string;
        var nickName = this.form.getChildByPath("Node_name/input_name").getComponent(EditBox).string;
        var ms = this.form.getChildByPath("Node_ms/ms");
        var rs = this.dulipcate(userName, passWord, nickName);
        console.log(rs);
        if (rs == "Done") {
            director.loadScene("login");
        } else {
            ms.getComponent(Label).string = rs;
            ms.active = true;
        }


    }

    dulipcate(id, pass, name) {
        var newAcc = { userName: id, password: pass, nickName: name };
        if (!localStorage.getItem("accounts")) {
            var accounts = [newAcc];
            localStorage.setItem("accounts", JSON.stringify(accounts));
            return "Done";
        } else {
            var listAcc = JSON.parse(localStorage.getItem("accounts"));
            for (let acc of listAcc) {
                if (acc.userName === id) {
                    return "Trùng tên id";
                } else if (acc.nickName === name) {
                    return "Trùng nick name";
                }
            }
            listAcc.push(newAcc);
            localStorage.setItem("accounts", JSON.stringify(listAcc));
            return "Done";

        }

    }
    statusMs(key) {
        var ms = this.form.getChildByPath("Node_ms/ms");
        var notification = ms.getComponent(Label).string;
        if (key == 0) {
            ms.active = false;
        } else {
            switch (key) {
                case 1:
                    notification = "User name chỉ có 8 ký tự";
                    break;
                case 2:
                    notification = "Password chỉ có 8 ký tự";
                    break;
                case 3:
                    notification = "Đăng nhập thành công";
                    break;
                case 4:
                    notification = "ID không chính xác ";
                    break;
                case 5:
                    notification = "Mật khẩu không chính xác";
                    break;
                case 6:
                    notification = "Nick name chỉ có 8 ký tự";
                    break;
                default:
                    break;
            }
            ms.active = true;
        }
    }

    update(deltaTime: number) {

    }
}


