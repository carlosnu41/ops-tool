const usrs = require("./Users");
const chat = require("./Chat");
const color = require("chalk");
const app = require("inquirer");
const mongoose = require("mongoose");
const chalk = require("chalk");
const { green } = require("chalk");
const URL = "mongodb+srv://root:root@msg-g9mtl.mongodb.net/test?retryWrites=true&w=majority";
var prompt = app.createPromptModule();
var newapp = app.createPromptModule();
var deleter = app.createPromptModule();
//funciones de las aplicación

async function rev(){
    var msg_list = await chat.find()
    console.log(msg_list);
    ver()
}
async function deleter(){
  verusr()
  deleter({
    name: "select",
    message: "Eliga un usuario para eliminar",
  })
}
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async function verusr() {
  var usrlist = await usrs.find({ rank: "Normal" });
  console.log(color.green(usrlist));
  ver();
}
async function verSu() {
  var sulist = await usrs.find({ rank: "SuperUsuario" });
  console.log(color.green(sulist));
  ver();
}
function new_user() {
  newapp([
    {
      name: "user",
      message: "Introduce el usuario",
    },
    {
      name: "mail",
      message: "Introduce el e-mail",
    },
    {
      name: "password",
      type: "password",
      message: "Ingrese la contraseña",
    },
    {
      type: "list",
      name: "rank",
      message: "Ingrese el rango",
      choices: ["SuperUsuario", "Normal"],
    },
  ]).then(async (usrdata) => {
    var usr = usrdata.user;
    var pwd = usrdata.password;
    var mail = usrdata.mail;
    var rank = usrdata.rank;
    var newusr = new usrs({
      email: mail,
      nick: usr,
      pwd: pwd,
      rank: rank,
    });
    console.log(color.green("   Listo datos creados"));
    await newusr.save();

    ver();
  });
}
function ver() {
  async function readmsg() {
    var msglist = await chat.find();
  }
  prompt({
    type: "list",
    name: "read",
    message: "Que quieres hacer?",
    choices: [
      "Ver superusuarios",
      "Ver usuarios",
      "Crear Usuario",
      "Ver Mensajes",
      "Eliminar Usuarios",
      "Acerca de...",
    ],
  }).then((menu) => {
    if (menu.read == "Ver usuarios") {
      console.log(color.cyan("Buscando"));
      verusr();
    }
    if (menu.read == "Ver superusuarios") {
      console.log(color.cyan("Buscando"));
      verSu();
    }
    if (menu.read == "Ver Mensajes") {
      console.log(color.inverse("   Espera un momento"));
      rev()
    }
    if (menu.read == "Crear Usuario") {
      console.log(color.magenta.italic("   Preparate para crear un usuario"));
      console.log(color.blue.italic("   Conectando a base de datos"));
      new_user();
    }
    if(menu.read == "Eliminar Usuario"){

    }
    if (menu.read == "Acerca de...") {
      console.log(color.gray.italic.inverse("   CN OPS-TOOL"));
      console.log(color.cyan.italic("   V1.0"));
      console.log(
        color.cyan.italic("   BASED ON NODE JS, MONGOOSE, & INQUIERER JS")
      );
      console.log(color.cyan.inverse("   CREATED BY: CODER91"));
      ver();
    }
  });
}
function password() {
  app
    .prompt([
      {
        name: "pass",
        type: "password",
        message: "Antes de iniciar introduce la contraseña de administrador",
      },
    ])

    .then((answers) => {
      if (answers.pass == "") {
        ver();
      } else {
        console.log(
          color.inverse.red("Contraseña: ", answers.pass, " incorrecta")
        );
      }
    });
}

password();
