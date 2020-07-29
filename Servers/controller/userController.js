const UserModal = require('../model/userModal');


class UserController {
    async addUser(ctx) {
        const { _id, ...infos } = ctx.request.body;

        try {
            const item = await UserModal.findOneAndUpdate({ _id }, { $set: { ...infos } });
            if (!item) {
                // 不存在，则新建
                const newUser = await new UserModal({ ...infos }).save();

                ctx.body = { msg: '成功添加新客户', status: true };
                ctx.status = 200;
            } else {
                ctx.body = { msg: '成功保存客户信息', status: true };
                ctx.status = 200;
            }
        } catch (err) {
            console.log(err);
            ctx.body = { msg: '添加用户失败', status: false };
            ctx.status = 500;
        }
    }

    async loginSys(ctx) {
        const { ...data } = ctx.request.body;

        try {
            const user = await UserModal.find({ data })

            if (!user) {
                ctx.body = { msg: '账号密码错误', status: true };
                ctx.status = 200;
            } else {
                ctx.body = { msg: '登录成功', status: true };
                ctx.status = 200;
            }
        } catch (err) {
            console.log(err);
            ctx.body = { msg: err, status: false }
            ctx.status = 500;
        }
    }
}

module.exports = new UserController();