import React from "react";
import SignUp from "./components/SignUp.js";
import Users from "./components/Users.js";
import UserDetail from "./components/UserDetail.js";
import UserEdit from "./components/UserEdit.js";
import axios from 'axios';

const axiosConfig = {
  headers: {
    Authorization: "severo"
  }
};

export default class App extends React.Component {

  state = {
    usersList: [],
    userDetail: {},
    name: "",
    email: "",
    isEditing: false
  }

  componentDidMount() {
    this.getUsersList();
  };

  handleNameChange = (event) => {
    const newNameValue = event.target.value;

    this.setState({ name: newNameValue });
  };

  handleEmailChange = (event) => {
    const newEmailValue = event.target.value;

    this.setState({ email: newEmailValue });
  };

  changeToEdit = () => {
    this.setState({ isEditing: !this.state.isEditing })
  }

  getUsersList = () => {
    axios
      .get(
        "https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users",
        axiosConfig
      )
      .then(response => {
        this.setState({ usersList: response.data });
      });
  };

  getUserDetail = (userId) => {
    axios
      .get(
        `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${userId
        }`,
        axiosConfig
      )
      .then(response => {
        this.setState({ userDetail: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleCreateUser = () => {
    const body = {
      name: this.state.name,
      email: this.state.email
    };

    axios
      .post(
        "https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users",
        body,
        axiosConfig
      )
      .then(() => {
        alert(`Usuário ${this.state.name} criado com sucesso!`);
        this.setState({ name: "", email: "" });
        this.getUsersList()
      })
      .catch(error => {
        alert("Erro ao criar o usuário");
        console.log(error);
      });
  };

  handleEditUser = (userId) => {
    const body = {
      name: this.state.name,
      email: this.state.email
    };

    if (body.name && body.email) {
      axios
        .put(
          `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${userId}`,
          body,
          axiosConfig
        )
        .then(() => {
          alert(`Usuário alterado com sucesso!`);
          this.setState({ name: "", email: "", userDetail: {}, isEditing: !this.state.isEditing });
          this.getUsersList();
          this.getUserDetail();
        })
        .catch((error) => {
          alert("Erro ao alterar o usuário");
          console.log(error);
        });
    } else {
      alert("Os campos de nome e email devem ser preenchidos!");
    };
  };

  handleUserDeletion = (userId) => {
    if (window.confirm("Tem certeza que deseja apagar o usuário?")) {
      axios
        .delete(
          `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${userId}`,
          axiosConfig
        )
        .then(() => {
          alert("Usuário apagado com sucesso!");
          this.getUsersList();
        })
        .catch(e => {
          alert("Erro ao apagar usuário");
        });
    }
  };

  render() {
    return (
      <main>
        <SignUp
          name={this.state.name}
          email={this.state.email}
          handleNameChange={this.handleNameChange}
          handleEmailChange={this.handleEmailChange}
          handleCreateUser={this.handleCreateUser}
        />
        <hr />
        <Users
          usersList={this.state.usersList}
          getUserDetail={this.getUserDetail}
          handleUserDeletion={this.handleUserDeletion}
        />
        <hr />
        {this.state.isEditing ?
          <UserEdit
            name={this.state.name}
            email={this.state.email}
            userDetail={this.state.userDetail}
            handleNameChange={this.handleNameChange}
            handleEmailChange={this.handleEmailChange}
            handleEditUser={this.handleEditUser}
            changeToEdit={this.changeToEdit}
          /> :
          <UserDetail
            userDetail={this.state.userDetail}
            changeToEdit={this.changeToEdit}
          />}
      </main>
    );
  };
};
