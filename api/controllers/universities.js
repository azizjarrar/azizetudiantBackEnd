var client = require('../../db_connection')

exports.getuniversities=(req,res)=>{

  if(req.body.specialites==undefined){
    client.query(`SELECT * FROM facultes `, async function  (err, result) {
      if(err){
          res.status(res.statusCode).json({
            message: err.message,
            status: res.statusCode,
            state: false,
          });
        }else{
          res.status(res.statusCode).json({
              message: "list of universities",
              data:result,
              status: res.statusCode,
            });
        }}
      )
  }else{
    client.query(`SELECT * FROM facultes   where specialite_id=${req.body.specialites}  `, async function  (err, result) {
      if(err){
          res.status(res.statusCode).json({
            message: err.message,
            status: res.statusCode,
            state: false,
          });
        }else{
          res.status(res.statusCode).json({
              message: "list of universities",
              data:result,
              status: res.statusCode,
            });
        }}
      )
  }

}
exports.getOneuniversities=(req,res)=>{
    client.query(`SELECT * FROM facultes   where id=${req.body.id}`, async function  (err, result) {
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
exports.getmetiers=(req,res)=>{
    client.query(`SELECT * FROM metiers   `, async function  (err, result) {
        if(err){
            res.status(res.statusCode).json({
              message: err.message,
              status: res.statusCode,
              state: false,
            });
          }else{
            res.status(res.statusCode).json({
                message: "all  metiers",
                data:result,
                status: res.statusCode,
              });
          }}
        )
}
exports.getspecialites=(req,res)=>{
    client.query(`SELECT * FROM specialites  WHERE metier_id=${req.body.metier_id}  `, async function  (err, result) {
        if(err){
            res.status(res.statusCode).json({
              message: err.message,
              status: res.statusCode,
              state: false,
            });
          }else{
            res.status(res.statusCode).json({
                message: "all  specialites",
                data:result,
                status: res.statusCode,
              });
          }}
        )
}

exports.getAllspecialites=(req,res)=>{
  client.query(`SELECT * FROM specialites    `, async function  (err, result) {
    if(err){
        res.status(res.statusCode).json({
          message: err.message,
          status: res.statusCode,
          state: false,
        });
      }else{
        res.status(res.statusCode).json({
            message: "all  specialites",
            data:result,
            status: res.statusCode,
          });
      }}
    )
}