const UserController = require('../controller/user-controller');
const userControll = new UserController();

const User = require('../models/user');
module.exports = (app) => {

    app.route(UserController.rotas().lista).get( UserControll.lista());

    app.route(UserController.rotas().cadastro)
       .get( userControll.formularioCadastro())
       .post(User.validacoes(), userControll.cadastra())
       .put(userControll.edita());

    app.route(UserController.rotas().edicao).get(userControll.formularioBuscaId());

    app.route(UserController.rotas().delecao).delete( userControll.deleta());
    
};