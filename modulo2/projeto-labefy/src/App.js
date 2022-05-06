import React from "react";
import axios from "axios";

export default class App extends React.Component {
    state = {
        playlists: [],
        inputName: ""
    };

    onChangeInput = (event) => {
        this.setState({ inputName: event.target.value });
    };

    componentDidMount() {
        this.getPlaylists();
    }

    getPlaylists = () => {
        axios.get(
            "https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists",
            {
                headers: {
                    Authorization: "fernando-aparecido-aragon"
                }
            }
        )
            .then((response) => {
                this.setState({ playlists: response.data.result.list });
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    createPlaylist = () => {
        const body = {
            name: this.state.inputName
        };

        axios
            .post(
                "https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists",
                body,
                {
                    headers: {
                        Authorization: "fernando-aparecido-aragon"
                    }
                }
            )
            .then((response) => {
                this.getPlaylists();
            })
            .catch((error) => {
                console.log(error.message);
            });
    };
    buscarPlaylist = () => {
        axios.get(
            "https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists",
            {
                headers: {
                    Authorization: "fernando-aparecido-aragon"
                }
            }
        )
    }

    deletePlaylist = (userId) => {
        if (window.confirm("Tem certeza que deseja apagar o usuário?")) {
            axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists`, { headers: { Authorization: "pamela-lorenz-aragon" } }
            )
                .then((response) => {
                    alert("Usuário apagado com sucesso!");
                    this.getPlaylists();
                })
                .catch(e => {
                    alert("Erro ao apagar usuário");
                });
        }
    };

    render() {
        return (

            <main>

                <h1>
                Seja muito bem-vindo ao projeto: Labefy. O primeiro Site de playlist, mais acessível da labenu.
                </h1>

                <h2>Aqui se encontra as músicas que você mais gosta</h2>

                <hr />

                <section>

                    <label>

                        Pesquise aqui suas músicas, gênero, álbuns, e artistas preferidos.

                        <input type="text"></input>

                    </label>

                    <button onClick={""}>Buscar</button>

                </section>

                <section>

                    <label>

                        Nome da playlist

                        <input value={this.state.inputName} onChange={this.onChangeInput} />

                    </label>

                    <button onClick={this.createPlaylist}>Criar playlist</button>

                </section>

                <section>

                    {this.state.playlists.map((playlist) => {

                        return <p key={playlist.id}>{playlist.name}</p>;
                    })}
                </section>

                <section>
                    <label>

                        Nome da playlist

                        <input value={this.state.inputName} onChange={this.onChangeInput} />

                    </label>

                    <button onClick={this.deletePlaylist()}>Excluir playlist</button>

                </section>

            </main>
        );
    }
}
