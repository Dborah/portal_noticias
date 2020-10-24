module.exports.formulario_inclusao_noticia = function(application, req, res ){
    res.render("admin/form_add_noticia", {validacao: {}, noticia: {}});
}
        
module.exports.noticia_salvar = function(application, req, res){
    var noticia = req.body;

    //console.log(noticia);

    req.assert('titulo', 'Título é obrigatório').notEmpty();
    req.assert('resumo', 'Resumo é obrigatório').notEmpty();
    req.assert('resumo', 'Resumo deve conter entre 10 e 100 caracteres').len(10, 1000);
    req.assert('autor', 'Nome do autor é obrigatório').notEmpty();
    req.assert('data_noticia', 'Data é obrigatória').notEmpty().isDate({format: 'YYY-MM-DD'});
    req.assert('noticia', 'Notícia é obrigatório').notEmpty();

    var erros = req.validationErrors();

    //console.log(erros);

    if(erros){
        res.render("admin/form_add_noticia", {validacao : erros, noticia: noticia});
        return;
    }

    var connection = application.config.dbConnection();
    var noticiasModel = new application.app.models.NoticiasDAO(connection);

    noticiasModel.salvarNoticia(noticia, function(error, result) {
        res.redirect('/noticias');
    });
}