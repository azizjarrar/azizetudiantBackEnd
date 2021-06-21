var client = require('../../db_connection')
const bcrypt = require("bcrypt");
const ENV = require("dotenv");
const jwt = require("jsonwebtoken");
ENV.config();

exports.singIn=(req,res)=>{
    console.log(req.body.cin)
    console.log(req.body.password)
    client.query(`SELECT * FROM etudiants  where cin=${req.body.cin}`, async function  (err, result) {
        console.log(result)
        if(err){
            res.status(res.statusCode).json({
              message: err.message,
              status: res.statusCode,
              auth: false,
            });
          }else{
            if(result.length==0){
                res.status(res.statusCode).json({
                    message: "user not found",
                    status: res.statusCode,
                    auth: false,

                  });
            }else{
  
                if (await bcrypt.compare(req.body.password, result[0].password)) {
  
                      const user_data={
                        cin:result[0].cin,
                        code_fac:result[0].code_fac,
                        id_etud:result[0].id
                }
                let token = await jwt.sign({ user_auth: user_data },"1aBcdeg");
                res.status(res.statusCode).json({
                    message: "login successful",
                    token:token,
                    auth: true,

                    data:{
                        
                            cin:result[0].cin,
                            code_fac:result[0].code_fac,
                            id_etud:result[0].id,
                            nom:result[0].nom,
                            prenom:result[0].prenom
                    },
                    status: res.statusCode,
                  });
                }else{
                    res.status(res.statusCode).json({
                        message: "password incorect",
                        status: res.statusCode,
                        auth: false,

                      });
                }
            }

          }
        
        })

}
exports.singUp=(req,res)=>{

    client.query(`SELECT * FROM etudiants  where cin=${req.body.cin}  or email='${req.body.email}'`, async function  (err, result) {
        if(err){
            res.status(res.statusCode).json({
              message: err.message,
              status: res.statusCode,
              state: false,
              auth: false,

            });
          }else{

            saltRounds = await bcrypt.genSalt(10);
            hasdhedPassword = await bcrypt.hash(req.body.password, saltRounds);
            const date = new Date();
            const datee=date.getFullYear()+"-"+(date.getMonth()+1-0)+"-"+date.getDate();
            const heure=date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
 
            const fullfdate=datee+" "+heure
            console.log(fullfdate)
            if(result.length==0){
                client.query(`INSERT  INTO  etudiants (date,cin,code_fac,email,moyenne_bac,nom,password,pays,prenom,tel,type_bac) 
                VALUES('${fullfdate}',${req.body.cin},'${req.body.code_fac}','${req.body.email}','${req.body.moyenne_bac}','${req.body.nom}','${hasdhedPassword}','${req.body.pays}','${req.body.prenom}','${req.body.tel}','${req.body.type_bac}') `, function  (err, result) {
                   
                    if(err){
                        res.status(res.statusCode).json({
                          message: err.message,
                          status: res.statusCode,
                          state: false,
                          auth: false,

                        });
                      }else{
                        res.status(res.statusCode).json({
                            message: " account Created",
                            status: res.statusCode,
                            auth: true,
                          });
                      }
     
                })
            }else{
                res.status(res.statusCode).json({
                    message: "you have already  account",
                    status: res.statusCode,
                    auth: false,

                  });
            }

          }

    })
}
exports.getUserData=(req,res)=>{

  client.query(`SELECT * FROM etudiants  where id='${req.verified.user_auth.id_etud}'`, async function  (err, result) {
    if(err){
      res.status(res.statusCode).json({
        message: err.message,
        status: res.statusCode,
        state: false,
      });
    }else{
      res.status(res.statusCode).json({
          message: " account data",
          data:result,
          status: res.statusCode,
        });
    }

  })
}

exports.updateUserInfo=(req,res)=>{
  const email =req.body.email;
  const motdepasse=req.body.motdepasse;
  const tel=req.body.tel;
  let queryString=`${email!=undefined?"email="+"'"+email+"'":''} ${motdepasse!=undefined?"motdepasse="+"'"+motdepasse+"'":''} ${tel!=undefined?"tel="+"'"+tel+"'":''}`
  for(let i =0;i<queryString.length-1;i++){
    if(queryString[i]==" "&&queryString[i+1]!=" "&&queryString[0]!=" "){
      queryString=queryString.replace(" ",",")
    }
   }

  let query=`UPDATE etudiants SET ${queryString} where id='${req.verified.user_auth.id_membre}'`;
  client.query(query ,(err,result)=>{
    if (err){
      res.status(res.statusCode).json({
          errorCode: err.message,
          status: res.statusCode,
        });
  }else{
      res.status(res.statusCode).json({
      message: "user data  was updated",
      data:result,
      });
  }
  })
}
exports.getUsersByYear=(req,res)=>{
  client.query(`SELECT count(year(date)) as numberOfInscri,year(date) as Year  FROM etudiants GROUP BY year(date) order by year(date)  DESC`, async function  (err, result) {
    if(err){
      res.status(res.statusCode).json({
        message: err.message,
        status: res.statusCode,
        state: false,
      });
    }else{
      res.status(res.statusCode).json({
          message: " account data",
          data:result,
          status: res.statusCode,
        });
    }

  })
}
exports.getAllUsers=(req,res)=>{
  
  client.query(`SELECT * FROM etudiants `, async function  (err, result) {
    if(err){
      res.status(res.statusCode).json({
        message: err.message,
        status: res.statusCode,
        state: false,
      });
    }else{
      res.status(res.statusCode).json({
          message: " account data",
          data:result,
          status: res.statusCode,
        });
    }

  })
}