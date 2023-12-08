import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";

const router = express.Router();

router.post("/adminlogin",(req, res) => {
    const sql = "SELECT * from admin Where email = ? and password = ?";
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
      if (err) return res.json({ loginStatus: false, Error: "Query error" });
      if (result.length > 0) {
        const email = result[0].email;
        const token = jwt.sign(
          { role: "admin", email: email, id: result[0].id },
          "jwt_secret_key",
          { expiresIn: "1d" }
        );
        res.cookie('token', token)
        return res.json({ loginStatus: true });
      } else {
          return res.json({ loginStatus: false, Error:"Correo o contraseña incorrecta"});
      }
    });
  });

  router.get('/categorias', (req, res) => {
    const sql = "SELECT * FROM category";
    con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
      })
  })

  router.post('/add_category', (req, res) => {
    const sql = 'INSERT INTO category (`name`) VALUES (?)'
    con.query(sql, [req.body.category], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true})
    })
  })
  
// image upload 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'Public/Images')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({
  storage: storage
})
// end imag eupload 

  router.post('/add_productos',upload.single('image'), (req, res) => {
    const sql = `INSERT INTO product 
    (producto, category_id, descripcion, precio, stock, image) 
    VALUES (?)`;
    const values = [
        req.body.producto,  
        req.body.category_id,
        req.body.descripcion,
        req.body.precio,
        req.body.stock,
        req.file.filename
    ]
    con.query(sql, [values], (err, result) => {
      if(err) return res.json({Status: false, Error: err})
      return res.json({Status: true})
    })
  }) 
  
  router.get('/productos', (req, res) => {
    const sql = "SELECT * FROM product";
    con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
      })
  })

  router.get('/productos/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM product WHERE id = ? ";
    con.query(sql,[id], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
      })
  })
  
  router.put('/edit_productos/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE product set producto= ?, category_id= ?, descripcion= ?, precio= ?, stock= ?
    where id= ?`
    const values = [
      req.body.producto,  
      req.body.category_id,
      req.body.descripcion,
      req.body.precio,
      req.body.stock,
    ]
    con.query(sql,[...values, id], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"+err})
      return res.json({Status: true, Result: result})
      })
  })

  router.delete('/delete_productos/:id', (req, res) => {
    const id = req.params.id;
    const sql = "delete from product where id = ?"
    con.query(sql,[id], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"+err})
      return res.json({Status: true, Result: result})
  })
})
  
router.get('/cerrar', (req, res) => {
  res.clearCookie('token')
  return res.json({Status: true})
})

export { router as adminRouter };