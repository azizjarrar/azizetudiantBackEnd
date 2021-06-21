var client = require('../../db_connection')

exports.getComments=(req,res)=>{

    client.query(`SELECT commentaire.etudiants_id as owner ,description,id_comment,nom as firstname,prenom as lastname FROM commentaire  join etudiants on etudiants.id=commentaire.etudiants_id WHERE  facultes_id=${req.body.facultes_id} `, async function  (err, result) {
        if(err){
            res.status(res.statusCode).json({
              message: err.message,
              status: res.statusCode,
              state: false,
            });
          }else{

            res.status(res.statusCode).json({
                message: "One universities",
                data:result,
                status: res.statusCode,
              });
          }}
        )
}
exports.addComment=(req,res)=>{

    client.query(`INSERT INTO  commentaire (description,etudiants_id,facultes_id) VALUES('${req.body.description}','${req.verified.user_auth.id_etud}','${req.body.facultes_id}')`, async function  (err, result) {
        if(err){
            res.status(res.statusCode).json({
              message: err.message,
              status: res.statusCode,
              state: false,
            });
          }else{
            res.status(res.statusCode).json({
                message: "comment Save",
                data:result,
                status: res.statusCode,
              });
          }}
        )
}
exports.deleteComments=(req,res)=>{

    client.query(`DELETE commentaire FROM commentaire   WHERE etudiants_id=${req.verified.user_auth.id_etud} and id_comment=${req.body.id_comment}`,(err,resuldelCommen)=>{
        if (err){
            res.status(res.statusCode).json({
                errorCode: err,
                status: res.statusCode,
              });
        }else{
            res.status(res.statusCode).json({
                message: "comment was deleted",
                data:resuldelCommen,
                status: res.statusCode,
              });
        }
    }
    )
}

exports.SearchComment=(req,res)=>{
  client.query(`SELECT commentaire.etudiants_id as owner ,description,id_comment,nom as firstname,prenom as lastname FROM commentaire  join etudiants on etudiants.id=commentaire.etudiants_id WHERE  description LIKE '%${req.body.description}%' `, async function  (err, result) {
    if(err){
        res.status(res.statusCode).json({
          message: err.message,
          status: res.statusCode,
          state: false,
        });
      }else{

        res.status(res.statusCode).json({
            message: "One universities",
            data:result,
            status: res.statusCode,
          });
      }}
    )
}
exports.deleteCommentsAdmin=(req,res)=>{
  client.query(`DELETE commentaire FROM commentaire   WHERE  id_comment=${req.body.id_comment}`,(err,resuldelCommen)=>{
    if (err){
        res.status(res.statusCode).json({
            errorCode: err,
            status: res.statusCode,
          });
    }else{
        res.status(res.statusCode).json({
            message: "comment was deleted",
            data:resuldelCommen,
            status: res.statusCode,
          });
    }
}
)
}