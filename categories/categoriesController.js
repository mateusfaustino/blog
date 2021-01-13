const express = require("express");
const router = express.Router();
const Category = require("./Category");
const slugify = require ("slugify");
const Article = require("../articles/Article");


router.get("/admin/categories/new", (req,res)=>{
    res.render("admin/categories/new"); 
})

router.post("/categories/save",(req,res)=>{
    var title = req.body.title;
    if (title !=""){
        Category.create({
            title:title,
            slug: slugify(title)
        }).then(()=>{
            res.redirect("/");
        })
        console.log("Título cadastrado com sucesso!");
        console.log(typeof(title));
    }else{
        console.log("Título nulo");
        res.redirect("/admin/categories/new");
    }
})
router.get("/admin/categories",(req,res)=>{
    Category.findAll().then(categories=>{
        res.render("../views/admin/categories/index",{categories:categories});
    });
    
})

router.post("/categories/delete",(req,res)=>{
    var id = req.body.id;
    if(id !=undefined){
        if(!isNaN(id)){
            Category.destroy({
                where:{
                    id: id
                }
            }).then(()=>{
                res.redirect("/admin/categories/")
            });
        }else{
            res.redirect("/admin/categories/");
            console.log("Erro: O id que você tentou salvar não é um número");
        }
    }else{
        res.redirect("admin/categories/");
        console.log("Erro: O id que você tentou salvar é indefinido");
    }
})
router.get("/admin/categories/edit/:id",(req,res)=>{
    var id = req.params.id;
    Category.findByPk(id).then(category=>{
        if(category!=undefined){
            res.render("admin/categories/edit",{category:category});
        }else{
            res.redirect("admin/categories/");
        }
    }).catch(erro=>{
        res.redirect("admin/categories/");
    })
});
router.post("/categories/update",(req,res)=>{
    var id = req.body.id;
    var title = req.body.title;
    

    Category.update({title: title,slug:slugify(title)},{
        where:{
            id:id
        }
    }).then(()=>{
        res.redirect("/admin/categories"); 
    })
});

module.exports = router;