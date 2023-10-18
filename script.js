const firebaseConfig = {
    apiKey: "AIzaSyAph-8f3wsYITOfM7iBeGhFuNkm5-u9jmI",
  
    authDomain: "ejerciciofirebase-5337e.firebaseapp.com",
  
    projectId: "ejerciciofirebase-5337e",
  
    storageBucket: "ejerciciofirebase-5337e.appspot.com",
  
    messagingSenderId: "1059839172585",
  
    appId: "1:1059839172585:web:b67c2d30642d54d00c7578",
  };
  
  firebase.initializeApp(firebaseConfig); // Inicializaar app Firebase
  
  const db = firebase.firestore();// db (base de datos) representa mi BBDD //inicia Firestore
  
  const form = document.getElementById("form1")
  
  
  form.addEventListener('submit', contactForm);
  
  
  function contactForm(event) {
      event.preventDefault();
      console.log(event.target);
      let nombre = document.getElementById('fname');
      let email = document.getElementById('email');
      let mensaje = document.getElementById('message');
      let url = document.getElementById('image_url');
      const data = {
          'fname': nombre.value,
          'email': email.value,
          'message': mensaje.value,
          'image_url': url.value
      };
      saveContactForm(data);
      form.reset();
  }
  
  function saveContactForm(data) {
    db.collection("contactForms") // Nombre de la colección
        .add(data)
        .then(function() {
            alert('Mensaje guardado con éxito');
        })
        .catch(function(error) {
            alert('Error al guardar el mensaje: ' + error);
        });
}

const contactList = document.getElementById("contactList");

// Función para mostrar los contactos en el DOM
function displayContacts(contacts) {
  contactList.innerHTML = ''; // Limpiar el contenido existente

  contacts.forEach((contact) => {
    const contactDiv = document.createElement("div");
    contactDiv.innerHTML = `
      <h2>Nombre: ${contact.fname}</h2>
      <h3>Email: ${contact.email}</h3>
      <p>Mensaje: ${contact.message}</p>
      <img src="${contact.image_url}" alt="">
    `;
    contactList.appendChild(contactDiv);
  });
}

// Función para obtener y mostrar los contactos desde Firestore
function getContactsAndDisplay() {
  db.collection("contactForms") // Reemplaza con tu nombre de colección
    .get()
    .then((querySnapshot) => {
      const contacts = [];
      querySnapshot.forEach((doc) => {
        const contactData = doc.data();
        contacts.push(contactData);
      });
      displayContacts(contacts);
    })
    .catch((error) => {
      console.error("Error al obtener los contactos:", error);
    });
}

// Llamar a la función para obtener y mostrar los contactos al cargar la página
getContactsAndDisplay();


  
  
  const createUser = (user) => {
    db.collection("profile")
      .add(user)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => console.error("Error adding document: ", error));
  };

  //OPCIÓN JAVI PARA BORRAR USUARIO:
  const deleteUser = () => {
    const id = prompt('Introduce el ID a borrar');
    db.collection('profile').doc(id).delete().then(() => {
      alert(`Documento ${id} ha sido borrado`);
      //Clean
      document.getElementById('profile').innerHTML = "";
      //Read all again
      readAll();
    })
      .catch(() => console.log('Error borrando documento'));
  };

  //OPCIÓN ALTERNATIVA PARA BORRAR USUARIO:

  const deleteButton = document.getElementById("borrarUsuario");

deleteButton.addEventListener("click", function () {

  const documentoAEliminar = "ID_DEL_DOCUMENTO_A_ELIMINAR";

  db.collection("contactForms")
    .doc(documentoAEliminar)
    .delete()
    .then(() => {
      console.log("Documento eliminado exitosamente.");
      
      getContactsAndDisplay();
    })
    .catch((error) => {
      console.error("Error al eliminar el documento: ", error);
    });
});







  
//   document.querySelector("#form1").addEventListener("submit", function (event) {
//     event.preventDefault();
//     let array = ["Name", "Email", "Mensaje", "URL imagen"];
//     let userData = {};
//     for (let i = 0; i < event.target.length; i++) {
//       localStorage.setItem(array[i], event.target[i].value);
//       userData[array[i]] = event.target[i].value;
//     }
//     let tarjeta = document.querySelector("section");
//     tarjeta.innerHTML += `
//       <h2>Nombre: ${event.target[0].value}</h2>
//               <h3>Email: ${event.target[1].value}</h3>
//               <p>Mensaje: ${event.target[2].value}</p>
//               <img src="${event.target[3].value}" alt="">
//       `;
//     localStorage.setItem("User Data", JSON.stringify(userData));
//     console.log(userData);
//   });